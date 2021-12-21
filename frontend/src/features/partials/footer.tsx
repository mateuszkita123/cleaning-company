import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-muted">
          &copy; Cleaning Master{' | '}
          <Link to="/">Strona główna</Link>{' | '}
          <Link to="/kontakt">Kontakt</Link>
        </p>
      </div>
    </footer>
  );
}
