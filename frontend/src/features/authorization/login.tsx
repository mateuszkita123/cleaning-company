import { useRef, FormEvent, useContext, useState } from "react";
import { FormGroup, Button, Form, Alert } from "react-bootstrap";
import { Link, Navigate, useLocation } from "react-router-dom";
import { API_URL, GENERIC_ERROR_MESSAGE, INVALID_CREDENTIALS_MESSAGE, INVALID_DATA_MESSAGE } from "../../app/constans";
import { UserContext } from "../../context/UserContext";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { userContext, setUserContext } = useContext(UserContext);

  const location = useLocation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const body = JSON.stringify({ username: email, password });

    fetch(API_URL + "users/logowanie", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError(INVALID_DATA_MESSAGE);
          } else if (response.status === 401) {
            setError(INVALID_CREDENTIALS_MESSAGE);
          } else {
            setError(GENERIC_ERROR_MESSAGE);
          }
        } else {
          const data = await response.json();
          console.warn("data: ", data);
          console.warn("setUserContext token=data.token because of ok response from /users/logowanie");
          setUserContext({ ...userContext, token: data.token });
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        setError(GENERIC_ERROR_MESSAGE);
      })

    // if (email && password) {
    //   console.log("email: ", email);
    //   console.log("password: ", password);
    // } else {
    //   console.error("enter email and password!");
    // }
  }

  return (!userContext.token ? (
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
      <p>Nie masz jeszcze konta?</p>
      <Link to="/rejestracja">Zarejestruj się</Link>
    </>
  ) : (
    <Navigate to="/me" replace state={{ from: location }} />
  )
  );
}
