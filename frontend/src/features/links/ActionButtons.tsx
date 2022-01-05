import ActionButton from "./ActionButton";

export const ActionButtons = () => {
  return (<>
    <div className="di-flex flex-row justify-content-between">
      <ActionButton icon={"search"} path={"/szczegoly"} content={""} fontClassName={"primary-color"} />
      <ActionButton icon={"edit"} path={"/edytuj"} content={""} fontClassName={"primary-color"} />
      <ActionButton icon={"trash"} path={"/usun"} content={""} fontClassName={"primary-color"} />
    </div>
  </>)
};
