import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Switch,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useNavigate } from "react-router-dom";

type Props = {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MainDrawer(props: Props) {
  const navigate = useNavigate();
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
      <Divider color="#4a4a4a" />
      <List subheader={<ListSubheader>My Apps</ListSubheader>}>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("TableGenerator");
              props.setSideBarOpen(false);
            }}
          >
            <ListItemText primary="Table Generator" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("FoodOrder");
              props.setSideBarOpen(false);
            }}
          >
            <ListItemText primary="Food Order" />
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
