import { FC } from 'react';

export const HomePage: FC = () => {
  return (<><header className="jumbotron">
    <div className="container">
      <h1><img src="/images/logo.png" width="100px" /> Cleaning Master</h1>
      <p>Jesteśmy liderem na rynku sprzątającym.</p>
      <p>Zachęcamy do skorzystania z naszych usługi i kontaktu.</p>
      <p>
        <a className="btn btn-primary btn-lg" href="/uslugi">Usługi</a>
        {' '}
        <a className="btn btn-primary btn-lg" href="/kontakt">Kontakt</a>
      </p>
    </div>
  </header>

    <div className="container">
      <h3>Nasze pakiety usług:</h3>
      <div className="row text-center">
        <div className="col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/basic.jpg" alt="Pakiet basic" width="300" />
          </div>
          <h4 className="mt-2">Basic</h4>
          <p>Ceny od 4zł/m2</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/full.jpg" alt="Pakiet full" width="300" />
          </div>
          <h4 className="mt-2">Full</h4>
          <p>Ceny od 6zł/m2</p>
        </div>
        <div className="col-12 col-md-6 col-lg-4 p-4">
          <div>
            <img src="/images/premium.jpg" alt="Pakiet premuim" width="300" />
          </div>
          <h4 className="mt-2">Premium</h4>
          <p>Ceny od 8zł/m2</p>
        </div>
      </div>
    </div></>)
}