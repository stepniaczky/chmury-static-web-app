import { Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../data/routes";
import Home from "./Home";
import Locations from "./Locations";
import Services from "./Services";
import Admin from "./Admin";
import { useSelector, useDispatch } from "react-redux";
import Client from "./Client";
import Burger from "./Burger";

import * as authActions from "../store/actions/auth";
import { useEffect } from "react";

const MainContent = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const userRoles = useSelector((state) => state.auth.userRoles);

  const dispatch = useDispatch();
  const loadUser = () => dispatch(authActions.loadUser());

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Flowbite>
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.services} element={<Services />} />
              <Route path={routes.locations} element={<Locations />} />
              {userRoles.includes("admin") ? (
                <Route path={routes.admin} element={<Admin />} />
              ) : null}
              <Route path={routes.client} element={<Client />} />
              <Route path={routes.burger} element={<Burger />} />
            </Routes>
          </BrowserRouter>
        </Flowbite>
      ) : (
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
      )}
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
