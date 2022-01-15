import { FC, useState, useEffect, FormEvent, useRef } from "react";
import { Alert, Button, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select, { MultiValue, ActionMeta } from "react-select";
import { API_URL, Endpoints, FetchingDataStatus } from "../../../app/constans";
import { optionsPost } from "../../../app/utils";
import { IUser, IOption, IOptionForMultiSelectState, } from "../../../interfaces";
import { SaveButton } from "../../links/SaveButton";
import { fetchUserDataOptions, mapResults } from "./TeamsApi";

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

    async function fetchMyAPI() {
      const response = await fetchUserDataOptions<IUsersIdsState["employees"]>(setStatus);
      setUsersDataOptions(mapResults(response));
    }

    fetchMyAPI()
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    const name = nameRef.current?.value;

    if (name) {
      const ids = selectedUserOptions?.map((element) => element.value);
      const body = JSON.stringify({
        name: name,
        ids: ids
      })

      fetch(API_URL + Endpoints.ADD_TEAMS, { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === "Success") {
            navigate(Endpoints.TEAMS);
          }
        });
    } else {
      setError("Nazwa zespołu jest wymagana!");
      setIsSubmitting(false);
    }
  }

  const handleUserDataSelectChange = (newValue: MultiValue<IOption>, _: ActionMeta<IOption>): void => {
    setSelectedUserOptions([...newValue]);
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 id="table-heading">Tworzenie zespołu</h1>
      <form className="text-start custom-form" onSubmit={handleSubmit}>
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
          className="mb-3 basic-multi-select"
          classNamePrefix="select"
          onChange={handleUserDataSelectChange}
          value={selectedUserOptions}
        />
        <SaveButton isSubmitting={isSubmitting} endpoint={Endpoints.TEAMS} />
      </form>
    </>
  )
}
