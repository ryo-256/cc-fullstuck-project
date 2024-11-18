const express = require("express");
const cors = require("cors");
const {
  findAllBooks,
  findUserBooks,
  createEvent,
  findEvents,
} = require("./models/bookModel");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */

  // expressアプリケーションを生成
  const app = express();

  // すべてのオリジンからリクエストを許可する
  app.use(cors());

  // jsonを使うためのミドルウェア
  app.use(express.json());

  app.get("/", function(req, res) {
    res.send("hello world");
  });

  app.get("/api/books/", async (req, res) => {
    try {
      const books = await findAllBooks();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: "Failed to get books" });
    }
  });

  app.get("/api/users/:userId/books", async (req, res) => {
    try {
      const books = await findUserBooks(req.params.userId);
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: "Failed to get books" });
    }
  });

  app.post("/api/user-books/:userBookId/events", async (req, res) => {
    const userBookId = req.params.userBookId;
    if (req.body.eventData_json) {
      createEvent(userBookId, req.body);
      res.status(201).end();
    }
    res.status(400).end();
  });

  app.get("/api/user-books/:userBookId/events", async (req, res) => {
    const userBookId = req.params.userBookId;
    try {
      const events = await findEvents(userBookId);
      res.status(200).json(events);
    } catch {
      res.status(500).json({ error: "Failed to get events" });
    }
  });

  return app;
};

module.exports = { setupServer };
