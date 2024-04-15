import express from "express";
import {
  createAgent, getAllAgents, getAgentById,
} from "../controllers/agentController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post('/create', createAgent);
router.get('/:id', getAgentById);
router.get('/', getAllAgents);

export { router as agentRoute };
