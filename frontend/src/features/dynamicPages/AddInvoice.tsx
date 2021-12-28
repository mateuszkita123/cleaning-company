import { FC, useState, useEffect } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { API_URL, FetchingDataStatus } from "../../app/constans";
import { options } from "../../app/utils";
import { Return } from "../links/Return";

interface IInvoicesData {
  _id: String,
  first_name: String,
  last_name: String,
  company_name: String,
  company_vat_number: String,
  company_address: String,
  company_phone: String,
  company_email: String,
}

interface ITeamsState {
  invoicesData: IInvoicesData[];
  status: FetchingDataStatus;
}

interface IOption {
  value: String;
  label: String;
}

interface IOptionForBooleanSelectState {
  selectedOption: IOption | null;
}

const selectOptions: IOption[] = [
  { value: 'true', label: 'Tak' },
  { value: 'false', label: 'Nie' }
];

export const AddInvoice: FC = () => {
  const [data, setData] = useState<ITeamsState["invoicesData"]>([]);
  const [selectedOption, setSelectedOption] = useState<IOptionForBooleanSelectState["selectedOption"]>(null);
  const [invoicesDataOptions, setInvoicesDataOptions] = useState<IOption[]>([]);
  const [selectedInvoicesDataOption, setSelectedInvoicesDataOption] = useState<IOptionForBooleanSelectState["selectedOption"]>(null);
  const [status, setStatus] = useState<ITeamsState["status"]>(FetchingDataStatus.IDLE);

  const handleChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedOption(newValue);
    console.log(`Option selected:`, selectedOption);
  };

  const handleChange2 = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>): void => {
    setSelectedInvoicesDataOption(newValue);
    console.log(`Option selected:`, selectedOption);
  };

  const handleClick = () => {
    console.log(`handleClick`);
  }

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + 'dane_do_faktur', options)
      .then(res => res.json())
      .then((result) => {
        setData(result);
        const invoicesDataIds = result.map((elem: IInvoicesData) => ({ label: elem._id, value: elem._id }));
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
              value={selectedOption}
              onChange={handleChange}
              options={selectOptions}
            />
          </div>
          <div className="form-group">
            <label>Dane do faktury</label>
            <Select
              value={selectedInvoicesDataOption}
              onChange={handleChange2}
              options={invoicesDataOptions}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={handleClick}>Zapisz</button>
          </div>
        </form>
        <Return />
      </div>
    </div>
  );
}
