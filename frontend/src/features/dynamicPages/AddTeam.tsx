import { FC, useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options, optionsPost } from "../../app/utils";
import { IClient, ITeam } from "../../interfaces";

interface IUsersIdsState {
  usersIds: IClient["_id"][];
  status: FetchingDataStatus;
}

export const AddTeams: FC = () => {
  const [data, setData] = useState<IUsersIdsState["usersIds"]>([]);
  const [status, setStatus] = useState<IUsersIdsState["status"]>(FetchingDataStatus.IDLE);
  const [name, setName] = useState<ITeam["name"]>("");
  const navigate = useNavigate();

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

  const handleNameChange = (event: FormEvent<HTMLInputElement>): void => {
    console.log("name: ", name);
    setName(event.currentTarget.value);
  }

  const handleClick = (event: FormEvent): void => {
    event.preventDefault();
    // setValidationVisible(false);
    if (name) {
      const body = JSON.stringify({
        name: name
      })
      fetch(API_URL + 'zespoly/dodaj', { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === "Success") {
            navigate("/zespoly");
          }
        });
    } else {
      // setValidationVisible(true);
    }
  }

  return (
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Tworzenie zespołu</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form>
          <div className="form-group">
            <label htmlFor="title">Nazwa</label>
            <input required onChange={handleNameChange} value={name} className="form-control" type="text" name="teamName" id="teamName" placeholder="Np. miotlarze" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Id pracownika</label>
            {data.map((element) => (<p key={element.toString()}>{element}</p>))}
            <input className="form-control" type="text" name="id" id="id" placeholder="Id pracownika" />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={event => handleClick(event)}>Zapisz</button>
          </div>
        </form>
        <Link to="/faktury">Powrót</Link>
      </div>
    </div>
  )
}
