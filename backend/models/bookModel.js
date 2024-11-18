const e = require("express");
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
  async createEvent(userBookId, eventData) {
    try {
      await knex.transaction(async (trx) => {
        const [eventId] = await trx("events")
          .insert(eventData)
          .returning("id");
        const userBookEvent = {
          event_id: parseInt(eventId.id),
          user_book_id: parseInt(userBookId),
        };
        await trx("user_book_events").insert(userBookEvent);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
