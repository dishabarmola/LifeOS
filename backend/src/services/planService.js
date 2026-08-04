const Plan = require('../models/Plan');

const getPlans = (userId) => Plan.find({ userId }).sort({ startDate: 1 });
const createPlan = (userId, data) => new Plan({ userId, ...data }).save();
const updatePlan = async (userId, id, data) => {
  const plan = await Plan.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true, runValidators: true });
  if (!plan) throw new Error('Plan not found');
  return plan;
};
const deletePlan = async (userId, id) => {
  const plan = await Plan.findOneAndDelete({ _id: id, userId });
  if (!plan) throw new Error('Plan not found');
  return plan;
};

module.exports = { getPlans, createPlan, updatePlan, deletePlan };
