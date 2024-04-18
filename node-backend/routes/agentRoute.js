const agentController = require('../controllers/agentController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/register', agentController.registerAgent);
router.post('/login', agentController.loginAsAgent);
router.get('/names', agentController.getAgentByName);
router.get('/:id', agentController.getAgentById);
router.get('/', agentController.getAllAgents);
router.patch('/:id', agentController.updateAgentById);
router.delete('/:id', agentController.deleteAgentById);

module.exports = router;
