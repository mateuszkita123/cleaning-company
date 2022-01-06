export const options: RequestInit = {
  method: 'GET',
  mode: 'cors',
  headers: { Accept: 'application/json' }
};

export const optionsPost: RequestInit = {
  method: 'POST',
  mode: 'cors',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
};

export const postOptionsWithCredentials: RequestInit = {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" }
}