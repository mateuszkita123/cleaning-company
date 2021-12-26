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
import { AddTeams } from './features/dynamicPages/AddTeams';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/kontakt"} element={<ContactPage />} />
          <Route path={"/logowanie"} element={<Login />} />
          <Route path={"/rejestracja"} element={<Register />} />
          <Route path={"/uzytkownicy"} element={<UsersPage />} />
          <Route path={"/dane_do_faktur"} element={<InvoicesData />} />
          <Route path={"/zespoly"} element={<Teams />} />
          <Route path={"/zespoly/dodaj"} element={<AddTeams />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Strona nie istnieje!</p>
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
