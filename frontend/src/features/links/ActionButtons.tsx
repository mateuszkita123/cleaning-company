import { Dispatch, FC, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { TEntityId } from "../../interfaces";
import ActionButton from "./ActionButton";
import { DeleteButton } from "./DeleteButton";

interface IActionButtonsProps {
  id: TEntityId;
  endpoint: string;
  setRefreshId: Dispatch<SetStateAction<string>>;
}

export const ActionButtons: FC<IActionButtonsProps> = ({ id, endpoint, setRefreshId }) => {
  const location = useLocation();
  const { pathname } = location;

  return (<>
    <div className="d-flex justify-content-center">
      {/* <ActionButton className={"action-button-details"} icon={"search"} path={`${pathname}/szczegoly/${id}`} content={""} fontClassName={"primary-color"} /> */}
      <ActionButton className={"action-button-edit me-1"} icon={"edit"} path={`${pathname}/edytuj/${id}`} content={""} fontClassName={"primary-color"} />
      <DeleteButton setRefreshId={setRefreshId} id={id} endpoint={endpoint} />
    </div>
  </>)
};
