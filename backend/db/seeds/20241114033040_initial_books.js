/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("user_book_events").del();
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
      cover_image_url: "https://covers.openlibrary.org/b/id/388913-M.jpg",
    },
    {
      id: 3,
      title: "Learning Python",
      author: "Mark Lutz",
      cover_image_url: "https://covers.openlibrary.org/b/id/14618670-M.jpg",
    },
    {
      id: 4,
      title: "ガリレオの苦悩",
      author: "東野圭吾",
      cover_image_url: "https://covers.openlibrary.org/b/id/8220595-M.jpg",
    },
    {
      id: 5,
      title: "銀河鉄道の夜",
      author: "宮澤賢治",
      cover_image_url: "https://covers.openlibrary.org/b/id/6913539-M.jpg",
    },
  ]);
  await knex.raw(
    "select setval(pg_get_serial_sequence('books', 'id'), MAX(id)) FROM books"
  );
};
