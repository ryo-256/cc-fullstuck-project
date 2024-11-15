import { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/styles.css";
import Navbar from "./Navbar";

function App() {
  const [books, setBooks] = useState([]);
  const [randomSelectedBooks, setRandomSelectedBooks] = useState([]);
  //const [userId, setUserId] = useState(1);
  const [currentView, setCurrentView] = useState("Home");

  function setCurrentViewToHome() {
    setCurrentView("Home");
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
  return (
    <>
      <Navbar setCurrentViewToHome={setCurrentViewToHome} />
      <div>
        <h1>TODAY TSUNDOKU</h1>
        <img className="image" src={randomSelectedBooks.cover_image_url} />
      </div>
      <h2>MY TSUNDOKU COLLECTION</h2>
      <ul>
        {books.map(book => {
          return (
            <li className="imageCell" key={book.id}>
              <img className="image" src={book.cover_image_url} alt="None" />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
