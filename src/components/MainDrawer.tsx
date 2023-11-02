import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Switch,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";

type Props = {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MainDrawer(props: Props) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={props.sideBarOpen}
      onClose={() => props.setSideBarOpen(false)}
      onOpen={() => props.setSideBarOpen(true)}
    >
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
          <Switch
            edge="end"
            //checked={}
            // onChange={}
          />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
