import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Function to create an author
export const createAuthor = asyncHandler(async (req, res) => {
  const author = {
    name: req.body.name,
    email: req.body.email,
    organization: req.body.organization,
  };

  console.log("Creating an author...");

  const authorExists = await prisma.author.findUnique({
    where: { email: req.body.email },
  });
  if (!authorExists) {
    const createdAuthor = await prisma.author.create({ data: author });
    res.status(201).json({
      message: "Author created successfully.",
      author: createdAuthor,
    });
  } else res.status(409).json({ message: "Author already in database." });
});

// Function to get author by id
export const getAuthorById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const authorExists = await prisma.author.findUnique({
      where: { id: parseInt(id) },
    });
    if (authorExists) {
      res.status(201).json(authorExists);
    } else {
      res.status(404).json({
        message: "Author not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving the author.",
      error: err,
    });
  }
});

// Function to get all the authors
export const getAllAuthors = asyncHandler(async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(201).json(authors);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving all authors.",
      error: err,
    });
  }
});
