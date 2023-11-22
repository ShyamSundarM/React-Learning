import { useContext, useEffect, useState } from "react";
import Content from "./Content";
import Header from "./Header";
import axios from "axios";
import { FoodContext, FoodItem } from "../../context/food-context";
import { Skeleton } from "@mui/material";
import RootSkeleton from "./RootSkeleton";
import useCounter from "./hooks/counter-hook";
import { getCurrentURL } from "./Shared";

export default function FoodOrderRoot() {
  const foodCtx = useContext(FoodContext);
  //const counter1 = useCounter(0, 1000);
  //const counter2 = useCounter(20, 500);

  useEffect(() => {
    async function get() {
      var foodData = (
        await axios.get<Array<FoodItem>>(getCurrentURL() + "/food/getAll", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
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
