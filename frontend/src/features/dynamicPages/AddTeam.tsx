import { FC, useState, useEffect, FormEvent, useRef } from "react";
import { Alert, Button, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select, { MultiValue, ActionMeta } from "react-select";
import { API_URL, Endpoints, FetchingDataStatus } from "../../app/constans";
import { options, optionsPost } from "../../app/utils";
import { IUser, IOption, IOptionForMultiSelectState, } from "../../interfaces";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

type TEmployeeOptionType = Pick<IUser, "_id" | "firstName" | "lastName">;

interface IUsersIdsState {
  employees: TEmployeeOptionType[];
  status: FetchingDataStatus;
}

export const AddTeams: FC = () => {
  const [status, setStatus] = useState<IUsersIdsState["status"]>(FetchingDataStatus.IDLE);
  const [usersDataOptions, setUsersDataOptions] = useState<IOption[]>([]);
  const [selectedUserOptions, setSelectedUserOptions] = useState<IOptionForMultiSelectState["selectedOptions"]>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.ADD_TEAMS, options)
      .then(res => res.json())
      .then((result: IUsersIdsState["employees"]) => {
        const options = result.map((element) => ({ value: element._id, label: `${element.firstName} ${element.lastName}` }));
        setUsersDataOptions(options);
      })
      .catch(error => {
        console.log("Błąd: ", error);
        setStatus(FetchingDataStatus.FAILED);
      })
      .finally(() => {
        setStatus(FetchingDataStatus.IDLE);
      });
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    // setValidationVisible(false);
    const name = nameRef.current?.value;

    if (name) {
      const ids = selectedUserOptions?.map((element) => element.value);

      const body = JSON.stringify({
        name: name,
        ids: ids
      })

      console.warn("body: ", body);

      fetch(API_URL + Endpoints.ADD_TEAMS, { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === "Success") {
            navigate(Endpoints.TEAMS);
          }
        });
    } else {
      // setValidationVisible(true);
    }
  }

  const handleUserDataSelectChange = (newValue: MultiValue<IOption>, _: ActionMeta<IOption>): void => {
    setSelectedUserOptions([...newValue]);
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 style={{ textAlign: "center", marginTop: "0.8em" }}>Tworzenie zespołu</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "90%", margin: "0.8em auto" }}>
        <FormGroup
          className="text-start mb-3"
          controlId="formBasicEmail">
          <Form.Label className="fw-bold">Nazwa zespołu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Np. Miotełki"
            ref={nameRef} />
        </FormGroup>
        <Form.Label className="fw-bold">Pracownicy</Form.Label>
        <Select
          isMulti
          name="employees"
          options={usersDataOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleUserDataSelectChange}
          value={selectedUserOptions}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? "Zapisywanie..." : "Zapisz"}
        </Button>
        {' '}
        <ReturnToHomePage />
      </Form>
      <Link to={Endpoints.TEAMS}>Powrót</Link>
    </>
  )
}
