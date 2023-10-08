import { createContext, PropsWithChildren, useState } from "react";

export type FoodItem = {
  id: number;
  name: string;
  image: string;
  chosenCount: number;
  price: number;
};

type ContextType = {
  foodItems: Array<FoodItem>;
  incDecFoodItem: (id: number, isAdd: boolean) => void;
  setAllFoodItems: (items: Array<FoodItem>) => void;
};

export const FoodContext = createContext<ContextType>({
  foodItems: [],
  incDecFoodItem: (id: number, isAdd: boolean) => {},
  setAllFoodItems: (items: Array<FoodItem>) => {},
});

export default function FoodContextProvider(props: PropsWithChildren) {
  const [foodItems, setFoodItems] = useState<Array<FoodItem>>([]);
  function setAllFoodItems(items: Array<FoodItem>) {
    setFoodItems((prev) => [...items]);
  }
  function incDecFoodItem(id: number, isAdd: boolean) {
    const index = foodItems.findIndex((f) => f.id == id);
    const item = foodItems[index];
    if (item != undefined) {
      isAdd ? item.chosenCount++ : item.chosenCount--;
      foodItems[index] = item;
      setFoodItems((prev) => [...foodItems]);
    }
  }
  return (
    <FoodContext.Provider
      value={{
        foodItems: foodItems,
        incDecFoodItem: incDecFoodItem,
        setAllFoodItems: setAllFoodItems,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
}
