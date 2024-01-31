import { AppBar, Toolbar } from "@mui/material";
import Hamburger from "hamburger-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppContext, User } from "../context/app-context";
import styles from "./MainHeader.module.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LogoutIcon from "@mui/icons-material/Logout";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux-store";
import authSlice, { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";

type Props = {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
};
export default function MainHeader(props: Props) {
  const appCtx = useContext(AppContext);
  const userName = useSelector((s: any) => s.auth.user?.userName) as string;
  const user = useSelector((s: any) => s.auth.user) as User;
  const navigate = useNavigate();
  const [arrowIconAngle, setArrowIconAngle] = useState(0);
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={styles.toolBar}>
          <Hamburger
            rounded
            duration={0.5}
            color="#FFFFFF"
            direction="right"
            size={24}
            toggled={props.sideBarOpen}
            toggle={() => props.setSideBarOpen((prev) => !prev)}
          />
          {user && (
            <div
              className={styles.nameContainer}
              onClick={() =>
                setArrowIconAngle((prev) => (prev === 180 ? 0 : 180))
              }
            >
              <div className={styles.name}>
                Hi {userName ? userName : "unknown"}
              </div>
              <motion.div animate={{ rotate: arrowIconAngle }}>
                <KeyboardArrowUpIcon className={styles.arrowIcon} />
              </motion.div>
              <AnimatePresence>
                {arrowIconAngle === 180 && (
                  <motion.div
                    className={styles.dropdownItems}
                    initial={{ translateY: -20, opacity: 0 }}
                    animate={{ translateY: 30, opacity: 1 }}
                    exit={{ translateY: -10, opacity: 0 }}
                  >
                    <div
                      className={`${styles.logoutContainer} ${styles.dropdownItem}`}
                      onClick={() => {
                        dispatch(
                          authActions.setLoginData({
                            user: null,
                            expiresIn: null,
                            token: null,
                          })
                        );
                        navigate("/");
                      }}
                    >
                      <div>LogOut</div>
                      <LogoutIcon className={styles.logoutIcon} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
