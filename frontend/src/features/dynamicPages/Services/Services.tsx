import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { optionsGet } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { UserContext } from "../../../context/UserContext";
import { IServicesState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";
import { ReturnToHomePage } from "../../links/ReturnToHomePage";

export const Services: FC = () => {
  const [data, setData] = useState<IServicesState["services"]>([]);
  const [status, setStatus] = useState<IServicesState["status"]>(FetchingDataStatus.IDLE);
  const { userContext } = useContext(UserContext);
  const { refreshContext } = useContext(RefreshContext);
  const location = useLocation();

  // console.warn("Services userContext: ", userContext);
  // console.warn("!userContext.token: ", !userContext.token);

  useEffect(() => {
    console.log("Services refreshContext.refreshId: ", refreshContext.refreshId);
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.SERVICES, optionsGet)
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

  return location.pathname === Endpoints.SERVICES ? (
    <>
      <div className="container">
        <h1 className="table-heading">Zarezerwowane usługi</h1>
        <div className="row text-center flex-wrap">
          {status !== FetchingDataStatus.FAILED ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Adres</th>
                  <th>Powierzchnia [m<sup>2</sup>]</th>
                  <th>Cena jednostkowa [PLN/m<sup>2</sup>]</th>
                  <th>Cena całkowita [PLN]</th>
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
                    <th>{element.service_address}</th>
                    <th>{element.service_area}</th>
                    <th>{element.service_unit_price}</th>
                    <th>{element.service_area.valueOf() * element.service_unit_price.valueOf()}</th>
                    <th>{element.description}</th>
                    <th>{element.status}</th>
                    <th>{element.teams_id}</th>
                    <th>{element.user_id}</th>
                    <th>{element.invoice_id}</th>
                    <th><ActionButtons id={element._id} endpoint={Endpoints.SERVICES} /></th>
                  </tr>))
                }
              </tbody>
            </Table>
          ) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to={Endpoints.ADD_SERVICES}>Zarezerwuj usługę</Link>
          {' '}
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
