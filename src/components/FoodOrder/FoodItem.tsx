import { motion } from "framer-motion";
import Counter from "./Counter";
import styles from "./FoodItem.module.css";
import { useSelector } from "react-redux";
import { User } from "../../context/app-context";
import { UserRole } from "../../enums/UserRole";
import { Button } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { getCurrentURL } from "./Shared";
import {
  FoodContext,
  FoodItem as FoodItemType,
} from "../../context/food-context";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

type Props = {
  id: string;
  name: string;
  image: string;
  count: number;
  price: number;
  description: string;
};

type UpdatedData = {
  name: string;
  price: number;
  image: string;
};

export default function FoodItem(props: Props) {
  const foodCtx = useContext(FoodContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((s: any) => s.auth.user) as User;
  const token = useSelector((s: any) => s.auth.token) as string;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [updatedData, setUpdatedData] = useState<UpdatedData>({
    name: props.name,
    price: +props.price,
    image: props.image,
  });

  useEffect(() => {
    if (props.id === "") {
      setIsEditMode(true);
    }
  }, [props.id]);

  function editBtnClickHandler(): void {
    setIsEditMode(true);
  }

  function closeBtnClickHandler() {
    if (!isModified) {
      setIsEditMode(false);
    } else {
      if (window.confirm("Changes will be lost, close ?")) {
        setIsEditMode(false);
        setIsModified(false);
      }
    }
  }

  async function deleteBtnClickHandler() {
    if (window.confirm("This action is irreversible, proceed ?")) {
      try {
        const resp = await axios.delete(
          getCurrentURL() + "/food/" + props.id + "/delete",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (resp?.status === 200) {
          foodCtx.deleteFoodItem(props.id);
        }
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
  }

  function valueChangeHandler(event: any): void {
    setUpdatedData((prev: UpdatedData) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    if (
      (event.currentTarget.name === "name" &&
        event.target.value !== props.name) ||
      (event.currentTarget.name === "price" &&
        +event.target.value !== props.price) ||
      (event.currentTarget.name === "image" &&
        event.target.value !== props.image)
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }

  async function saveClickHandler(event: any) {
    setIsLoading(true);
    const data = {
      id: props.id,
      name: updatedData.name,
      description: props.description,
      image: updatedData.image,
      price: +updatedData.price,
    };
    debugger;
    if (data.id === "") delete data.id;
    try {
      var url = getCurrentURL() + "/food/";
      url = props.id === "" ? url + "create" : url + "update";
      const resp = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        if (data.id) {
          foodCtx.updateFoodItem({ ...data, chosenCount: props.count });
        } else {
          foodCtx.insertFoodItem(
            { ...data, chosenCount: 0, id: "" },
            resp.data
          );
        }

        setIsEditMode(false);
        setIsModified(false);
      }
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
    setIsLoading(false);
  }

  return (
    <motion.li
      className={styles.container}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { staggerChildren: 1 } }}
    >
      <div className={styles.innerContainer}>
        {isEditMode ? (
          <textarea
            name="image"
            className={styles.image}
            defaultValue={props.image}
            onChange={valueChangeHandler}
          />
        ) : (
          <img src={props.image} className={styles.image} />
        )}
        <div className={styles.details}>
          {isEditMode ? (
            <>
              <input
                name="name"
                className={styles.name}
                defaultValue={updatedData.name}
                onChange={valueChangeHandler}
              ></input>
              <div className={`${styles.price} mt-2`}>
                Price:{" "}
                <input
                  name="price"
                  defaultValue={updatedData.price}
                  type="number"
                  onChange={valueChangeHandler}
                />
                ₹
              </div>
            </>
          ) : (
            <>
              <div className={styles.name}>{props.name}</div>
              <div className={styles.price}>Price: {props.price}₹</div>
            </>
          )}
        </div>
      </div>

      <div className={styles.counter}>
        {user?.role === UserRole.Admin && !isEditMode && (
          <>
            <Button variant="contained" onClick={editBtnClickHandler}>
              Edit
            </Button>
            <button
              className={styles.DeleteIcon}
              onClick={deleteBtnClickHandler}
            >
              <DeleteForeverOutlinedIcon color="error" />
            </button>
          </>
        )}
        {isEditMode && isModified && (
          <LoadingButton
            variant="contained"
            color="success"
            onClick={saveClickHandler}
            loading={isLoading}
          >
            Save
          </LoadingButton>
        )}
        {user?.role !== UserRole.Admin && (
          <Counter count={props.count} id={props.id} />
        )}
      </div>
      {isEditMode && (
        <button
          className={styles.CancelEditIcon}
          onClick={closeBtnClickHandler}
        >
          <CancelOutlinedIcon color="error" />
        </button>
      )}
    </motion.li>
  );
}
