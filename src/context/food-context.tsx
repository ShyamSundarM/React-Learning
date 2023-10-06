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
};
const food: Array<FoodItem> = [
  {
    id: 0,
    name: "Pizza",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokGJo9_cNfnDsZhVtmx-_aoX6gcWwCaGkgKn_CRLOapXgsRU3HyU2ogNEjfMwpScyd-I&usqp=CAU",
    chosenCount: 0,
    price: 120,
  },
  {
    id: 1,
    name: "Burger",
    image:
      "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg",
    chosenCount: 0,
    price: 100,
  },
  {
    id: 2,
    name: "Tandoori Chicken",
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-Recipe.jpg",
    chosenCount: 0,
    price: 210,
  },
  {
    id: 3,
    name: "Fish Curry",
    image:
      "https://static.toiimg.com/thumb/92487537.cms?imgsize=121772&width=800&height=800",
    chosenCount: 0,
    price: 190,
  },
  {
    id: 4,
    name: "Mutton Mandi",
    image:
      "https://b.zmtcdn.com/data/dish_photos/263/6bb94bcb64ebbba8ca961d42fdbb0263.jpg",
    chosenCount: 0,
    price: 399,
  },
];
export const FoodContext = createContext<ContextType>({
  foodItems: [],
  incDecFoodItem: (id: number, isAdd: boolean) => {},
});

export default function FoodContextProvider(props: PropsWithChildren) {
  const [foodItems, setFoodItems] = useState<Array<FoodItem>>(food);
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
      value={{ foodItems: foodItems, incDecFoodItem: incDecFoodItem }}
    >
      {props.children}
    </FoodContext.Provider>
  );
}
