const connectionDatabase = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const ongs = await connectionDatabase('ongs').select('*');
    return response.json(ongs);
  },

  async create(request, response) {
    const data = request.body; // dados do corpo da função
    const { name, email, whatsapp, city, uf } = data;

    const id = crypto.randomBytes(4).toString('HEX'); // generator crypto

    await connectionDatabase('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id }); // create a new route
  },
};
