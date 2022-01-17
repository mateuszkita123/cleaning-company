import { ReactElement } from "react";
import { render } from '@testing-library/react';
import { UserProvider } from "../../context/UserContext";
import { IReactChildPropsUserContext } from "../../interfaces";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Account } from "../../features/dynamicPages/Account/Account";
import { HomePage } from "../../features/staticPages/homePage";

export const renderWithContext = (component: ReactElement, initialState: IReactChildPropsUserContext["initialState"]) => {
  return {
    ...render(
      <UserProvider initialState={initialState}>
        {component}
      </UserProvider>
    )
  }
}

export const renderedComponent = (initialState: IReactChildPropsUserContext["initialState"], path: string) => {
  return (<UserProvider initialState={initialState}>
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={"me"} element={<Account />} />
      </Routes>
    </MemoryRouter>
  </UserProvider>)
}