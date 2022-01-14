import { FC, useState, useEffect, FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select, { ActionMeta, SingleValue } from "react-select";
import { API_URL, FetchingDataStatus, Endpoints } from "../../../app/constans";
import { options, optionsPost } from "../../../app/utils";
import { IInvoicesData, IOption, IOptionForSelectState, ITeamsState } from "../../../interfaces";
import { SaveButton } from "../../links/SaveButton";

const selectOptions: IOption[] = [
  { value: 'true', label: 'Tak' },
  { value: 'false', label: 'Nie' }
];

export const AddInvoice: FC = () => {
  const [selectedB2BOption, setSelectedB2BOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [selectedInvoicesDataOption, setSelectedInvoicesDataOption] = useState<IOptionForSelectState["selectedOption"]>(null);
  const [invoicesDataOptions, setInvoicesDataOptions] = useState<IOption[]>([]);
  const [status, setStatus] = useState<ITeamsState["status"]>(FetchingDataStatus.IDLE);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(FetchingDataStatus.LOADING);
    fetch(API_URL + Endpoints.INVOICES_DATA, options)
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

  const handleB2BSelectChange = (newValue: SingleValue<IOption>, _: ActionMeta<IOption>): void => {
    setSelectedB2BOption(newValue);
  };

  const handleInvoiceDataSelectChange = (newValue: SingleValue<IOption>, _: ActionMeta<IOption>): void => {
    setSelectedInvoicesDataOption(newValue);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (selectedB2BOption !== null && selectedInvoicesDataOption !== null) {
      const body = JSON.stringify({ is_b2b: selectedB2BOption["value"] === 'true', invoice_data_id: selectedInvoicesDataOption["value"] })
      fetch(API_URL + Endpoints.ADD_INVOICES, { ...optionsPost, body: body })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          navigate(Endpoints.INVOICES);
        });
    } else {
      setError("Należy wybrać odpowiedzi z list rozwijanych!");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 id="table-heading">Tworzenie faktury</h1>
      <form className="text-start custom-form" onSubmit={handleSubmit}>
        <Form.Label className="fw-bold">Faktura dla firmy</Form.Label>
        <Select
          value={selectedB2BOption}
          onChange={handleB2BSelectChange}
          options={selectOptions}
        />
        <Form.Label className="fw-bold">Dane do faktury</Form.Label>
        <Select
          value={selectedInvoicesDataOption}
          onChange={handleInvoiceDataSelectChange}
          options={invoicesDataOptions}
        />
        <SaveButton isSubmitting={isSubmitting} endpoint={Endpoints.INVOICES} />
      </form>
    </>
  );
}
