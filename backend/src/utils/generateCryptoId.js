const crypto = require('crypto');

module.exports = function generateCryptoId() {
  return crypto.randomBytes(4).toString('HEX');
};
