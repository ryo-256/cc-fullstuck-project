/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("user_books").del();
  await knex("user_books").insert([
    {
      user_id: 1,
      event_id: 1,
      book_id: 1,
      reading_status: 2,
    },
  ]);
};
