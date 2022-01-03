import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { IServicesState } from "../../interfaces";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

export const Services: FC = () => {
  const [data, setData] = useState<IServicesState["services"]>([]);
  const [status, setStatus] = useState<IServicesState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'uslugi', options)
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
          <h1 style={{ textAlign: "center" }}>Zarezerwowane usługi</h1>
        </div>
        <div className="row text-center flex-wrap">
          {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
          {status !== FetchingDataStatus.FAILED ? (<table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Adres</th>
                <th>Powierzchnia</th>
                <th>Cena jednostkowa</th>
                <th>Opis</th>
                <th>Status</th>
                <th>Id zespołów</th>
                <th>Id użytkownika</th>
                <th>Id faktury</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element._id.toString()}>
                  <th>{element._id}</th>
                  <th>{element.service_address}</th>
                  <th>{element.service_area}</th>
                  <th>{element.service_unit_price}</th>
                  <th>{element.description}</th>
                  <th>{element.status}</th>
                  <th>{element.service_address}</th>
                  <th>{element.teams_id}</th>
                  <th>{element.user_id}</th>
                  <th>{element.invoice_id}</th>
                  <th>usuń, szczegóły, edytuj, wyślij wiadomość</th>
                </tr>))
              }
            </tbody>
          </table>) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to="/uslugi/dodaj">Zarezerwuj usługę</Link>
          <ReturnToHomePage />
        </p>
      </div>
    </>
  );
}
