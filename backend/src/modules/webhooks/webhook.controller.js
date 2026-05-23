import { sendSuccess } from "../../utils/apiResponse.js";
import * as webhookService from "./webhook.service.js";

// POST /api/webhooks/bolna
export const receiveBolnaWebhook = (req, res) => {
  console.log("================================");
  console.log("WEBHOOK RECEIVED FROM BOLNA");
  console.log(JSON.stringify(req.body, null, 2));
  console.log("================================");

  // 1. Kick off processing in the background immediately
  webhookService.handleBolnaWebhook(req.body);

  // 2. Return 200 OK instantly so Bolna doesn't timeout or retry
  sendSuccess(res, null, "Webhook received.");
};
