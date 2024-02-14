const jwt = require('jsonwebtoken');
const Banker = require('../models/Banker');

exports.authenticateBanker = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const banker = await Banker.findById(decodedToken.userId);

    if (!banker || banker.role !== 'banker') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.banker = banker;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
