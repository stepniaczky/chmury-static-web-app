import { Sidebar } from "flowbite-react";
import routes from "../data/routes";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { SignInButton } from "../components/Buttons/SignInButton";
import { SignOutButton } from "../components/Buttons/SignOutButton";

const TemplateBurger = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const userRoles = useSelector((state) => state.auth.userRoles);

  const isAdmin = () => {
    if (isAuthenticated !== undefined && userRoles.includes("admin")) {
      return (
        <Sidebar.Item href={routes.admin} className="text-3xl my-2.5">
          Admin Panel
        </Sidebar.Item>
      );
    }
  };
  const isClient = () => {
    if (isAuthenticated !== undefined) {
      return (
        <Sidebar.Item href={routes.client} className="text-3xl my-2.5">
          Mój profil
        </Sidebar.Item>
      );
    }
  };

  return (
    <div className="flex flex-col items-end min-h-screen bg-gray-800">
      <Sidebar className="relative m-auto top-2/4 text-lg ">
        <Sidebar.Items className="">
          <Sidebar.ItemGroup className="">
            <Sidebar.Item href={routes.home} className="text-3xl my-2.5">
              Strona Główna
            </Sidebar.Item>
            <Sidebar.Item href={routes.services} className="text-3xl my-2.5">
              Usługi
            </Sidebar.Item>
            <Sidebar.Item href={routes.locations} className="text-3xl my-2.5">
              Lokalizacje
            </Sidebar.Item>
            {isAdmin()}
            {isClient()}
            <Sidebar.Item>
              <Button color="warning">
                {isAuthenticated ? (
                  <SignOutButton className="hover:bg-gray-800" />
                ) : (
                  <SignInButton className="hover:bg-gray-800" />
                )}
              </Button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default TemplateBurger;
