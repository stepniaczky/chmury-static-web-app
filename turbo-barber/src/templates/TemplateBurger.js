import { Sidebar } from "flowbite-react";
import routes from "../data/routes";

const TemplateBurger = () => {
  return (
    <div className="flex flex-col items-end min-h-screen  ">
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
            <Sidebar.Item href={routes.admin} className="text-3xl my-2.5">
              Admin Panel
            </Sidebar.Item>
            <Sidebar.Item href={routes.client} className="text-3xl my-2.5">
              Mój profil
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default TemplateBurger;
