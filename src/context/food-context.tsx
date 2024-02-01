import { createContext, PropsWithChildren, useState } from "react";

export type FoodItem = {
  id: string;
  name: string;
  image: string;
  chosenCount?: number;
  price: number;
  description: string;
};

type ContextType = {
  foodItems: Array<FoodItem>;
  dataLoaded: boolean;
  incDecFoodItem: (id: string, isAdd: boolean) => void;
  setAllFoodItems: (items: Array<FoodItem>) => void;
  setDataLoadedFlag: (flag: boolean) => void;
  modalOpen: boolean;
  setModalOpen: (flag: boolean) => void;
  updateFoodItem: (item: FoodItem) => void;
  deleteFoodItem: (id: string) => void;
  insertFoodItem: (item: FoodItem, newId: string) => void;
};

export const FoodContext = createContext<ContextType>({
  foodItems: [],
  dataLoaded: false,
  incDecFoodItem: (id: string, isAdd: boolean) => {},
  setAllFoodItems: (items: Array<FoodItem>) => {},
  setDataLoadedFlag: (flag: boolean) => {},
  modalOpen: false,
  setModalOpen: (flag: boolean) => {},
  updateFoodItem: (item: FoodItem) => {},
  deleteFoodItem: (id: string) => {},
  insertFoodItem: (item: FoodItem, newId: string) => {},
});

export default function FoodContextProvider(props: PropsWithChildren) {
  const [foodItems, setFoodItems] = useState<Array<FoodItem>>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  function setModalOpenFlag(flag: boolean) {
    setModalOpen((prev) => flag);
  }
  function deleteFoodItem(id: string) {
    const filteredData = foodItems.filter((item) => item.id !== id);
    setFoodItems((prev) => [...filteredData]);
  }
  function setDataLoadedFlag(flag: boolean) {
    setDataLoaded((prev) => flag);
  }
  function setAllFoodItems(items: Array<FoodItem>) {
    setFoodItems((prev) => [...items]);
  }
  function updateFoodItem(item: FoodItem) {
    const index = foodItems.findIndex((f) => f.id == item.id);
    let fullData = [...foodItems];
    fullData[index] = item;
    setFoodItems((prev) => [...fullData]);
  }
  function insertFoodItem(item: FoodItem, newId: string) {
    var foodData = foodItems;
    const index = foodData.findIndex((f) => f.id == item.id);
    item.id = newId;
    foodData[index] = item;
    setFoodItems((prev) => [...foodData]);
  }
  function incDecFoodItem(id: string, isAdd: boolean) {
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
        dataLoaded: dataLoaded,
        setDataLoadedFlag: setDataLoadedFlag,
        foodItems: foodItems,
        incDecFoodItem: incDecFoodItem,
        setAllFoodItems: setAllFoodItems,
        modalOpen,
        setModalOpen: setModalOpenFlag,
        updateFoodItem,
        deleteFoodItem,
        insertFoodItem,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
}
