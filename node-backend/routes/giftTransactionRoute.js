const giftTransactionController = require('../controllers/giftTransactionController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', giftTransactionController.createGiftTransaction);
router.get('/:id', giftTransactionController.getGiftTransactionById);
router.get('/', giftTransactionController.getAllGiftTransactions);
router.patch('/:id', giftTransactionController.updateGiftTransactionById);
router.delete('/:id', giftTransactionController.deleteGiftTransactionById);

module.exports = router;
