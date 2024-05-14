const beneficiaryController = require('../controllers/beneficiaryController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', beneficiaryController.createBeneficiary, authorization.verifyToken);
router.get('/names', beneficiaryController.getBeneficiaryByName, authorization.verifyToken);
router.get('/:id', beneficiaryController.getBeneficiaryById, authorization.verifyToken);
router.get('/', beneficiaryController.getAllBeneficiaries, authorization.verifyToken);
router.patch('/:id', beneficiaryController.updateBeneficiaryById), authorization.verifyToken;
router.delete('/:id', beneficiaryController.deleteBeneficiaryById, authorization.verifyToken);

module.exports = router;
