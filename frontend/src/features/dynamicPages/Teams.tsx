import { FC, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { ITeamsState } from "../../interfaces";
import { ActionButtons } from "../links/ActionButtons";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

export const Teams: FC = () => {
  const [data, setData] = useState<ITeamsState["teams"]>([]);
  const [status, setStatus] = useState<ITeamsState["status"]>(FetchingDataStatus.IDLE);
  const location = useLocation();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'zespoly', options)
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

  return location.pathname === "/zespoly" ? (
    <>
      <div className="container">
        <div className="row">
          <h1 style={{ textAlign: "center" }}>Zespoły pracowników</h1>
        </div>
        <div className="row text-center flex-wrap">
          {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
          {status !== FetchingDataStatus.FAILED ? (<Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Id pracowników</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element) => (
                <tr key={element._id.toString()}>
                  <th>{element.name}</th>
                  <th>{element.employee_id[0]}</th>
                  <th><ActionButtons id={element._id} /></th>
                </tr>))}
            </tbody>
          </Table>) : <p>Nie udało się pobrać danych</p>}
        </div>
      </div>
      <div className="container">
        <p>
          <Link className="btn btn-primary btn-lg" to="/zespoly/dodaj">Utwórz zespół</Link>
          <ReturnToHomePage />
        </p>
      </div>
    </>
  ) : (
    <Outlet />
  )
}
