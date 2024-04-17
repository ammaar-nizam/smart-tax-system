const agentController = require('../controllers/agentController')

const router = require("express").Router();

router.post('/register', agentController.registerAgent);
router.post('/login', agentController.loginAsAgent);

module.exports = router;
