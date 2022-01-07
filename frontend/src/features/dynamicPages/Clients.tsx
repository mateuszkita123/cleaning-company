import { FC, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { IClientsState } from "../../interfaces";
import { ActionButtons } from "../links/ActionButtons";

export const Clients: FC = () => {
  const [users, setUsers] = useState<IClientsState["clients"]>([]);
  const [status, setStatus] = useState<IClientsState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'klienci', options)
      .then(res => res.json())
      .then((result) => {
        setUsers(result);
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
        <h1 style={{ textAlign: "center" }}>Klienci</h1>
      </div>
      <div className="row text-center flex-wrap">
        {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
        {status !== FetchingDataStatus.FAILED ? (<Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id.toString()}>
                <th>{user.firstName} {user.lastName}</th>
                <th>{user.username}</th>
                <th><ActionButtons /></th>
              </tr>))}
          </tbody>
        </Table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
