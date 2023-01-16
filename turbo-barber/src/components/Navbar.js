import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link } from "react-router-dom";
import routes from "../data/routes";
import { SignInButton } from "../components/Buttons/SignInButton";
import { SignOutButton } from "../components/Buttons/SignOutButton";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const userRoles = useSelector((state) => state.auth.userRoles);

  const isAdmin = () => {
    if (isAuthenticated !== undefined && userRoles.includes("admin")) {
      return (
        <Button>
          <Link to={routes.admin} target="_blank">
            <FlowbiteNavbar.Link className="text-white md:hover:text-gray-800">
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
            <FlowbiteNavbar.Link className="text-white md:hover:text-gray-800">
              Mój Profil
            </FlowbiteNavbar.Link>
          </Link>
        </Button>
      );
    }
  };
  return (
    <div className=" bg-gray-800 z-0 shadow-md">
      <FlowbiteNavbar class="bg-gray-800 m-auto my-3">
        <FlowbiteNavbar.Brand>
          <Link to={routes.home} className="list-none">
            <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-gray-800">
              Turbo Barber
            </FlowbiteNavbar.Link>
          </Link>
        </FlowbiteNavbar.Brand>
        <FlowbiteNavbar.Collapse className="bg-gray-800">
          <Button>
            <Link to={routes.home}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-gray-800">
                Strona główna
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          <Button>
            <Link to={routes.services}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-gray-800">
                Usługi
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          <Button>
            <Link to={routes.locations}>
              <FlowbiteNavbar.Link className="text-white max-sm:hidden md:hover:text-gray-800">
                Lokalizacje
              </FlowbiteNavbar.Link>
            </Link>
          </Button>
          {isAdmin()}
          {isClient()}
          <Button color="warning" className="hover:bg-gray-800">
            {isAuthenticated ? (
              <SignOutButton className="hover:bg-gray-800" />
            ) : (
              <SignInButton className="hover:bg-gray-800" />
            )}
          </Button>
        </FlowbiteNavbar.Collapse>
        <Button className="float-right">
          <Link to={routes.burger} className="md:hidden list-none">
            <FlowbiteNavbar.Link className="text-white md:hover:text-gray-800 border-none text-xl">
              ≡
            </FlowbiteNavbar.Link>
          </Link>
        </Button>
      </FlowbiteNavbar>
    </div>
  );
};

export default Navbar;
