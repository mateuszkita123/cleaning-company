import { useContext, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './features/authorization/Login';
import { Register } from './features/authorization/Register';
import { InvoicesData } from './features/dynamicPages/InvoicesData';
import { Footer, } from './features/partials/Footer';
import { Header } from './features/partials/Header';
import { ContactPage } from './features/staticPages/ContactPage';
import { HomePage } from './features/staticPages/HomePage';
import { UsersPage } from './features/dynamicPages/UsersPage';
import { Teams } from './features/dynamicPages/Teams';
import { AddTeams } from './features/dynamicPages/AddTeam';
import { Invoices } from './features/dynamicPages/Invoices';
import { Clients } from './features/dynamicPages/Clients';
import { AddInvoice } from './features/dynamicPages/AddInvoice';
import { Services } from './features/dynamicPages/Services';
import { AddService } from './features/dynamicPages/AddService';
import { API_URL } from './app/constans';
import { postOptionsWithCredentials } from './app/utils';
import { UserContext } from './context/UserContext';
import { Loader } from './features/links/Loader';
import { Account } from './features/dynamicPages/Account';

function App() {
  const { userContext, setUserContext } = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(API_URL + "users/refreshToken", postOptionsWithCredentials).then(async response => {
      if (response.ok) {
        const data = await response.json();
        setUserContext({ ...userContext, token: data.token });
      } else {
        setUserContext({ ...userContext, token: null });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    })
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
 * Sync logout across tabs
 */
  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    }
  }, [syncLogout]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {userContext.token === null ? (
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/kontakt"} element={<ContactPage />} />
            <Route path={"/logowanie"} element={<Login />} />
            <Route path={"/rejestracja"} element={<Register />} />
            <Route path={"/uzytkownicy"} element={<UsersPage />} />
            <Route path={"/dane_do_faktur"} element={<InvoicesData />} />
            <Route path={"/zespoly"} element={<Teams />} />
            <Route path={"/zespoly/dodaj"} element={<AddTeams />} />
            <Route path={"/faktury"} element={<Invoices />} />
            <Route path={"/faktury/dodaj"} element={<AddInvoice />} />
            <Route path={"/klienci"} element={<Clients />} />
            <Route path={"/uslugi"} element={<Services />} />
            <Route path={"/uslugi/dodaj"} element={<AddService />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Strona nie istnieje!</p>
                </main>
              }
            />
          </Routes>
        ) : userContext.token ? (
          (
            <Account />
          )
        ) : (
          <Loader />
        )}
        < Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
