import { FC } from 'react';

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
          <a className="navbar-brand" href="#">Cleaning Master</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={typeof page !== 'undefined' && page === 'services' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/uslugi">Usługi</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'contact' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/kontakt">Kontakt</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'users' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/uzytkownicy">Użytkownicy</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'invoicesData' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/dane_do_faktur">Dane do faktur</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'invoices' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/faktury">Faktury</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'teams' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/zespoly">Zespoły</a>
              </li>
              <li className={typeof page !== 'undefined' && page === 'clients' ? 'active' : 'nav-item'}>
                <a className="nav-link" href="/klienci">Klienci</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {!currentUser ? (<>
                <li className={typeof page !== 'undefined' && page === 'login' ? 'active nav-item' : 'nav-item'} style={{ marginRight: "0.5em" }}>
                  <a className="nav-link" href="/login">Logowanie</a>
                </li>
                <li className={typeof page !== 'undefined' && page === 'register' ? 'active nav-item' : 'nav-item'}>
                  <a className="nav-link" href="/register">Rejestracja</a>
                </li>
              </>) : (<><li style={{ marginRight: "0.5em" }}><a className="nav-link" href={"/konto/" + currentUser._id}>Zalogowano jako {currentUser.username}</a></li>
                <li><a className="nav-link" href="/logout">Wyloguj</a></li></>)}
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
