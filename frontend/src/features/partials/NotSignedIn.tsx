import { Link } from "react-router-dom";

export function NotSignedIn() {
  return (
    <>
      <li className={"active nav-item"} style={{ marginRight: "0.5em" }}>
        <Link className="nav-link" to="/logowanie">Logowanie</Link>
      </li>
      <li >
        <Link className="nav-link" to="/rejestracja">Rejestracja</Link>
      </li>
    </>
  );
}
