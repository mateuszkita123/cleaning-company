export const options: RequestInit = {
  method: 'GET',
  mode: "cors",
  credentials: "include",
  headers: { 'withCredentials': "true", Accept: 'application/json;charset=UTF-8' }
};

export const getRequestOptionsWithToken = (token: String): RequestInit => ({
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    'withCredentials': "true",
    'Content-Type': 'application/json',
    Authorization: token.toString(),
  }
});

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
