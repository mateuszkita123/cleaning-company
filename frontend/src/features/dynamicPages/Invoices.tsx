import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { Return } from "../links/Return";

interface IInvoices {
  _id: String,
  is_b2b: boolean,
  invoice_data_id: Number
}

interface IInvoicesState {
  invoices: IInvoices[];
  status: FetchingDataStatus;
}

export const Invoices: FC = () => {
  const [data, setData] = useState<IInvoicesState["invoices"]>([]);
  const [status, setStatus] = useState<IInvoicesState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'faktury', options)
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
    <>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: "center" }}>Wystawione faktury</h1>
        </div>
        <div className="row text-center flex-wrap">
          {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
          {status !== FetchingDataStatus.FAILED ? (<table className="table">
            <thead>
              <tr>
                <th>Id zespołu</th>
                <th>Firma</th>
                <th>Id danych do faktury</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element._id.toString()}>
                  <th>{element._id}</th>
                  <th>{element.is_b2b}</th>
                  <th>{element.invoice_data_id}</th>
                  <th>usuń, szczegóły, edytuj, wyślij wiadomość</th>
                </tr>))}
            </tbody>
          </table>) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to="/faktury/dodaj">Wystaw fakturę</Link>
          <Return />
        </p>
      </div>
    </>
  );
}
