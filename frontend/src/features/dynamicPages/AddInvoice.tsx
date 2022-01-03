import { FC, useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import Select, { ActionMeta, SingleValue } from "react-select";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options, optionsPost } from "../../app/utils";
import { IInvoicesData, IOption, IOptionForSelectState, ITeamsState } from "../../interfaces";

const selectOptions: IOption[] = [
  { value: 'true', label: 'Tak' },
  { value: 'false', label: 'Nie' }
];

export const AddInvoice: FC = () => {
  const [selectedB2BOption, setSelectedB2BOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [selectedInvoicesDataOption, setSelectedInvoicesDataOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [invoicesDataOptions, setInvoicesDataOptions] = useState<IOption[]>([]);
  const [status, setStatus] = useState<ITeamsState["status"]>(FetchingDataStatus.IDLE);

  const handleB2BSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedB2BOption(newValue);
  };

  const handleInvoiceDataSelectChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedInvoicesDataOption(newValue);
  };

  const handleClick = (event: FormEvent): void => {
    event.preventDefault();
    if (selectedB2BOption !== null && selectedInvoicesDataOption !== null) {
      const body = JSON.stringify({ is_b2b: selectedB2BOption["value"] === 'true', invoice_data_id: selectedInvoicesDataOption["value"] })
      fetch(API_URL + 'faktury/dodaj', { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => console.log(result));
    }
  }

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'dane_do_faktur', options)
      .then(res => res.json())
      .then((result) => {
        const invoicesDataIds = result.map((element: IInvoicesData) => ({ label: element._id, value: element._id }));
        setInvoicesDataOptions(invoicesDataIds);
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
      <h1 style={{ textAlign: "center" }}>Tworzenie faktury</h1>
      <div style={{ width: "50%", margin: "25px auto" }}>
        <form>
          <div className="form-group">
            <label>Faktura dla firmy</label>
            <Select
              value={selectedB2BOption}
              onChange={handleB2BSelectChange}
              options={selectOptions}
            />
          </div>
          <div className="form-group">
            <label>Dane do faktury</label>
            <Select
              value={selectedInvoicesDataOption}
              onChange={handleInvoiceDataSelectChange}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={event => handleClick(event)}>Zapisz</button>
          </div>
        </form>
        <Link to="/faktury">Powrót</Link>
      </div>
    </div>
  );
}
