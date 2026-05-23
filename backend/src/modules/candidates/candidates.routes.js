import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createCandidateSchema,
  getCandidateSchema,
  listCandidatesSchema,
} from "./candidates.validation.js";
import {
  createCandidate,
  listCandidates,
  getCandidate,
} from "./candidates.controller.js";

const router = Router();

// All candidate routes are protected
router.use(authenticate);

router.post("/",               validate(createCandidateSchema), createCandidate);
router.get("/",                validate(listCandidatesSchema),  listCandidates);
router.get("/:candidateId",    validate(getCandidateSchema),    getCandidate);

export default router;
