import { FC, useState, useEffect } from "react";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { Return } from "../links/Return";

interface IUsersState {
  users: string[];
  status: FetchingDataStatus;
}

export const AddTeams: FC = () => {
  const [data, setData] = useState<IUsersState["users"]>([]);
  const [status, setStatus] = useState<IUsersState["status"]>(FetchingDataStatus.IDLE);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'zespoly/dodaj', options)
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

  return (
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Tworzenie zespołu</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form action="/zespoly/dodaj" method="POST">
          <div className="form-group">
            <label htmlFor="title">Nazwa</label>
            <input required className="form-control" type="text" name="teamName" id="teamName" placeholder="Np. miotlarze" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Id pracownika</label>
            {data.map((element) => (<p key={element}>{element}</p>))}
            <input className="form-control" type="text" name="id" id="id" placeholder="Id pracownika" required />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block">Zapisz</button>
          </div>
        </form>
        <Return />
      </div>
    </div>
  );
}
