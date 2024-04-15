import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

// Function to create an agent
export const createAgent = asyncHandler(async (req, res) => {
  const agent = {
    agentName: req.body.agentName,
    businessRegistrationNumber: req.body.businessRegistrationNumber,
    agentAddress: req.body.agentEagentAddressmail,
    agentTelephone: req.body.agentTelephone,
    agentEmail: req.body.agentEmail,
    agentUsername: req.body.agentUsername,
    agentPassword: CryptoJS.AES.encrypt(
      req.body.agentPassword,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  };

  console.log("Creating an agent...");

  const agentExists = await prisma.agent.findUnique({
    where: { businessRegistrationNumber: req.body.businessRegistrationNumber },
  });
  if (!agentExists) {
    const createdAgent = await prisma.agent.create({ data: agent });
    res.status(201).json({
      message: "Agent created successfully.",
      agent: createdAgent,
    });
  } else res.status(409).json({ message: "Agent already in database." });
});

// Function to get agent by id
export const getAgentById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const agentExists = await prisma.agent.findUnique({
      where: { id: parseInt(id) },
    });
    if (agentExists) {
      res.status(201).json(agentExists);
    } else {
      res.status(404).json({
        message: "Agent not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving the agent.",
      error: err,
    });
  }
});

// Function to get all the agents
export const getAllAgents = asyncHandler(async (req, res) => {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(201).json(agents);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving all agents.",
      error: err,
    });
  }
});
