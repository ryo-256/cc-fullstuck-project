import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/styles.css";
import Navbar from "./Navbar";
import Event from "./Event";
import PastEvents from "./PastEvents";

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
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState("");

  function setCurrentViewToHome() {
    setCurrentView("Home");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/user-books/${randomSelectedBooks.user_book_id}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            event_schemas_id: 1,
            eventData_json: formData
          })
        }
      );
      if (!res.ok) {
        throw new Error(`レスポンスステータス: ${res.status}`);
      }
      setFormData({
        keyword: "",
        reason: "",
        comment: ""
      });
      setCurrentView("Home");
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getEvents(userBookId, book) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${baseUrl}/api/user-books/${userBookId}/events`);
    if (!res.ok) {
      throw new Error("error");
    }
    const data = await res.json();
    setSelectedEvents(data);
    setCurrentView("pastEvents");
    setSelectedBooks(book);
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
        const res = await fetch(`${baseUrl}/api/users/1/books`);
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
            <h1>今日のチャレンジ本</h1>
            <img
              className="image"
              src={randomSelectedBooks.cover_image_url}
              onClick={() => {
                setCurrentView("Event");
              }}
            />
          </div>
          <h2>積読コレクション</h2>
          <ul>
            {books.map(book => {
              return (
                <li className="imageCell" key={book.id}>
                  <img
                    className="image"
                    src={book.cover_image_url}
                    alt="None"
                    onClick={() => getEvents(book.user_book_id, book)}
                  />
                </li>
              );
            })}
          </ul>
        </>
      ) : currentView === "Event" ? (
        <Event
          randomSelectedBooks={randomSelectedBooks}
          handleSubmit={handleSubmit}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : (
        <PastEvents
          selectedBooks={selectedBooks}
          selectedEvents={selectedEvents}
        />
      )}
    </>
  );
}

export default App;
