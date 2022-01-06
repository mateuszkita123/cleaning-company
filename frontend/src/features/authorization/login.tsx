import { useRef, FormEvent, useContext, useState } from "react";
import { FormGroup, Button, Form, Alert } from "react-bootstrap";
import { API_URL } from "../../app/constans";
import { postOptionsWithCredentials } from "../../app/utils";
import { UserContext } from "../../context/UserContext";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { userContext, setUserContext } = useContext(UserContext);

  console.log(userContext, setUserContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Coś poszło nie tak.";

    const body = JSON.stringify({ username: email, password });

    fetch(API_URL + "users/logowanie", { ...postOptionsWithCredentials, body: body })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Wypełnij poprawnie wszystkie pola!")
          } else if (response.status === 401) {
            setError("Nieprawidłowy email lub hasło!")
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json();
          console.warn("data: ", data);
          console.warn("userContext: ", userContext);
          setUserContext({ ...userContext, token: data.token });
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })

    if (email && password) {
      console.log("email: ", email);
      console.log("password: ", password);
    } else {
      console.error("enter email and password!");
    }
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 style={{ textAlign: "center", marginTop: "0.8em" }}>Logowanie</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "90%", margin: "0.8em auto" }}>
        <FormGroup
          className="text-start mb-3"
          controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Wpisz swój adres email"
            ref={emailRef} />
        </FormGroup>
        <Form.Group
          className="text-start mb-3"
          controlId="formBasicPassword">
          <Form.Label className="fw-bold">Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wpisz swoje hasło"
            ref={passwordRef} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? "Logowanie..." : "Zaloguj"}
        </Button>
        {' '}
        <ReturnToHomePage />
      </Form>
    </>
  );
}

