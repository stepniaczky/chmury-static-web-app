import { Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../data/routes";
import Home from "./Home";
import Locations from "./Locations";
import Services from "./Services";
import Admin from "./Admin";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate /*useMsal*/,
} from "@azure/msal-react";
import Client from "./Client";
import Burger from "./Burger";

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Flowbite>
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.services} element={<Services />} />
              <Route path={routes.locations} element={<Locations />} />
              <Route path={routes.admin} element={<Admin />} />
              <Route path={routes.client} element={<Client />} />
              <Route path={routes.burger} element={<Burger />} />
            </Routes>
          </BrowserRouter>
        </Flowbite>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Flowbite>
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.services} element={<Services />} />
              <Route path={routes.locations} element={<Locations />} />
              <Route path={routes.burger} element={<Burger />} />
            </Routes>
          </BrowserRouter>
        </Flowbite>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
