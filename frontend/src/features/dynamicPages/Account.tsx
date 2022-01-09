import { useCallback, useContext, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { API_URL, Endpoints } from "../../app/constans"
import { UserContext } from "../../context/UserContext"
import { Loader } from "../links/Loader"

export const Account = () => {
  const { userContext, setUserContext } = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    console.log("userContext.token: ", userContext.token);
    // if (!!userContext.token) {
    fetch(API_URL + "/users/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }
    })
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          setUserContext({ ...userContext, details: data });
          console.log("data: ", data);
        } else {
          if (response.status === 401) {
            // Edge case: when the token has expired.
            // This could happen if the refreshToken calls have failed due to network error or
            // User has had the tab open from previous day and tries to click on the Fetch button
            // TODO enable reload
            // window.location.reload();
          } else {
            setUserContext({ ...userContext, details: null });
          }
        }
      })
    // }
  }, [setUserContext, userContext.token])

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails()
    }
  }, [userContext.details, fetchUserDetails])

  const refetchHandler = () => {
    // set details to undefined so that spinner will be displayed and
    //  fetchUserDetails will be invoked from useEffect
    setUserContext({ ...userContext, details: undefined })
  }

  const logoutHandler = () => {
    fetch(API_URL + "/users/wyloguj", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      console.warn("setUserContext token=null because of ok response from /users/wyloguj");
      setUserContext({ ...userContext, details: undefined, token: null })
      window.localStorage.setItem("logout", Date.now().toString())
    })
  }

  return userContext.details === null ? (
    <div>Error Loading User details</div>
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Konto użytkownika</Card.Title>
          <Card.Text>
            Witaj&nbsp;
            <strong>
              {userContext.details.firstName}
              {userContext.details.lastName &&
                " " + userContext.details.lastName}
            </strong>!
            <br />
            Rola: <strong>{userContext.details.role_id}</strong>
          </Card.Text>
          <Button variant="primary" onClick={logoutHandler}>Wyloguj</Button>
        </Card.Body>
      </Card>
      <Link to={Endpoints.INVOICES_DATA}>Dane do faktury</Link>
      <Link to={Endpoints.INVOICES}>Wystawione faktury</Link>
      <Link to={Endpoints.SERVICES}>Zarezerwowane usługi</Link>
    </>
  )
}