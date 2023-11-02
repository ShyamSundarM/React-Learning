import { AppBar, Toolbar } from "@mui/material";
import Hamburger from "hamburger-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
};
export default function MainHeader(props: Props) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Hamburger
            rounded
            duration={0.5}
            color="#FFFFFF"
            direction="right"
            size={24}
            toggled={props.sideBarOpen}
            toggle={() => props.setSideBarOpen((prev) => !prev)}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
