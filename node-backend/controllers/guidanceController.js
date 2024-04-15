import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Method to write a practice guide
export const writePracticeGuidance = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        content,
        publicationDate,
        agentId
    } = req.body.data;

    console.log(req.body.data)
  

  console.log("Writing a practice guide...");

  const practiceGuideExists = await prisma.practiceGuide.findUnique({
    where: { title: title },
  });
  if (!practiceGuideExists) {
    const writtenPracticeGuide = await prisma.practiceGuide.create({
      data: {
        title,
        description,
        content,
        publicationDate,
        agent: { connect: { id: agentId } }
      },
    });
    res.status(201).json({
      message: "Practice guide wrote successfully.",
      practiceGuide: writtenPracticeGuide,
    });
  } else
    res
      .status(409)
      .send({
        message: "Practice guide with same title already exist in database.",
      });
});


