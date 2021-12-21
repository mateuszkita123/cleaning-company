import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  currentUser?: { username: String, _id: String },
  success?: String,
  error?: String,
  page?: String
}

export const Header: FC<Props> = (props) => {
  const { currentUser, success, error, page } = props;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ background: "#e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Cleaning Master</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={typeof page !== 'undefined' && page === 'services' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/uslugi">Usługi</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'contact' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/kontakt">Kontakt</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'users' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/uzytkownicy">Użytkownicy</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'invoicesData' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/dane_do_faktur">Dane do faktur</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'invoices' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/faktury">Faktury</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'teams' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/zespoly">Zespoły</Link>
              </li>
              <li className={typeof page !== 'undefined' && page === 'clients' ? 'active' : 'nav-item'}>
                <Link className="nav-link" to="/klienci">Klienci</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {!currentUser ? (<>
                <li className={typeof page !== 'undefined' && page === 'login' ? 'active nav-item' : 'nav-item'} style={{ marginRight: "0.5em" }}>
                  <Link className="nav-link" to="/login">Logowanie</Link>
                </li>
                <li className={typeof page !== 'undefined' && page === 'register' ? 'active nav-item' : 'nav-item'}>
                  <Link className="nav-link" to="/register">Rejestracja</Link>
                </li>
              </>) : (<>
                <li style={{ marginRight: "0.5em" }}>
                  <Link className="nav-link" to={"/konto/" + currentUser._id}>Zalogowano jako {currentUser.username}</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/logout">Wyloguj</Link>
                </li></>)}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        {error && error.length > 0 ? (<div className="alert alert-danger">
          <p>
            {error}
          </p>
        </div>) : null}
        {success && success.length > 0 ? (<div className="alert alert-success">
          <p>
            {success}
          </p>
        </div>) : null}
      </div>
      <div className="container"></div>
    </>
  );
}
