import "../styles/navbar.css";

// eslint-disable-next-line react/prop-types
export default function Navbar({ setCurrentViewToHome }) {
  return (
    <div className="navbar">
      <a
        href="#"
        className="navbar-header"
        onClick={() => setCurrentViewToHome()}
      >
        HOME
      </a>
    </div>
  );
}
