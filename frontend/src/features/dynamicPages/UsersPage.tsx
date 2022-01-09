import { FC, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { API_URL, Endpoints, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { IUsersState } from "../../interfaces";
import { ActionButtons } from "../links/ActionButtons";

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<IUsersState["users"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.ALL_USERS, options)
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
        <h1 style={{ textAlign: "center" }}>Zarejestrowani użytkownicy</h1>
      </div>
      <div className="row text-center flex-wrap">
        {status === FetchingDataStatus.LOADING && <p>Pobieranie danych</p>}
        {status !== FetchingDataStatus.FAILED ? (<Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id.toString()}>
                <th>{user.firstName} {user.lastName}</th>
                <th>{user.username}</th>
                <th>{user.role_id}</th>
                <th><ActionButtons id={user._id} endpoint={Endpoints.ALL_USERS} /></th>
              </tr>))}
          </tbody>
        </Table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
