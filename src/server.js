const express = require("express");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */

  // expressアプリケーションを生成
  const app = express();

  // jsonを使うためのミドルウェア
  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("hello world");
  });

  return app;
};

module.exports = { setupServer };
