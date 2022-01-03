import { FC, useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import Select, { ActionMeta, SingleValue } from "react-select";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { IInvoice, IUser, ITeam, IOption, IOptionForSelectState } from "../../interfaces";

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
  const [data, setData] = useState<IAddServiceState["data"]>(null);
  const [status, setStatus] = useState<IAddServiceState["status"]>(FetchingDataStatus.IDLE);
  const [selectedInvoiceOption, setSelectedInvoiceOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [invoicesDataOptions, setInvoicesDataOptions] = useState<IOption[]>([]);

  const handleInvoiceDataSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedInvoiceOption(newValue);
  };

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'uslugi/dodaj', options)
      .then(res => res.json())
      .then((result) => {
        console.log("result: ", result);
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

  const handleClick = (event: FormEvent): void => {
    event.preventDefault();
    // if (selectedB2BOption !== null && selectedInvoicesDataOption !== null) {
    //   const body = JSON.stringify({ is_b2b: selectedB2BOption["value"] === 'true', invoice_data_id: selectedInvoicesDataOption["value"] })
    //   fetch(API_URL + 'faktury/dodaj', { ...optionsPost, body: body })
    //     .then(res => res.json())
    //     .then((result) => console.log(result));
    // }
  }

  return (
    <div className="row">
      <h1 style={{ textAlign: "center" }}>Rezerwacja usługi</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form>
          <div className="form-group">
            <label htmlFor="address">Adres</label>
            <input required className="form-control" type="text" name="address" id="address" placeholder="Kod pocztowy, miejscowowść, ulica oraz numer domu/lokalu" />
          </div>
          <div className="form-group">
            <label htmlFor="area">Powierzchnia</label>
            <input className="form-control" type="number" name="area" id="area" placeholder="m2" required />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Cena jednostkowa</label>
            <input className="form-control" type="number" name="unitPrice" id="unitPrice" placeholder="PLN/m2" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <textarea className="form-control" name="description" id="description" placeholder="Opis" required />
          </div>
          <div className="form-group">
            <label>Id zespołów</label>
            <Select
              value={selectedInvoiceOption}
              onChange={handleInvoiceDataSelectChange}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <label>Id użytkownika</label>
            <Select
              value={selectedInvoiceOption}
              onChange={handleInvoiceDataSelectChange}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <label>Id faktury</label>
            <Select
              value={selectedInvoiceOption}
              onChange={handleInvoiceDataSelectChange}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={event => handleClick(event)}>Zapisz</button>
          </div>
        </form>
        <Link to="/uslugi">Powrót</Link>
      </div>
    </div>
  );
}
