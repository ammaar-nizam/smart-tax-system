import express from "express";
import {
  writePracticeGuidance,
} from "../controllers/guidanceController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/write", writePracticeGuidance);

export { router as guidanceRoute };
