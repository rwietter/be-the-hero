
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    // auto increment id
    table.increments(); 

    // table
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    // relation
    table.string('ong_id').notNullable();

    // foreign key
    table.foreign('ong_id').references('id').inTable('ongs')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
