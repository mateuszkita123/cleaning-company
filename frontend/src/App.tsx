import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './features/authorization/login';
import { Register } from './features/authorization/register';
import { Footer, } from './features/partials/footer';
import { Header } from './features/partials/header';
import { ContactPage } from './features/staticPages/contactPage';
import { HomePage } from './features/staticPages/homePage';

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
