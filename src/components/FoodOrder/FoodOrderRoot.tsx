import { useContext, useEffect, useState } from "react";
import Content from "./Content";
import Header from "./Header";
import axios from "axios";
import { FoodContext, FoodItem } from "../../context/food-context";
import { Skeleton } from "@mui/material";
import RootSkeleton from "./RootSkeleton";

export default function FoodOrderRoot() {
  const foodCtx = useContext(FoodContext);

  useEffect(() => {
    async function get() {
      var foodData = (
        await axios.get<Array<FoodItem>>("https://rproj.somee.com/foods")
      ).data;
      foodData = foodData.map((item) => {
        return { ...item, chosenCount: 0 };
      });
      foodCtx.setAllFoodItems(foodData);
      foodCtx.setDataLoadedFlag(true);
    }
    get();
  }, []);
  return (
    <>
      <Header />

      {foodCtx.dataLoaded ? (
        <>
          <Content />
        </>
      ) : (
        <RootSkeleton />
      )}
    </>
  );
}
