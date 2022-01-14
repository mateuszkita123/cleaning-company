import { FC, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { options } from "../../../app/utils";
import { IInvoicesState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { ReturnToHomePage } from "../../links/ReturnToHomePage";

export const Invoices: FC = () => {
  const [data, setData] = useState<IInvoicesState["invoices"]>([]);
  const [status, setStatus] = useState<IInvoicesState["status"]>(FetchingDataStatus.IDLE);
  const location = useLocation();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.INVOICES, options)
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

  return location.pathname === Endpoints.INVOICES ? (
    <>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: "center" }}>Wystawione faktury</h1>
        </div>
        <div className="row text-center flex-wrap">
          {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
          {status !== FetchingDataStatus.FAILED ? (<Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Firma</th>
                <th>Id danych do faktury</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element._id.toString()}>
                  <th>{element.is_b2b ? "Tak" : "Nie"}</th>
                  <th>{element.invoice_data_id}</th>
                  <th><ActionButtons id={element._id} endpoint={Endpoints.INVOICES} /></th>
                </tr>))}
            </tbody>
          </Table>) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to={Endpoints.ADD_INVOICES}>Wystaw fakturę</Link>
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
