import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MainDrawer from "./MainDrawer";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <MainHeader sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <MainDrawer sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Outlet />
    </>
  );
}
