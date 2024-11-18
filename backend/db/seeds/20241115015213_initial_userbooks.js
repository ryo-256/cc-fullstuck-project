/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("user_books").del();
  await knex("user_books").insert([
    {
      id: 1,
      user_id: 1,
      book_id: 1,
      reading_status: 2,
    },
    {
      id: 2,
      user_id: 1,
      book_id: 2,
      reading_status: 0,
    },
    {
      id: 3,
      user_id: 1,
      book_id: 4,
      reading_status: 0,
    },
    {
      id: 4,
      user_id: 1,
      book_id: 5,
      reading_status: 0,
    },
  ]);
};
