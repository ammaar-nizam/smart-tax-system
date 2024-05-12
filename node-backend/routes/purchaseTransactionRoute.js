const purchaseTransactionController = require('../controllers/purchaseTransactionController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', purchaseTransactionController.createPurchaseTransaction);

module.exports = router;
