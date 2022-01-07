import { FC, useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import Select, { ActionMeta, SingleValue } from "react-select";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options, optionsPost } from "../../app/utils";
import { IInvoice, IUser, ITeam, IOption, IOptionForSelectState } from "../../interfaces";
import { ValidationToast } from "../links/ValidationToast";

interface IAddService {
  teams: ITeam[];
  users: IUser[];
  invoices: IInvoice[];
}

export interface IAddServiceState {
  data: IAddService | null;
  status: FetchingDataStatus;
}

export const AddService: FC = () => {
  const [address, setAddress] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<IAddServiceState["status"]>(FetchingDataStatus.IDLE);
  const [selectedInvoiceOption, setSelectedInvoiceOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [selectedUserOption, setSelectedUserOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [selectedTeamOption, setSelectedTeamOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [invoicesDataOptions, setInvoicesDataOptions] = useState<IOption[]>([]);
  const [usersDataOptions, setUsersDataOptions] = useState<IOption[]>([]);
  const [teamsDataOptions, setTeamsDataOptions] = useState<IOption[]>([]);
  const [validationVisible, setValidationVisible] = useState<boolean>(false);

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'uslugi/dodaj', options)
      .then(res => res.json())
      .then((result) => {
        const invoices = result?.invoices.map((element: IInvoice) => ({ label: element._id, value: element._id })) || [];
        const users = result?.users.map((element: IUser) => ({ label: element.username, value: element._id })) || [];
        const teams = result?.teams.map((element: ITeam) => ({ label: element.name, value: element._id })) || [];
        setInvoicesDataOptions(invoices);
        setUsersDataOptions(users);
        setTeamsDataOptions(teams);
      })
      .catch(error => {
        console.log("Błąd: ", error);
        setStatus(FetchingDataStatus.FAILED);
      })
      .finally(() => {
        setStatus(FetchingDataStatus.IDLE);
      });
  }, []);

  const handleInvoiceDataSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedInvoiceOption(newValue);
  };

  const handleUserDataSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedUserOption(newValue);
  };

  const handleTeamDataSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedTeamOption(newValue);
  };

  const handleAddressChange = (event: FormEvent<HTMLInputElement>): void => {
    setAddress(event.currentTarget.value);
  }

  const handleAreaChange = (event: FormEvent<HTMLInputElement>): void => {
    setArea(event.currentTarget.value);
  }

  const handleUnitPriceChange = (event: FormEvent<HTMLInputElement>): void => {
    setUnitPrice(event.currentTarget.value);
  }

  const handleDescriptionChange = (event: FormEvent<HTMLTextAreaElement>): void => {
    setDescription(event.currentTarget.value);
  }

  const handleClick = (event: FormEvent): void => {
    event.preventDefault();
    setValidationVisible(false);
    if (address && area && unitPrice && description && selectedInvoiceOption !== null && selectedUserOption !== null && selectedTeamOption !== null) {
      const body = JSON.stringify({
        invoice: selectedInvoiceOption["value"],
        user: selectedUserOption["value"],
        team: selectedTeamOption["value"],
        address: address,
        area: area,
        unitPrice: unitPrice,
        description: description
      })
      fetch(API_URL + 'uslugi/dodaj', { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => console.log(result));
    } else {
      setValidationVisible(true);
    }
  }

  return (
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Rezerwacja usługi</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form>
          <div className="form-group">
            <label htmlFor="address">Adres</label>
            <input required value={address} onChange={handleAddressChange} className="form-control" type="text" name="address" id="address" placeholder="Kod pocztowy, miejscowowść, ulica oraz numer domu/lokalu" />
          </div>
          <div className="form-group">
            <label htmlFor="area">Powierzchnia [m<sup>2</sup>]</label>
            <input required value={area} onChange={handleAreaChange} className="form-control" type="number" name="area" id="area" placeholder="Powierzchnia" />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Cena jednostkowa [PLN/m<sup>2</sup>]</label>
            <input required value={unitPrice} onChange={handleUnitPriceChange} className="form-control" type="number" name="unitPrice" id="unitPrice" placeholder="Cena za metr kwadratowy" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <textarea required value={description} onChange={handleDescriptionChange} className="form-control" name="description" id="description" placeholder="Opis" />
          </div>
          <div className="form-group">
            <label>Zespół</label>
            <Select
              value={selectedInvoiceOption}
              onChange={handleInvoiceDataSelectChange}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <label>Użytkownik</label>
            <Select
              value={selectedUserOption}
              onChange={handleUserDataSelectChange}
              options={usersDataOptions}
            />
          </div>
          <div className="form-group">
            <label>Faktura</label>
            <Select
              value={selectedTeamOption}
              onChange={handleTeamDataSelectChange}
              options={teamsDataOptions}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={event => handleClick(event)}>Zapisz</button>
          </div>
          <div id="validationToastContainer">
            {validationVisible ? <ValidationToast message={"Należy uzupełnić wymagane pola"} /> : null}
          </div>
        </form>
        <Link to="/uslugi">Powrót</Link>
      </div>
    </div>
  );
}
