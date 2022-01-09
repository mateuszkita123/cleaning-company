import { useContext, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer, } from './features/partials/Footer';
import { Header } from './features/partials/Header';
import { API_URL, UserRoles } from './app/constans';
import { UserContext } from './context/UserContext';
import { Login } from './features/authorization/Login';
import { Register } from './features/authorization/Register';
import { Account } from './features/dynamicPages/Account';
import { AddInvoice } from './features/dynamicPages/AddInvoice';
import { AddService } from './features/dynamicPages/AddService';
import { AddTeams } from './features/dynamicPages/AddTeam';
import { Clients } from './features/dynamicPages/Clients';
import { Invoices } from './features/dynamicPages/Invoices';
import { InvoicesData } from './features/dynamicPages/InvoicesData';
import { Services } from './features/dynamicPages/Services';
import { Teams } from './features/dynamicPages/Teams';
import { UsersPage } from './features/dynamicPages/UsersPage';
import { ContactPage } from './features/staticPages/ContactPage';
import { HomePage } from './features/staticPages/HomePage';
import { PageNotFound } from './features/staticPages/PageNotFound';
import { PrivateRoutes } from './features/authorization/PrivateRoutes';
import './App.css';

function App() {
  const { userContext, setUserContext } = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(API_URL + "/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          console.warn("setUserContext token=data.token because of ok response from /refreshToken");
          setUserContext({ ...userContext, token: data.token });
        } else {
          console.warn("setUserContext token=null because of NOT ok response from /refreshToken");
          setUserContext({ ...userContext, token: null });
        }
        // call refreshToken every 5 minutes to renew the authentication token.
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
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
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={"kontakt"} element={<ContactPage />} />
          <Route path={"logowanie"} element={<Login />} />
          <Route path={"rejestracja"} element={<Register />} />
          <Route path="/" element={<PrivateRoutes role={UserRoles.ADMIN} />} >
            <Route path={"me"} element={<Account />} />
            <Route path={"uzytkownicy"} element={<UsersPage />} />
            <Route path={"dane_do_faktur"} element={<InvoicesData />} />
            <Route path={"zespoly"} element={<Teams />}>
              <Route path={"dodaj"} element={<AddTeams />} />
            </Route>
            <Route path={"faktury"} element={<Invoices />} >
              <Route path={"dodaj"} element={<AddInvoice />} />
            </Route>
            <Route path={"uslugi"} element={<Services />} >
              <Route path={"dodaj"} element={<AddService />} />
              <Route path={"edytuj/:serviceId"} element={<AddService />} />
            </Route>
            <Route path={"klienci"} element={<Clients />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
