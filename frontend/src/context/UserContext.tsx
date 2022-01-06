import { createContext, useState, FC } from "react"
import { IReactChildProps, IUserContext } from "../interfaces";

const UserContext = createContext<IUserContext>({
  userContext: {},
  setUserContext: () => { }
})

const initialState = {}

const UserProvider: FC<IReactChildProps> = (props) => {
  const [userContext, setUserContext] = useState(initialState);
  const value = { userContext, setUserContext }

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }