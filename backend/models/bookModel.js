const knex = require("../db/knex");
module.exports = {
  async findAllBooks() {
    return knex("books").select("*");
  },
  async findUserBooks(userId) {
    return knex("books")
      .join("user_books", "books.id", "=", "user_books.book_id")
      .where("user_books.user_id", userId)
      .select("books.*");
  },
};
