import { useContext } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../app/constans";
import { UserContext } from "../../context/UserContext";

export function SignedIn() {
  const { userContext, setUserContext } = useContext(UserContext);

  const detailsHandler = () => {
    fetch(API_URL + "users/me", {
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
            // TODO enable reload or remove it
            // window.location.reload();
          } else {
            setUserContext({ ...userContext, details: null });
          }
        }
      })
  }

  const logoutHandler = () => {
    fetch(API_URL + "users/wyloguj", {
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

  return (
    <>
      <li style={{ marginRight: "0.5em" }}>
        <Link className="nav-link" to={"/me"}>Zalogowano jako {userContext.details?.username}</Link>
      </li>
      <li>
        <Link className="nav-link" to="" onClick={logoutHandler}>Wyloguj</Link>
      </li>
    </>
  );
}
