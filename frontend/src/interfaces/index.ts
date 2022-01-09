import { FetchingDataStatus, UserRoles } from "../app/constans";

export type TEntityId = IClient["_id"] | IUser["_id"] | ITeam["_id"] | IInvoice["_id"] | IInvoicesData["_id"] | IService["_id"]

export interface IClient {
  _id: String;
  firstName: String;
  lastName: String;
  username: String;
  role_id: UserRoles.CLIENT;
}

export interface IClientsState {
  clients: IClient[];
  status: FetchingDataStatus;
}

export interface IUser {
  _id: String;
  username: String;
  email: String;
  role_id: UserRoles;
  firstName: String;
  lastName: String;
}

export interface IUsersState {
  users: IUser[];
  status: FetchingDataStatus;
}

export interface ITeam {
  _id: string;
  name: string;
  employee_id: string[];
}

export interface ITeamsState {
  teams: ITeam[];
  status: FetchingDataStatus;
}

export interface IInvoice {
  _id: String;
  is_b2b: boolean;
  invoice_data_id: Number;
}

export interface IInvoicesState {
  invoices: IInvoice[];
  status: FetchingDataStatus;
}

export interface IInvoicesData {
  _id: String;
  first_name: String;
  last_name: String;
  company_name: String;
  company_vat_number: String;
  company_address: String;
  company_phone: String;
  company_email: String;
}

export interface IInvoicesDataState {
  invoicesData: IInvoicesData[];
  status: FetchingDataStatus;
}

interface IService {
  _id: String;
  service_address: String;
  service_area: Number;
  service_unit_price: Number;
  description: String;
  status: String;
  teams_id: Pick<ITeam, "_id">[];
  user_id: Pick<IUser, "_id">;
  invoice_id: Pick<IInvoice, "_id">;
}

export interface IServicesState {
  services: IService[];
  status: FetchingDataStatus;
}

export interface IOption {
  value: String;
  label: String;
}

export interface IOptionForSelectState {
  selectedOption: IOption | null;
}

export interface IUserContextData {
  token?: string | null;
  details?: IUser | null;
}

export type TUserContext = {
  userContext: IUserContextData;
  setUserContext: (oldValues: IUserContextData) => void;
};

export interface IReactChildProps {
  children: JSX.Element;
};