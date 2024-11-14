/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.string("author", 255);
    table.integer("status", 1).defaultTo(0);
    table.timestamp("date_added").defaultTo(knex.fn.now());
    table.string("genre", 100);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("books");
};
