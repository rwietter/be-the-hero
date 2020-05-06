const request = require('supertest');
const app = require('../../src/app');
const dbConnection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await dbConnection.migrate.rollback(); // desfaz as migrations
    await dbConnection.migrate.latest(); // cria as migrations
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .set('Authorization', 'id') // testar os headers
      .send({
        name: 'AVAL',
        email: 'aval@gmail.com',
        whatsapp: '3749284775',
        city: 'Frederico Wesphalen',
        uf: 'RS',
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
