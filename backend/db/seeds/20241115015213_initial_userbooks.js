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
    {
      user_id: 1,
      event_id: 2,
      book_id: 2,
      reading_status: 0,
    },
    {
      user_id: 1,
      event_id: 3,
      book_id: 4,
      reading_status: 0,
    },
    {
      user_id: 1,
      event_id: 4,
      book_id: 5,
      reading_status: 0,
    },
  ]);
};
