const connection = require('../database/connection');

module.exports = {
  // list all incidents router
  async index(request, response) {
    const { page = 1 } = request.query;

    const [maxIncidentsCouter] = await connection('incidents').count();
    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);
    response.header('K-Total-Count', maxIncidentsCouter['count(*)']);
    return response.json(incidents);
  },

  // create a new incidents router
  async create(request, response) {
    const { title, description, value } = request.body;
    // request.headers; contexto, login, position etc... => headers
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },

  // delete incidents router
  async delete(request, response) {
    try {
      const { id } = request.params;
      const ong_id = request.headers.authorization;
      const incidents = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();
      if (incidents.ong_id !== ong_id) {
        return response.status(401).json({
          error: 'Operation not permitted.',
        });
      }
      await connection('incidents').where('id', id).delete();
      return response.status(204).send(); // send(not message) message without body(204)
    } catch (e) {
      console.log(e);
    }
  },
};
