import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { getOptions } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { UserContext } from "../../../context/UserContext";
import { IInvoicesState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";
import { ReturnToHomePage } from "../../links/ReturnToHomePage";

export const Invoices: FC = () => {
  const [data, setData] = useState<IInvoicesState["invoices"]>([]);
  const [status, setStatus] = useState<IInvoicesState["status"]>(FetchingDataStatus.IDLE);
  const { userContext } = useContext(UserContext);
  const { refreshContext } = useContext(RefreshContext);
  const location = useLocation();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.INVOICES, getOptions(userContext.token))
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
  }, [refreshContext.refreshId]);

  if (status === FetchingDataStatus.LOADING && data.length === 0) {
    return <Loader />
  }

  return location.pathname === Endpoints.INVOICES ? (
    <>
      <div className="container">
        <h1 className="table-heading">Wystawione faktury</h1>
        <div className="row text-center flex-wrap">
          {status !== FetchingDataStatus.FAILED ? (
            <Table responsive striped bordered hover>
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
          {' '}
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
