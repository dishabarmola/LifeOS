const router = require('express').Router();
const { getAcademics, postAcademic, updateAcademic, deleteAcademic } = require('../controllers/academicController');

router.get('/', getAcademics);
router.post('/', postAcademic);
router.put('/:id', updateAcademic);
router.delete('/:id', deleteAcademic);

module.exports = router;
