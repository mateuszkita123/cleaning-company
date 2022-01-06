import { useRef, FormEvent, useContext, useState } from "react";
import { Form, FormGroup, Button, Alert } from "react-bootstrap";
import { API_URL } from "../../app/constans";
import { postOptionsWithCredentials } from "../../app/utils";
import { UserContext } from "../../context/UserContext";
import { ReturnToHomePage } from "../links/ReturnToHomePage";

export function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { userContext, setUserContext } = useContext(UserContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Coś poszło nie tak."

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const body = JSON.stringify({ firstName, lastName, username: email, password });

    fetch(API_URL + "users/rejestracja", { ...postOptionsWithCredentials, body: body })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Wypełnij poprawnie wszystkie pola!");
          } else if (response.status === 401) {
            setError("Nieprawidłowy email lub hasło!");
          } else if (response.status === 500) {
            console.log(response);
            const data = await response.json();
            if (data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext({ ...userContext, token: data.token });
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      })
  }

  // if (email && password && firstName && lastName) {
  //   console.log("email: ", email);
  //   console.log("password: ", password);
  //   console.log("firstName: ", firstName);
  //   console.log("lastName: ", lastName);
  // } else {
  //   console.error("please enter data!");
  // }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 style={{ textAlign: "center", marginTop: "0.8em" }}>Rejestracja</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "90%", margin: "0.8em auto" }}>
        <FormGroup
          className="text-start mb-3"
          controlId="formBasicFirstName">
          <Form.Label className="fw-bold">Imię</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz swoje imię"
            ref={firstNameRef} />
        </FormGroup>
        <FormGroup
          className="text-start mb-3"
          controlId="formBasicLastName">
          <Form.Label className="fw-bold">Nazwisko</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz swoje nazwisko"
            ref={lastNameRef} />
        </FormGroup>
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
          {isSubmitting ? "Rejestruję..." : "Zarejestruj"}
        </Button>
        {' '}
        <ReturnToHomePage />
      </Form>
    </>
  );
}
