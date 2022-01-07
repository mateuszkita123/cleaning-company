import { useCallback, useContext, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { API_URL } from "../../app/constans"
import { getRequestOptionsWithToken } from "../../app/utils"
import { UserContext } from "../../context/UserContext"
import { Loader } from "../links/Loader"

export const Account = () => {
  const { userContext, setUserContext } = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    console.log("userContext.token: ", userContext.token);
    if (!!userContext.token) {
      fetch(API_URL + "users/me", getRequestOptionsWithToken(userContext.token))
        .then(async response => {
          if (response.ok) {
            const data = await response.json()
            setUserContext({ ...userContext, details: data })
          } else {
            if (response.status === 401) {
              // Edge case: when the token has expired.
              // This could happen if the refreshToken calls have failed due to network error or
              // User has had the tab open from previous day and tries to click on the Fetch button
              // TODO enable reload
              // window.location.reload()
            } else {
              setUserContext({ ...userContext, details: null })
            }
          }
        })
    }
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

  return userContext.details === null ? (
    <div>Error Loading User details</div>
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            <p>
              Welcome&nbsp;
              <strong>
                {userContext.details.firstName}
                {userContext.details.lastName &&
                  " " + userContext.details.lastName}
              </strong>!
            </p>
            <p>
              Your reward points: <strong>{userContext.details.points}</strong>
            </p>
          </Card.Text>
          <Button variant="primary" onClick={refetchHandler}>Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}