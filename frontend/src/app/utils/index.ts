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