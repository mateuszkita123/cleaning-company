import { FetchingDataStatus } from "../app/constans";

export interface ICLient {
  _id: String,
  username: String,
  email: String,
  role_id: String
}

export interface IClientsState {
  clients: ICLient[];
  status: FetchingDataStatus;
}

export interface IUser {
  _id: String,
  username: String,
  email: String,
  role_id: String
}

export interface IUsersState {
  users: IUser[];
  status: FetchingDataStatus;
}

export interface ITeams {
  _id: String,
  name: String,
  employee_id: String[]
}

export interface ITeamsState {
  teams: ITeams[];
  status: FetchingDataStatus;
}

export interface IInvoices {
  _id: String,
  is_b2b: boolean,
  invoice_data_id: Number
}

export interface IInvoicesState {
  invoices: IInvoices[];
  status: FetchingDataStatus;
}

export interface IInvoicesData {
  _id: String,
  first_name: String,
  last_name: String,
  company_name: String,
  company_vat_number: String,
  company_address: String,
  company_phone: String,
  company_email: String,
}

export interface IInvoicesDataState {
  invoicesData: IInvoicesData[];
  status: FetchingDataStatus;
}

export interface IOption {
  value: String;
  label: String;
}