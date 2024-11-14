const express = require("express");
const { findAll } = require("./models/bookModel");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */

  // expressアプリケーションを生成
  const app = express();

  // jsonを使うためのミドルウェア
  app.use(express.json());

  app.get("/", function(req, res) {
    res.send("hello world");
  });

  app.get("/api/books", async (req, res) => {
    try {
      const books = await findAll();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: "Failed to get todos" });
    }
  });

  return app;
};

module.exports = { setupServer };
