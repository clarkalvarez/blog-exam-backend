exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table.integer("post_id").unsigned().references("id").inTable("posts");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.string("comment").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
