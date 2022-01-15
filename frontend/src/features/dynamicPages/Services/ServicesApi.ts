import { FetchingDataStatus, API_URL, Endpoints } from "../../../app/constans";
import { optionsGet } from "../../../app/utils";

type TFetchDataArg = (arg: any) => void;

function fetchOptionsForServices<T>(setStatus: TFetchDataArg): Promise<T> {
  return fetch(API_URL + Endpoints.ADD_SERVICES, optionsGet)
    .then(res => res.json())
    .catch(error => {
      console.log("Błąd: ", error);
      setStatus(FetchingDataStatus.FAILED);
    })
    .finally(() => {
      setStatus(FetchingDataStatus.IDLE);
    });
}

export { fetchOptionsForServices };

