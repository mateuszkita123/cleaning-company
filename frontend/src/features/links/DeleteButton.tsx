import { FC } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../app/constans";
import { TEntityId } from "../../interfaces";
import ActionButton from "./ActionButton";

interface IDeleteButtonsProps {
  id: TEntityId;
  endpoint: string;
}

export const DeleteButton: FC<IDeleteButtonsProps> = ({ id, endpoint }) => {
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
        if (result.status === "Success") {
          console.log("SUKCES!");
        }
      });
  }

  return (
    <ActionButton customHandler={handleClick} className={"action-button-delete"} icon={"trash"} path={pathname} content={""} fontClassName={"primary-color"} />
  )
};
