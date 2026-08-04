const service = require('../services/healthService');
const userId = (req) => req.user.userId;

const sendError = (res, error, message) => { console.error(message, error); res.status(500).json({ success: false, message }); };
const getHealthEntries = async (req, res) => { try { res.json({ success: true, data: await service.getHealthEntries(userId(req)) }); } catch (error) { sendError(res, error, 'Failed to fetch health entries'); } };
const postHealthEntry = async (req, res) => { try { res.status(201).json({ success: true, data: await service.createHealthEntry(userId(req), req.body) }); } catch (error) { sendError(res, error, 'Failed to create health entry'); } };
const updateHealthEntry = async (req, res) => { try { res.json({ success: true, data: await service.updateHealthEntry(userId(req), req.params.id, req.body) }); } catch (error) { sendError(res, error, 'Failed to update health entry'); } };
const deleteHealthEntry = async (req, res) => { try { await service.deleteHealthEntry(userId(req), req.params.id); res.json({ success: true, message: 'Health entry deleted successfully' }); } catch (error) { sendError(res, error, 'Failed to delete health entry'); } };

module.exports = { getHealthEntries, postHealthEntry, updateHealthEntry, deleteHealthEntry };
