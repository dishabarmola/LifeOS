const service = require('../services/planService');
const userId = (req) => req.user.userId;

const sendError = (res, error, message) => { console.error(message, error); res.status(500).json({ success: false, message }); };
const getPlans = async (req, res) => { try { res.json({ success: true, data: await service.getPlans(userId(req)) }); } catch (error) { sendError(res, error, 'Failed to fetch plans'); } };
const postPlan = async (req, res) => { try { res.status(201).json({ success: true, data: await service.createPlan(userId(req), req.body) }); } catch (error) { sendError(res, error, 'Failed to create plan'); } };
const updatePlan = async (req, res) => { try { res.json({ success: true, data: await service.updatePlan(userId(req), req.params.id, req.body) }); } catch (error) { sendError(res, error, 'Failed to update plan'); } };
const deletePlan = async (req, res) => { try { await service.deletePlan(userId(req), req.params.id); res.json({ success: true, message: 'Plan deleted successfully' }); } catch (error) { sendError(res, error, 'Failed to delete plan'); } };

module.exports = { getPlans, postPlan, updatePlan, deletePlan };
