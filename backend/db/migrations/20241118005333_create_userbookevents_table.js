/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user_book_events", (table) => {
    table.increments("id").primary();
    table
      .integer("event_id")
      .unsigned()
      .notNullable();
    table
      .foreign("event_id")
      .references("id")
      .inTable("events");
    table
      .integer("user_book_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_book_id")
      .references("id")
      .inTable("user_books");
    table.timestamp("date_added").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {};
