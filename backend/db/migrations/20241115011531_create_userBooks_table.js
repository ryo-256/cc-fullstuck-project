/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user_books", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
    table
      .integer("event_id")
      .unsigned()
      .notNullable();
    table
      .foreign("event_id")
      .references("id")
      .inTable("events");
    table
      .integer("book_id")
      .unsigned()
      .notNullable();
    table
      .foreign("book_id")
      .references("id")
      .inTable("books");
    table.integer("reading_status").notNullable();
    table.timestamp("date_added").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("user_books");
};
