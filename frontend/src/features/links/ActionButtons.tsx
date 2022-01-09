import { FC } from "react";
import { useLocation } from "react-router-dom";
import { TEntityId } from "../../interfaces";
import ActionButton from "./ActionButton";

interface IActionButtonsProps {
  id: TEntityId;
}

export const ActionButtons: FC<IActionButtonsProps> = ({ id }) => {
  const location = useLocation();
  const { pathname } = location;

  return (<>
    <div className="di-flex flex-row justify-content-between">
      <ActionButton className={"action-button-details"} icon={"search"} path={`${pathname}/szczegoly/${id}`} content={""} fontClassName={"primary-color"} />
      <ActionButton className={"action-button-edit"} icon={"edit"} path={`${pathname}/edytuj/${id}`} content={""} fontClassName={"primary-color"} />
      <ActionButton className={"action-button-delete"} icon={"trash"} path={`/`} content={""} fontClassName={"primary-color"} />
    </div>
  </>)
};
