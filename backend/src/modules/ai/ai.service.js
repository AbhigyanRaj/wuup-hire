import OpenAI from "openai";
import { env } from "../../config/env.js";
import { EVALUATION_SYSTEM_PROMPT, getEvaluationUserPrompt } from "./prompt.templates.js";
import { parseEvaluationResponse } from "./evaluation.parser.js";

// Dynamically configure the provider
const getAIConfig = () => {
  if (env.GROQ_API_KEY) {
    return {
      apiKey: env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
      model: "llama3-70b-8192" // or mixtral-8x7b-32768
    };
  } else if (env.OPENAI_API_KEY) {
    return {
      apiKey: env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1",
      model: "gpt-4o-mini"
    };
  }
  return null;
};

export const generateEvaluation = async (transcriptText, jobDetails) => {
  const aiConfig = getAIConfig();

  // If no API key is provided, return mock data
  if (!aiConfig) {
    console.log("⚠️ No AI API key found (tried GROQ_API_KEY and OPENAI_API_KEY). Generating mock AI evaluation...");
    const mockRawResponse = JSON.stringify({
      communicationScore: 8,
      technicalScore: 7,
      confidenceScore: 9,
      engagementScore: 8,
      overallScore: 8,
      cheatingProbability: 12,
      responseConsistency: 95,
      fillerWordFrequency: 5,
      sentimentScore: 80,
      overallRecommendation: "HIRE",
      summary: "This is a dummy evaluation because no API key was provided.",
      strengths: ["Clear speech", "Good background"],
      weaknesses: ["Deep technical details missed"],
      redFlags: []
    });
    return parseEvaluationResponse(mockRawResponse);
  }

  const openai = new OpenAI({
    apiKey: aiConfig.apiKey,
    baseURL: aiConfig.baseURL
  });

  try {
    const response = await openai.chat.completions.create({
      model: aiConfig.model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: EVALUATION_SYSTEM_PROMPT },
        { role: "user", content: getEvaluationUserPrompt(jobDetails, transcriptText) }
      ],
      temperature: 0.2,
    });

    return parseEvaluationResponse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Evaluation Failed in ai.service:", error);
    throw new Error("Failed to generate AI evaluation");
  }
};
