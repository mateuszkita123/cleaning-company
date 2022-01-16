import { ReactElement } from "react"
import { render } from '@testing-library/react';
import { UserProvider } from "../../context/UserContext"
import { IReactChildPropsUserContext } from "../../interfaces"

export const renderWithContext = (component: ReactElement, initialState: IReactChildPropsUserContext["initialState"]) => {
  return {
    ...render(
      <UserProvider initialState={initialState}>
        {component}
      </UserProvider>
    )
  }
}