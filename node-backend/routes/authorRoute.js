import express from "express";
import {
  createAuthor, getAllAuthors, getAuthorById,
} from "../controllers/authorController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post('/create', createAuthor);
router.get('/:id', getAuthorById);
router.get('/', getAllAuthors);

export { router as authorRoute };
