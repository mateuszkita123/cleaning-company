import './App.css';
import { Footer } from './features/footer/Footer';
import { Header } from './features/header/Header';
import { HomePage } from './features/homePage/homePage';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
