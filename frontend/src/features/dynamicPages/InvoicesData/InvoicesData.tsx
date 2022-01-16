import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, FetchingDataStatus, Endpoints } from "../../../app/constans";
import { optionsGet } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { IInvoicesDataState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";
import { ReturnToHomePage } from "../../links/ReturnToHomePage";

export const InvoicesData: FC = () => {
  const [data, setData] = useState<IInvoicesDataState["invoicesData"]>([]);
  const [status, setStatus] = useState<IInvoicesDataState["status"]>(FetchingDataStatus.IDLE);
  const { refreshContext } = useContext(RefreshContext);
  const location = useLocation();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.INVOICES_DATA, optionsGet)
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

  return location.pathname === Endpoints.INVOICES_DATA ? (
    <>
      <div className="container">
        <h1 className="table-heading">Dane do faktur</h1>
        <div className="row text-center flex-wrap">
          {status !== FetchingDataStatus.FAILED ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Imię</th>
                  <th>Nazwisko</th>
                  <th>Nazwa firmy</th>
                  <th>NIP</th>
                  <th>Adres</th>
                  <th>Telefon</th>
                  <th>Email</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => (
                  <tr key={element._id.toString()}>
                    <th>{element.first_name}</th>
                    <th>{element.last_name}</th>
                    <th>{element.company_name}</th>
                    <th>{element.company_vat_number}</th>
                    <th>{element.company_address}</th>
                    <th>{element.company_phone}</th>
                    <th>{element.company_email}</th>
                    <th><ActionButtons id={element._id} endpoint={Endpoints.INVOICES_DATA} /></th>
                  </tr>))}
              </tbody>
            </Table>) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to={Endpoints.ADD_INVOICES_DATA}>Dodaj dane do faktury</Link>
          {' '}
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
