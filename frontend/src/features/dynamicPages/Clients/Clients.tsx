import { FC, useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { optionsGet } from "../../../app/utils";
import { RefreshContext } from "../../../context/RefreshContext";
import { IClientsState } from "../../../interfaces";
import { ActionButtons } from "../../links/ActionButtons";
import { Loader } from "../../links/Loader";

export const Clients: FC = () => {
  const [data, setData] = useState<IClientsState["clients"]>([]);
  const [status, setStatus] = useState<IClientsState["status"]>(FetchingDataStatus.IDLE);
  const { refreshContext } = useContext(RefreshContext);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.CLIENTS, optionsGet)
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
      <h1 className="table-heading">Klienci</h1>
      <div className="row text-center flex-wrap">
        {status !== FetchingDataStatus.FAILED ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Email</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id.toString()}>
                  <th>{user.firstName} {user.lastName}</th>
                  <th>{user.username}</th>
                  <th><ActionButtons id={user._id} endpoint={Endpoints.USERS} /></th>
                </tr>))}
            </tbody>
          </Table>) : <p>Nie udało się pobrać danych</p>}
      </div>
    </div>
  );
}
