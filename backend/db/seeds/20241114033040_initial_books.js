/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("user_books").del();
  await knex("books").del();
  await knex("books").insert([
    {
      id: 1,
      title: "Readable Code",
      author: "Dustin Boswell",
      cover_image_url: "https://covers.openlibrary.org/b/id/7022055-M.jpg",
    },
    {
      id: 2,
      title: "Hackers and Painters",
      author: "Paul Graham",
      cover_image_url: "https://covers.openlibrary.org/b/id/388913-L.jpg",
    },
    {
      id: 3,
      title: "Learning Python",
      author: "Mark Lutz",
      cover_image_url: "https://covers.openlibrary.org/b/id/14618670-L.jpg",
    },
  ]);
};
