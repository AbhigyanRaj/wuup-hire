import { prisma } from "../../config/prisma.js";
import { generateEvaluation } from "../ai/ai.service.js";

/**
 * Formats transcript array to a single text block for the AI prompt
 */
const formatTranscriptForAI = (transcriptArray) => {
  return transcriptArray
    .map((msg) => `[${msg.speaker}] ${msg.message}`)
    .join("\n");
};

/**
 * The core asynchronous processor.
 * It is called by the controller, but executes in the background.
 */
export const processBolnaWebhook = async (payload) => {
  try {
    // Bolna payload contains id, status, transcript, etc.
    const execution_id = payload.id || payload.execution_id || payload.call_id;
    const { status, transcript } = payload;
    
    if (!execution_id) {
      console.warn("Webhook ignored: no execution_id found in payload");
      return;
    }

    // 1. Fetch interview by execution_id
    const interview = await prisma.interview.findFirst({
      where: { bolnaExecutionId: execution_id },
      include: { job: true },
    });

    if (!interview) {
      console.error(`Webhook error: Interview for execution_id ${execution_id} not found.`);
      return;
    }

    const interviewId = interview.id;

    // 2. Save raw payload for debugging
    await prisma.interview.update({
      where: { id: interviewId },
      data: { webhookPayload: payload },
    });

    // 3. Extract and save transcript
    const rawTranscript = payload.messages || payload.transcript || [];
    
    let parsedMessages = [];
    if (typeof rawTranscript === 'string') {
      const lines = rawTranscript.split('\n').filter(l => l.trim().length > 0);
      parsedMessages = lines.map(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          return {
            speaker: line.substring(0, colonIndex).trim().toLowerCase(),
            content: line.substring(colonIndex + 1).trim()
          };
        }
        return { speaker: "system", content: line };
      });
    } else if (Array.isArray(rawTranscript)) {
      parsedMessages = rawTranscript;
    }
    
    if (parsedMessages.length > 0) {
      // Clear existing transcript if any to prevent duplicates on retries
      await prisma.transcriptMessage.deleteMany({
        where: { interviewId },
      });

      const dbMessages = parsedMessages.map(msg => {
        let speakerType = "SYSTEM";
        const rawRole = (msg.role || msg.speaker || "").toLowerCase();
        if (rawRole === "assistant" || rawRole === "ai") speakerType = "AI";
        if (rawRole === "user" || rawRole === "human") speakerType = "CANDIDATE";

        return {
          interviewId,
          speaker: speakerType,
          message: msg.content || msg.text || msg.message || "",
          timestamp: msg.created_at ? new Date(msg.created_at) : (msg.timestamp ? new Date(msg.timestamp) : new Date()),
        };
      });

      await prisma.transcriptMessage.createMany({
        data: dbMessages
      });
    }

    // 4. Update status to COMPLETED
    await prisma.interview.update({
      where: { id: interviewId },
      data: { 
        status: "COMPLETED",
        completedAt: new Date()
      },
    });

    // 5. Trigger AI Evaluation in background (Phase 7)
    if (parsedMessages.length > 0) {
      console.log(`Triggering AI evaluation for interview ${interviewId}...`);
      
      const dbMessages = await prisma.transcriptMessage.findMany({ where: { interviewId }, orderBy: { timestamp: 'asc' }});
      const transcriptText = formatTranscriptForAI(dbMessages);
      
      const evaluationData = await generateEvaluation(transcriptText, interview.job);
      
      // Store Evaluation in DB
      await prisma.evaluation.create({
        data: {
          interviewId,
          ...evaluationData,
        },
      });

      // Mark as evaluated
      await prisma.interview.update({
        where: { id: interviewId },
        data: { status: "EVALUATED" },
      });

      console.log(`Successfully processed and evaluated interview ${interviewId}`);
    } else {
      console.log(`Interview ${interviewId} has no transcript. Skipping AI eval.`);
    }

  } catch (error) {
    console.error("Error processing Bolna webhook:", error);
  }
};
