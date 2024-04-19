const purchaserController = require('../controllers/purchaserController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', purchaserController.createPurchaser);
router.get('/names', purchaserController.getPurchaserByName);
router.get('/:id', purchaserController.getPurchaserById);
router.get('/', purchaserController.getAllPurchasers);
router.patch('/:id', purchaserController.updatePurchaserById);
router.delete('/:id', purchaserController.deletePurchaserById);

module.exports = router;
