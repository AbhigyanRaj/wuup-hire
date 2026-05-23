import { Router } from "express";
import { receiveBolnaWebhook } from "./webhook.controller.js";
import { ipWhitelist } from "../../middleware/ipWhitelist.middleware.js";

const router = Router();

// Webhooks are NOT protected by our JWT auth because they come from Bolna.
// Bolna sends webhooks from 13.203.39.153.
const BOLNA_ALLOWED_IPS = ["13.203.39.153"];

router.post("/bolna", ipWhitelist(BOLNA_ALLOWED_IPS), receiveBolnaWebhook);

export default router;
