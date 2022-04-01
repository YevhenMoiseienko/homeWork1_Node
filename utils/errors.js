function handleError(err, req, res, next) {
  return res.status(500).json({ message: 'Server error' });
}

module.exports = {
  handleError
}