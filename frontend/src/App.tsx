import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './features/authorization/login';
import { Register } from './features/authorization/register';
import { Footer } from './features/footer/Footer';
import { Header } from './features/header/Header';
import { HomePage } from './features/homePage/homePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
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
