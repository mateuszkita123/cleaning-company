import { Link } from "react-router-dom";

export function NotSignedIn() {
  return (
    <>
      <li className={"nav-item"}>
        <Link className="nav-link" to="/logowanie">Logowanie</Link>
      </li>
      <li className={"nav-item"}>
        <Link className="nav-link" to="/rejestracja">Rejestracja</Link>
      </li>
    </>
  );
}
