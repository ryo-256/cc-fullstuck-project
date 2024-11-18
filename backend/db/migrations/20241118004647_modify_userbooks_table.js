/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("user_books", (table) => {
    table.dropColumn("event_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("user_books", (table) => {
    table
      .integer("event_id")
      .unsigned()
      .notNullable();
    table
      .foreign("event_id")
      .references("id")
      .inTable("events");
  });
};
