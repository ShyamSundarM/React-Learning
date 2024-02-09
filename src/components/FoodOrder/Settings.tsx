import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { getCurrentURL } from "./Shared";
import { useSelector } from "react-redux";
import styles from "./Settings.module.css";

type DropDownData = {
  name: string;
  isIndexRoute: boolean;
};
export default function Settings() {
  const [HomePageChildren, setHomePageChildren] = useState<{
    data: DropDownData[];
    isLoading: boolean;
  }>({ data: null, isLoading: false });
  const token = useSelector((s: any) => s.auth.token) as string;
  const [selectedValue, setSelectedValue] = useState("");
  const [isNewRouteSetting, setIsNewRouteSetting] = useState(false);

  useEffect(() => {
    get();
    async function get() {
      setHomePageChildren((prev) => ({ ...prev, isLoading: true }));
      const resp = await axios.get<DropDownData[]>(
        getCurrentURL() + "/RouteConfig/HomePage/ChildrenNames",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (resp.status === 200) {
        setHomePageChildren({ data: resp.data, isLoading: false });
        const name = resp.data.find((data) => data.isIndexRoute === true).name;
        setSelectedValue(name);
      }
    }
  }, []);
  async function onRouteChangeHandler(event: SelectChangeEvent) {
    setIsNewRouteSetting(true);
    const resp = await axios.post(
      getCurrentURL() + "/RouteConfig/SetIndexRoute",
      { parentName: "HomePage", indexRouteName: event.target.value },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status === 200) {
      setSelectedValue(event.target.value);
    }
    setIsNewRouteSetting(false);
  }

  return (
    <div className={styles.Root}>
      <div className={styles.HomePageContainer}>
        <div>Default Route for HomePage : </div>
        {HomePageChildren?.data && (
          <Select
            disabled={isNewRouteSetting}
            className={styles.HPDropDown}
            size="small"
            value={selectedValue}
            label="Route"
            onChange={onRouteChangeHandler}
          >
            {HomePageChildren.data.map((data) => (
              <MenuItem key={data.name} value={data.name}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
    </div>
  );
}
