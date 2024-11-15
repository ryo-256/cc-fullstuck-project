import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/styles.css";
import Navbar from "./Navbar";

function App() {
  const [books, setBooks] = useState([]);
  const [randomSelectedBooks, setRandomSelectedBooks] = useState([]);
  //const [userId, setUserId] = useState(1);
  const [currentView, setCurrentView] = useState("Home");
  const [formData, setFormData] = useState({
    keyword: "",
    reason: "",
    comment: ""
  });

  function setCurrentViewToHome() {
    setCurrentView("Home");
  }

  function handleSubmit() {
    console.log("submit!");
  }

  function updateFormData(e) {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const fetchAllBooks = async () => {
        const res = await fetch(`${baseUrl}/api/books?UserId=1`);
        if (!res.ok) {
          throw new Error("error");
        }
        const data = await res.json();
        setBooks(data);
        setRandomSelectedBooks(data[Math.floor(Math.random() * data.length)]);
      };
      fetchAllBooks();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(currentView);
  console.log(formData);
  return (
    <>
      <Navbar setCurrentViewToHome={setCurrentViewToHome} />
      {currentView === "Home" ? (
        <>
          <div>
            <h1>TODAY TSUNDOKU</h1>
            <img
              className="image"
              src={randomSelectedBooks.cover_image_url}
              onClick={() => {
                setCurrentView("Event");
              }}
            />
          </div>
          <h2>MY TSUNDOKU COLLECTION</h2>
          <ul>
            {books.map(book => {
              return (
                <li className="imageCell" key={book.id}>
                  <img
                    className="image"
                    src={book.cover_image_url}
                    alt="None"
                  />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <div>
            <h1>MISSION!</h1>
            <div>制限時間以内に本の中から1つのキーワードを選択し入力せよ！</div>
            <img
              className="image"
              src={randomSelectedBooks.cover_image_url}
              onClick={() => {
                setCurrentView("Event");
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                keyword:
                <input
                  type="text"
                  name="keyword"
                  value={formData.keyword}
                  onChange={updateFormData}
                />
              </label>
            </div>
            <div>
              <label>
                reason:
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={updateFormData}
                />
              </label>
            </div>
            <div>
              <label>
                comment:
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={updateFormData}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}

export default App;
