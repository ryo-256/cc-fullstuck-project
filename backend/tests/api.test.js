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
      cover_image_url: "https://covers.openlibrary.org/b/id/388913-L.jpg",
    },
    {
      id: 3,
      title: "Learning Python",
      author: "Mark Lutz",
      cover_image_url: "https://covers.openlibrary.org/b/id/14618670-L.jpg",
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
    it("クエリパラメータにUserIdが渡された場合、ユーザが積読本として登録した本のデータが返される", async () => {
      const res = await request.get("/api/books?UserId=1");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal([allBooks[0]]);
    });
  });
});
