import { useState, FC } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface IValidationProps {
  message: string;
}

export const ValidationToast: FC<IValidationProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-relative"
    >
      <ToastContainer className="p-3" position={"bottom-end"}>
        <Toast show={show} onClose={() => setShow(false)} bg={"warning"} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Uwaga</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}