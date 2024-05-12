const prisma = require("../config/prismaConfig");
const { validator, schemaForPurchaser } = require("../utils/validation");

// Create a Purchase Transaction
function createPurchaseTransaction(req, res) {
  const purchaseTransaction = {
    propertyAddress: req.body.propertyAddress,
    type: req.body.type,
    consideration: req.body.consideration,
    effectiveDate: req.body.effectiveDate,
    vendorName: req.body.vendorName,
    vendorNIC: req.body.vendorNIC,
    vendorAgentName: req.body.vendorAgentName,
    vendorAgentAddress: req.body.vendorAgentAddress,
    purchaserId: req.body.purchaserId,
  };

  prisma.purchaseTransaction
    .findFirst({
      where: {
        AND: [
          { propertyAddress: req.body.propertyAddress },
          { effectiveDate: req.body.effectiveDate },
        ],
      },
    })
    .then((data) => {
      if (data) {
        res.status(409).json({
          message: "A transaction already exists.",
        });
      } else {
        prisma.purchaseTransaction
          .create({ data: purchaseTransaction })
          .then((createdPurchaseTransaction) => {
            res.status(201).json({
              message: "Transaction created successfully.",
              purchaseTransaction: createdPurchaseTransaction,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error creating the transaction.",
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Unexpected error occured.",
        error: err,
      });
    });
}

// Get purchaser by Id
function getPurchaserById(req, res) {
  prisma.purchaser
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchaser.",
        error: err,
      });
    });
}

// Get purchaser by name
function getPurchaserByName(req, res) {
  const purchaserName = req.query.purchaserName;
  prisma.purchaser
    .findMany({ where: { purchaserName: { contains: purchaserName } } })
    .then((purchasers) => {
      if (purchasers) {
        res.status(200).json(purchasers);
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the purchaser",
        error: err,
      });
    });
}

// Get all purchasers
function getAllPurchasers(req, res) {
  prisma.purchaser
    .findMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving all purchasers.",
        error: err,
      });
    });
}

// Update purchaser by Id
function updatePurchaserById(req, res) {
  prisma.purchaser
    .update({
      where: { id: parseInt(req.params.id) },
      data: {
        nic: req.body.nic,
        purchaserName: req.body.purchaserName,
        purchaserAddress: req.body.purchaserAddress,
        dob: req.body.dob,
        isFirstProperty: req.body.isFirstProperty,
        isSriLankanResident: req.body.isSriLankanResident,
        isCompany: req.body.isCompany,
        agentId: req.body.agentId,
      },
    })
    .then((updatedPurchaser) => {
      if (updatedPurchaser) {
        res.status(200).json({
          message: "Purchaser updated successfully.",
          purchaser: updatedPurchaser,
        });
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the purchaser.",
        error: err,
      });
    });
}

// Delete purchaser by Id
function deletePurchaserById(req, res) {
  prisma.purchaser
    .delete({ where: { id: parseInt(req.params.id) } })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Purchaser deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "Purchaser not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting the purchaser.",
        error: err,
      });
    });
}

module.exports = {
  createPurchaseTransaction,
  getPurchaserById,
  getPurchaserByName,
  getAllPurchasers,
  updatePurchaserById,
  deletePurchaserById,
};
