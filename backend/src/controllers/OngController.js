const connectionDatabase = require('../database/connection');
const generateCryptoId = require('../utils/generateCryptoId');

module.exports = {
  async index(request, response) {
    const ongs = await connectionDatabase('ongs').select('*');
    return response.json(ongs);
  },

  async create(request, response) {
    const data = request.body;
    const { name, email, whatsapp, city, uf } = data;

    const id = generateCryptoId();

    await connectionDatabase('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
