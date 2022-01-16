import { IUserContextData } from "../../interfaces";

export const getOptions = (token: IUserContextData["token"]): RequestInit =>
({
  method: "GET",
  credentials: "include",
  // Pass authentication token as bearer token in header
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
})

export const optionsPost: RequestInit = {
  method: 'POST',
  mode: "cors",
  credentials: "include",
  headers: { 'withCredentials': "true", Accept: 'application/json;charset=UTF-8', 'Content-Type': 'application/json' },
};

export const optionsPut: RequestInit = {
  method: 'PUT',
  mode: "cors",
  credentials: "include",
  headers: { 'withCredentials': "true", Accept: 'application/json;charset=UTF-8', 'Content-Type': 'application/json' },
};

export const postOptionsWithCredentials: RequestInit = {
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: { 'withCredentials': "true", "Content-Type": "application/json", 'Access-Control-Allow-Credentials': "true" }
}
