const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../server");
chai.should();

const server = setupServer();
describe("APIにアクセスされたら処理を行う", () => {
  const allBooks = [
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
  ];

  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  afterEach(() => {
    if (request.close) request.close();
  });

  describe("GETで/api/booksにアクセスすると", () => {
    it("クエリパラメータがない場合、すべての本のデータが返される", async () => {
      const res = await request.get("/api/books");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(allBooks);
    });
    it("URLパラメータにUserIdが渡された場合、ユーザが積読本として登録した本のデータが返される", async () => {
      const res = await request.get("/api/users/1/books");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal([
        allBooks[0],
        allBooks[1],
        allBooks[3],
        allBooks[4],
      ]);
    });
  });

  describe("POSTで/api/user-books/:userBookId/eventsにアクセスすると", () => {
    it("リクエストが不正な場合、ステータスコード400を返す", async () => {
      const res = await request.post("/api/user-books/2/events");
      res.should.have.status(400);
    });
    it("リクエストが正しい場合、データを登録し、ステータスコード201を返す", async () => {
      const res = await request.post("/api/user-books/2/events").send({
        event_schemas_id: 1,
        eventData_json: {
          keyword: "テスト",
          reason: "新しい発見があったから",
          comment: "テスト",
        },
      });
      res.should.have.status(201);
    });
  });
});
