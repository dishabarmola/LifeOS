const router = require('express').Router();
const { getPlans, postPlan, updatePlan, deletePlan } = require('../controllers/planController');

router.get('/', getPlans);
router.post('/', postPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

module.exports = router;
