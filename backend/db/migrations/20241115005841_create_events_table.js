/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table
      .integer("event_schemas_id")
      .unsigned()
      .notNullable();
    table
      .foreign("event_schemas_id")
      .references("id")
      .inTable("event_schemas");
    table.text("eventData_json").notNullable();
    table.timestamp("date_added").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("events");
};
