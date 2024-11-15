/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("books", (table) => {
    table.dropColumn("status");
    table.dropColumn("date_added");
    table.dropColumn("genre");
    table.string("cover_image_url", 512);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.createTable("books", (table) => {
    table.integer("status", 1).defaultTo(0);
    table.timestamp("date_added").defaultTo(knex.fn.now());
    table.string("genre", 100);
    table.dropColumn("cover_image_url");
  });
};
