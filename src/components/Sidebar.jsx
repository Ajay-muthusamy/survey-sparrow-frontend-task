import React from "react";
import CreateButton from "./button/CreateButton";
import CalenderSidebar from "./CalenderSidebar";
import Labels from "./Labels";

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64 bg-gray-50">
      <CreateButton />
      <CalenderSidebar />
      <Labels />
    </aside>
  );
};

export default Sidebar;
