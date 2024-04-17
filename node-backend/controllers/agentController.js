const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaConfig");
const { validator, schemaForAgent } = require("../utils/validation");

// Registering an agent
function registerAgent(req, res) {
  const agent = {
    agentName: req.body.agentName,
    businessRegistrationNumber: req.body.businessRegistrationNumber,
    agentAddress: req.body.agentAddress,
    agentTelephone: req.body.agentTelephone,
    agentEmail: req.body.agentEmail,
    agentUsername: req.body.agentUsername,
    agentPassword: CryptoJS.AES.encrypt(
      req.body.agentPassword,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  };

  // Validate user input
  const validationResponse = validator.validate(
    agent,
    schemaForAgent
  );

  if (validationResponse !== true) {
    res.status(400).json({
      message: "Validation failed.",
      errors: validationResponse,
    });

  } else {
    prisma.agent.findUnique({ where: { businessRegistrationNumber: req.body.businessRegistrationNumber } })
      .then((data) => {
        if (data) {
          res.status(409).json({
            message: "An agent already exists with the same business registration number.",
          });
        } else {
          prisma.agent.create({data: agent})
            .then((createdAgent) => {
              res.status(201).json({
                message: "Agent created successfully.",
                agent: createdAgent,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error creating the agent.",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Unexpected error occured.",
          error: err,
        });
      });
  }
}

// Logging in as an agent
function loginAsAgent(req, res) {
  prisma.agent.findUnique({ where: { agentUsername: req.body.agentUsername } })
    .then((currentAgent) => {
      if (currentAgent === null) {
        res.status(401).json({
          message: "Incorrect username.",
        });
      } else {
        const hashedPassword = CryptoJS.AES.decrypt(
          currentAgent.agentPassword,
          process.env.PASSWORD_SECRET_KEY
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.agentPassword &&
          res.status(401).json("Incorrect password.");

        const accessToken = jwt.sign(
          {
            id: currentAgent.id,
            agentEmail: currentAgent.agentEmail,
            agentUsername: currentAgent.agentUsername
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30m" },
          function (err, accessToken) {
            res.status(200).json({
              message:
                "Authentication successful and logged in as an agent.",
              accessToken: accessToken,
            });
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error logging in as agent.",
        error: err,
      });
    });
}

module.exports = {
  registerAgent, loginAsAgent
};
