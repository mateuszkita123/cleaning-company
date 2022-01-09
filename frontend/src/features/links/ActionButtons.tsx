import { FC } from "react";
import { useLocation } from "react-router-dom";
import { TEntityId } from "../../interfaces";
import ActionButton from "./ActionButton";
import { DeleteButton } from "./DeleteButton";

interface IActionButtonsProps {
  id: TEntityId;
  endpoint: string;
}

export const ActionButtons: FC<IActionButtonsProps> = ({ id, endpoint }) => {
  const location = useLocation();
  const { pathname } = location;

  return (<>
    <div className="di-flex flex-row justify-content-between">
      <ActionButton className={"action-button-details"} icon={"search"} path={`${pathname}/szczegoly/${id}`} content={""} fontClassName={"primary-color"} />
      <ActionButton className={"action-button-edit"} icon={"edit"} path={`${pathname}/edytuj/${id}`} content={""} fontClassName={"primary-color"} />
      <DeleteButton id={id} endpoint={endpoint} />
    </div>
  </>)
};
