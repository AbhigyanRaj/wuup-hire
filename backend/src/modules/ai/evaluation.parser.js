const parseRecommendation = (rec) => {
  if (!rec) return "MAYBE";
  const upper = String(rec).toUpperCase();
  if (upper.includes("STRONG")) return "STRONG_HIRE";
  if (upper.includes("REJECT")) return "REJECT";
  if (upper.includes("HIRE")) return "HIRE";
  return "MAYBE";
};

export const parseEvaluationResponse = (rawResponse) => {
  try {
    let cleaned = rawResponse.trim();
    // In case the LLM returned markdown code blocks despite instructions
    if (cleaned.startsWith("\`\`\`json")) {
      cleaned = cleaned.replace(/^\`\`\`json/, "").replace(/\`\`\`$/, "").trim();
    } else if (cleaned.startsWith("\`\`\`")) {
      cleaned = cleaned.replace(/^\`\`\`/, "").replace(/\`\`\`$/, "").trim();
    }
    
    const parsed = JSON.parse(cleaned);

    // Map the expected JSON fields to our DB schema
    return {
      communicationScore: parsed.communicationScore || 0,
      technicalScore: parsed.technicalScore || 0,
      confidenceScore: parsed.confidenceScore || 0,
      engagementScore: parsed.engagementScore || 0,
      overallScore: parsed.overallScore || 0,
      
      // Convert 0-100 probabilities to 0-1 range for our DB schema
      cheatingProbability: (parsed.cheatingProbability || 0) / 100,
      responseConsistency: (parsed.responseConsistency || 0) / 100,
      fillerWordFrequency: (parsed.fillerWordFrequency || 0) / 100,
      sentimentScore: (parsed.sentimentScore || 0) / 100,

      // Map 'overallRecommendation' to DB 'recommendation' safely
      recommendation: parseRecommendation(parsed.overallRecommendation || parsed.recommendation),
      summary: parsed.summary || "",
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      redFlags: parsed.redFlags || [],
    };
  } catch (error) {
    console.error("Failed to parse AI response into strict JSON:", error, rawResponse);
    throw new Error("AI returned invalid format");
  }
};
