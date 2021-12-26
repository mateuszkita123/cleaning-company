import { FC, useState, useEffect } from "react";
import { FetchingDataStatus } from "../../constans";

interface IInvoicesData {
  _id: String,
  first_name: String,
  last_name: String,
  company_name: String,
  company_vat_number: String,
  company_address: String,
  company_phone: String,
  company_email: String,
}

interface IUsersState {
  invoicesData: IInvoicesData[];
  status: FetchingDataStatus;
}

export const InvoicesData: FC = () => {
  const [data, setData] = useState<IUsersState["invoicesData"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch('http://localhost:4000/dane_do_faktur', {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    })
      .then(res => res.json())
      .then((result) => {
        setData(result);
      })
      .catch(error => {
        console.log("Błąd: ", error);
        setStatus(FetchingDataStatus.FAILED);
      })
      .finally(() => {
        setStatus(FetchingDataStatus.IDLE);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Zarejestrowani użytkownicy</h1>
      </div>
      <div className="row text-center flex-wrap">
        {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
        {status !== FetchingDataStatus.FAILED ? (<table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Nazwa firmy</th>
              <th>NIP</th>
              <th>Adres</th>
              <th>Telefon</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element._id.toString()}>
                <th>{element._id}</th>
                <th>{element.first_name}</th>
                <th>{element.last_name}</th>
                <th>{element.company_name}</th>
                <th>{element.company_vat_number}</th>
                <th>{element.company_address}</th>
                <th>{element.company_phone}</th>
                <th>{element.company_email}</th>
              </tr>))}
          </tbody>
        </table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
