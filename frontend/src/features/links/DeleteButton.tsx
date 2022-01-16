import { FC, useContext } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../../app/constans";
import { RefreshContext } from "../../context/RefreshContext";
import { TEntityId } from "../../interfaces";
import ActionButton from "./ActionButton";

interface IDeleteButtonsProps {
  id: TEntityId;
  endpoint: string;
}

export const DeleteButton: FC<IDeleteButtonsProps> = ({ id, endpoint }) => {
  const { setRefreshContext } = useContext(RefreshContext);
  const location = useLocation();
  const { pathname } = location;

  const handleClick = () => {
    fetch(API_URL + endpoint, {
      method: 'DELETE',
      mode: "cors",
      credentials: "include",
      headers: { 'withCredentials': "true", Accept: 'application/json;charset=UTF-8', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setRefreshContext({ refreshId: uuidv4() });
        if (result.status === "Success") {
          console.log("SUKCES!");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <ActionButton customHandler={handleClick} className={"action-button-delete"} icon={"trash"} path={pathname} content={""} fontClassName={"primary-color"} />
  )
};
