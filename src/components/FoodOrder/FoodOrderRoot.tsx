import { useContext, useEffect, useState } from "react";
import Content from "./Content";
import Header from "./Header";
import axios from "axios";
import { FoodContext, FoodItem } from "../../context/food-context";
import { Backdrop, CircularProgress } from "@mui/material";

export default function FoodOrderRoot() {
  const foodCtx = useContext(FoodContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    async function get() {
      var foodData = (
        await axios.get<Array<FoodItem>>("https://rproj.somee.com/foods")
      ).data;
      console.log(foodData);
      foodData = foodData.map((item) => {
        return { ...item, chosenCount: 0 };
      });
      foodCtx.setAllFoodItems(foodData);
      setDataLoaded((prev) => true);
    }
    get();
  }, []);
  return (
    <>
      <Backdrop open={!dataLoaded} sx={{ color: "#13a5ff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <Content />
    </>
  );
}
