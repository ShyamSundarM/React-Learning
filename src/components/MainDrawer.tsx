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
import styles from "./MainDrawer.module.css";
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
      <div className={styles.DrawerContainer}>
        <div className={`accordion ${styles.appsAccordion}`}>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                My Applications
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
