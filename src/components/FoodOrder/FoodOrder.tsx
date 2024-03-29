import { useContext, useEffect, useState } from "react";
import Content from "./Content";
import Header from "./Header";
import axios, { AxiosError } from "axios";
import { FoodContext, FoodItem } from "../../context/food-context";
import { Skeleton } from "@mui/material";
import RootSkeleton from "./RootSkeleton";
import useCounter from "./hooks/counter-hook";
import { getCurrentURL } from "./Shared";
import { AppContext } from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

export default function FoodOrder() {
  const token = useSelector((s: any) => s.auth.token) as string;
  const dispatch = useDispatch();
  const foodCtx = useContext(FoodContext);
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  //const counter1 = useCounter(0, 1000);
  //const counter2 = useCounter(20, 500);

  useEffect(() => {
    async function get() {
      try {
        var foodResp = await axios.get<Array<FoodItem>>(
          getCurrentURL() + "/food/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        var foodData = foodResp.data;
        foodData = foodData.map((item) => {
          return { ...item, chosenCount: 0 };
        });
        foodCtx.setAllFoodItems(foodData);
        foodCtx.setDataLoadedFlag(true);
      } catch (err: any) {
        if (err.response?.status === 401) {
          navigate("/");
          dispatch(
            authActions.setLoginData({
              user: null,
              expiresIn: null,
              token: null,
            })
          );
        }
        navigate("/");
      }
    }
    get();
  }, []);
  return (
    <>
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
