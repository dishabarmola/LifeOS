const Health = require('../models/Health');

const getHealthEntries = (userId) => Health.find({ userId }).sort({ date: -1 });
const createHealthEntry = (userId, data) => new Health({ userId, ...data }).save();
const updateHealthEntry = async (userId, id, data) => {
  const entry = await Health.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true, runValidators: true });
  if (!entry) throw new Error('Health entry not found');
  return entry;
};
const deleteHealthEntry = async (userId, id) => {
  const entry = await Health.findOneAndDelete({ _id: id, userId });
  if (!entry) throw new Error('Health entry not found');
  return entry;
};

module.exports = { getHealthEntries, createHealthEntry, updateHealthEntry, deleteHealthEntry };
