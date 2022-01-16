import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { getOptions } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { UserContext } from "../../../context/UserContext";
import { IUsersState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";

export const UsersPage: FC = () => {
  const [data, setData] = useState<IUsersState["users"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>(FetchingDataStatus.IDLE);
  const { refreshContext } = useContext(RefreshContext);
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.ALL_USERS, getOptions(userContext.token))
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

  return (
    <div className="container">
      <h1 className="table-heading">Zarejestrowani użytkownicy</h1>
      <div className="row text-center flex-wrap">
        {status !== FetchingDataStatus.FAILED ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Email</th>
                <th>Rola</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
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
