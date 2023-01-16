import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../data/routes";
import { SignInButton } from "../components/Buttons/SignInButton";
import { SignOutButton } from "../components/Buttons/SignOutButton";
import Button from "@mui/material/Button";
import User from '../auth.js';
import { useSelector } from "react-redux";


const Navbar = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const userRoles = useSelector((state) => state.auth.userRoles);

  // tu po isAuthenticated nalezy dodac funkcje okreslajaca role
  const isAdmin = () => {
    if (isAuthenticated !== undefined && userRoles.includes('admin')) {
      return (
        <Button>
          <Link to={routes.admin}>
            <FlowbiteNavbar.Link className="text-white md:hover:text-stone-600">
              Admin Panel
            </FlowbiteNavbar.Link>
          </Link>
        </Button>
      );
    }
  };
  const isClient = () => {
    if (isAuthenticated !== undefined) {
      return (
        <Button>
          <Link to={routes.client}>
            <FlowbiteNavbar.Link className="text-white md:hover:text-stone-600">
              Mój Profil
            </FlowbiteNavbar.Link>
          </Link>
        </Button>
      );
    }
  };
  return (
    <div className=" bg-stone-800 z-0 shadow-md">
      <FlowbiteNavbar class="bg-stone-800 m-auto my-3">
        <FlowbiteNavbar.Brand>
          <span className="bg-stone-800 self-center whitespace-nowrap text-xl font-bold text-white">
            Turbo Barber
          </span>
        </FlowbiteNavbar.Brand>
        <FlowbiteNavbar.Collapse className="bg-stone-800">
          <Button>
            <Link to={routes.home}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-stone-600">
                Strona główna
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          <Button>
            <Link to={routes.services}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-stone-600">
                Usługi
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          <Button>
            <Link to={routes.locations}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-stone-600">
                Lokalizacje
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          {isAdmin()}
          {isClient()}
          <Button color="warning">
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </Button>
        </FlowbiteNavbar.Collapse>
        <Button className="float-right">
          <Link to={routes.burger} className="md:hidden list-none">
            <FlowbiteNavbar.Link className="text-white md:hover:text-stone-600 border-none text-xl">
              ≡
            </FlowbiteNavbar.Link>
          </Link>
        </Button>
      </FlowbiteNavbar>
    </div>
  );
};

export default Navbar;
