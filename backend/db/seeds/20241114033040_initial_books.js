/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("books").del();
  await knex("books").insert([
    { title: "Readable Code", author: "Dustin Boswell", genre: "Tech" },
    { title: "Hackers and Painters", author: "Paul Graham", genre: "Tech" },
  ]);
};
