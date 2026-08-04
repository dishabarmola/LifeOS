const router = require('express').Router();
const { getHealthEntries, postHealthEntry, updateHealthEntry, deleteHealthEntry } = require('../controllers/healthController');

router.get('/', getHealthEntries);
router.post('/', postHealthEntry);
router.put('/:id', updateHealthEntry);
router.delete('/:id', deleteHealthEntry);

module.exports = router;
