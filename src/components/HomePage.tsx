import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MainDrawer from "./MainDrawer";

export default function HomePage() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <MainHeader sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <MainDrawer sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <p>HomePage</p>
    </>
  );
}
