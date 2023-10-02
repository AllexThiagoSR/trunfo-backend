const { updateCardSchema } = require('./schemas');

module.exports = (req, res, next) => {
  const { error } = updateCardSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};
