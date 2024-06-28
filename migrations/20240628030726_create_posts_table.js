exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("date").notNullable();
    table.integer("user_id").unsigned().references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
