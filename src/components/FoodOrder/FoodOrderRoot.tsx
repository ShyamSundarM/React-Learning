import { useContext, useEffect } from "react";
import Content from "./Content";
import Header from "./Header";
import axios from "axios";
import { FoodContext, FoodItem } from "../../context/food-context";

export default function FoodOrderRoot() {
  const foodCtx = useContext(FoodContext);
  useEffect(() => {
    async function get() {
      var foodData = (
        await axios.get<Array<FoodItem>>("http://rproj.somee.com/foods")
      ).data; //http://rproj.somee.com/foods
      console.log(foodData);
      foodData = foodData.map((item) => {
        return { ...item, chosenCount: 0 };
      });
      foodCtx.setAllFoodItems(foodData);
    }
    get();
  }, []);
  return (
    <>
      <Header />
      <Content />
    </>
  );
}
