export const API_URL = 'http://localhost:8081/';

export enum FetchingDataStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed'
}

export const GENERIC_ERROR_MESSAGE = "Coś poszło nie tak.";
export const INVALID_DATA_MESSAGE = "Pola nie zostały poprawnie wypełnione!";
export const INVALID_CREDENTIALS_MESSAGE = "Nieprawidłowy email lub hasło!";