const Academic = require('../models/Academic');

const getAcademics = (userId) => Academic.find({ userId }).sort({ deadline: 1 });
const createAcademic = (userId, data) => new Academic({ userId, ...data }).save();
const updateAcademic = async (userId, id, data) => {
  const academic = await Academic.findOneAndUpdate({ _id: id, userId }, { $set: data }, { new: true, runValidators: true });
  if (!academic) throw new Error('Academic item not found');
  return academic;
};
const deleteAcademic = async (userId, id) => {
  const academic = await Academic.findOneAndDelete({ _id: id, userId });
  if (!academic) throw new Error('Academic item not found');
  return academic;
};

module.exports = { getAcademics, createAcademic, updateAcademic, deleteAcademic };
