import { FC, useState, useEffect } from "react";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { IUsersState } from "../../interfaces";

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<IUsersState["users"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'uzytkownicy', options)
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
        {status !== FetchingDataStatus.FAILED ? (<table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nazwa użytkownika</th>
              <th>Email</th>
              <th>Rola</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id.toString()}>
                <th>{user._id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.role_id}</th>
              </tr>))}
          </tbody>
        </table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
