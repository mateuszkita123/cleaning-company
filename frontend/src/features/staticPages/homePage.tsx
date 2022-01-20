import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const navigateToAddService = (param: String) => navigate("/uslugi/dodaj?pakiet=" + param);

  return (<>
    <header className="jumbotron">
      <div className="banner-image">
        <div className="banner-content text-white">
              <h1>Jesteśmy liderem na rynku sprzątającym</h1>
              <h2>Zachęcamy do skorzystania z naszych usług i kontaktu!</h2>
        </div>
      </div>
      
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to="/uslugi">Usługi</Link>
          {' '}
          <Link className="btn btn-primary btn-lg" to="/kontakt">Kontakt</Link>
        </p>
      </div>
    </header>

    <div className="container">
      <h3>Nasze pakiety usług:</h3>
      <div className="row text-center">
        <div onClick={() => navigateToAddService("basic")} className="cursor-pointer border rounded-3 col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/basic.jpg" alt="Pakiet basic" width="250" />
          </div>
          <h4 className="mt-2">Basic</h4>
          <p>Cena: 4zł/m2</p>
        </div>
        <div onClick={() => navigateToAddService("full")} className="cursor-pointer border rounded-3 col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/full.jpg" alt="Pakiet full" width="250" />
          </div>
          <h4 className="mt-2">Full</h4>
          <p>Cena: 6zł/m2</p>
        </div>
        <div onClick={() => navigateToAddService("premium")} className="cursor-pointer border rounded-3 col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/premium.jpg" alt="Pakiet premuim" width="250" />
          </div>
          <h4 className="mt-2">Premium</h4>
          <p>Cena: 8zł/m2</p>
        </div>
      </div>
    </div>
  </>)
}