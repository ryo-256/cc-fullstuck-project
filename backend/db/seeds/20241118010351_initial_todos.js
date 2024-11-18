/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("user_book_events").del();
  await knex("user_book_events").insert([
    { id: 1, event_id: 1, user_book_id: 1 },
  ]);
};
