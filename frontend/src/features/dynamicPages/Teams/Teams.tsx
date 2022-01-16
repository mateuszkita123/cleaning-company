import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { optionsGet } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { ITeamsState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";
import { ReturnToHomePage } from "../../links/ReturnToHomePage";

export const Teams: FC = () => {
  const [data, setData] = useState<ITeamsState["teams"]>([]);
  const [status, setStatus] = useState<ITeamsState["status"]>(FetchingDataStatus.IDLE);
  const { refreshContext } = useContext(RefreshContext);
  const location = useLocation();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.TEAMS, optionsGet)
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

  return location.pathname === Endpoints.TEAMS ? (
    <>
      <div className="container">
        <h1 className="table-heading">Zespoły pracowników</h1>
        <div className="row text-center flex-wrap">
          {status !== FetchingDataStatus.FAILED ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Pracownicy</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => (
                  <tr key={element._id.toString()}>
                    <th>{element.name}</th>
                    <th>{element.employee_id.map(employee => (<p>{`${employee.firstName} ${employee.lastName}`}</p>))}</th>
                    <th><ActionButtons id={element._id} endpoint={Endpoints.TEAMS} /></th>
                  </tr>))}
              </tbody>
            </Table>
          ) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to={Endpoints.ADD_TEAMS}>Utwórz zespół</Link>
          {' '}
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
