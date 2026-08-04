const service = require('../services/academicService');
const userId = (req) => req.user.userId;

const sendError = (res, error, message) => { console.error(message, error); res.status(500).json({ success: false, message }); };
const getAcademics = async (req, res) => { try { res.json({ success: true, data: await service.getAcademics(userId(req)) }); } catch (error) { sendError(res, error, 'Failed to fetch academic items'); } };
const postAcademic = async (req, res) => { try { res.status(201).json({ success: true, data: await service.createAcademic(userId(req), req.body) }); } catch (error) { sendError(res, error, 'Failed to create academic item'); } };
const updateAcademic = async (req, res) => { try { res.json({ success: true, data: await service.updateAcademic(userId(req), req.params.id, req.body) }); } catch (error) { sendError(res, error, 'Failed to update academic item'); } };
const deleteAcademic = async (req, res) => { try { await service.deleteAcademic(userId(req), req.params.id); res.json({ success: true, message: 'Academic item deleted successfully' }); } catch (error) { sendError(res, error, 'Failed to delete academic item'); } };

module.exports = { getAcademics, postAcademic, updateAcademic, deleteAcademic };
