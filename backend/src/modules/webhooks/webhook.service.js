import { processBolnaWebhook } from "./bolna.processor.js";

export const handleBolnaWebhook = (payload) => {
  // We fire-and-forget the processor. 
  // It handles its own errors and async execution.
  processBolnaWebhook(payload);
  
  // Return immediately
  return true;
};
