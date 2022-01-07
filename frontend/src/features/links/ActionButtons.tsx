import ActionButton from "./ActionButton";

export const ActionButtons = () => {
  return (<>
    <div className="di-flex flex-row justify-content-between">
      <ActionButton className={"action-button-details"} icon={"search"} path={"/szczegoly"} content={""} fontClassName={"primary-color"} />
      <ActionButton className={"action-button-edit"} icon={"edit"} path={"/edytuj"} content={""} fontClassName={"primary-color"} />
      <ActionButton className={"action-button-delete"} icon={"trash"} path={"/usun"} content={""} fontClassName={"primary-color"} />
    </div>
  </>)
};
