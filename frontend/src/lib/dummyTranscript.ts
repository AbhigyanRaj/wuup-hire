const isDemoMode = localStorage.getItem('isDemoMode') === 'true';

export const dummyTranscript = isDemoMode ? [
  {
    id: 1,
    role: "ai",
    content: "Hi Rahul, welcome to the interview! Let's start with a quick introduction. Could you tell me about yourself and your background?",
    time: "10:00 AM"
  },
  {
    id: 2,
    role: "candidate",
    content: "Hi! Thanks for having me. I'm a senior full stack engineer with about 6 years of experience. I've primarily worked with React, Node.js, and Postgres. Over the last 2 years at an Indian fintech startup, I led a small team to scale our UPI payments architecture.",
    time: "10:01 AM"
  },
  {
    id: 3,
    role: "ai",
    content: "That sounds impressive. Scaling UPI systems comes with its own set of high-throughput challenges. Can you walk me through a specific challenge your team faced during that scaling and how you solved it?",
    time: "10:02 AM"
  },
  {
    id: 4,
    role: "candidate",
    content: "Absolutely. One of the biggest challenges was handling distributed data consistency during peak hours like Diwali sales. When we broke out the user authentication and transaction services, we suddenly had to deal with scenarios where a payment might fail but the bank account was already debited. We solved this by implementing an event-driven architecture using Kafka, and using the Saga pattern for distributed transactions.",
    time: "10:04 AM"
  },
  {
    id: 5,
    role: "ai",
    content: "Excellent approach. The Saga pattern is highly effective for that. How did you handle testing and monitoring for these asynchronous workflows?",
    time: "10:05 AM"
  },
  {
    id: 6,
    role: "candidate",
    content: "For testing, we relied heavily on integration tests spanning multiple microservices. For monitoring, we implemented distributed tracing using OpenTelemetry and Jaeger. That way, if a transaction failed midway through the Saga, we could easily trace the exact point of failure across service boundaries.",
    time: "10:07 AM"
  },
  {
    id: 7,
    role: "ai",
    content: "Very comprehensive. Let's switch gears slightly. How do you approach mentoring junior developers on your team?",
    time: "10:08 AM"
  }
] : [];

export const dummyEvaluation = isDemoMode ? {
  overallScore: 9.1,
  metrics: {
    communication: 9.5,
    technical: 9.0,
    confidence: 8.8,
    cheatingProb: 2.1
  },
  recommendation: "STRONG_HIRE",
  summary: "Rahul demonstrated an exceptional understanding of modern system design and backend architecture. He clearly articulated complex concepts like the Saga pattern and distributed tracing without hesitation. His communication was highly structured and professional, indicating strong leadership potential. There were no flags for inauthentic behavior.",
  strengths: [
    "Deep knowledge of distributed systems and UPI scaling",
    "Excellent communication and structuring of answers",
    "Strong focus on testing and observability"
  ],
  weaknesses: [
    "Could have elaborated slightly more on frontend performance"
  ]
} : {
  overallScore: 0,
  metrics: {
    communication: 0,
    technical: 0,
    confidence: 0,
    cheatingProb: 0
  },
  recommendation: "PENDING",
  summary: "No evaluation available.",
  strengths: [],
  weaknesses: []
};
