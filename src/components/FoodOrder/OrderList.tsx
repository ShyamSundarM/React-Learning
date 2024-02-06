import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { getCurrentURL } from "./Shared";
import { useSelector } from "react-redux";
import styles from "./OrderList.module.css";

type RowDataType = {
  name: string;
  address: string;
  phoneNumber: string;
  netAmount: number;
  orderDate: Date;
  cartData: CartData[];
};

type OrderResponse = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  netAmount: number;
  orderDate: Date;
  cartDataList: CartData[];
};

type CartData = {
  id: string;
  name: string;
  image: string;
  price: string;
  count: number;
};

export default function OrderList() {
  const token = useSelector((s: any) => s.auth.token) as string;
  const [orderData, setOrderData] = useState<OrderResponse[]>(null);
  const [isDataAvailable, setIsDataAvailable] = useState(null);

  useEffect(() => {
    get();
    async function get() {
      var resp = await axios.get<OrderResponse[]>(
        getCurrentURL() + "/food/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrderData(resp.data);
      setIsDataAvailable(true);
      console.log(resp.data);
    }
  }, []);
  return (
    <>
      <TableContainer className={styles.TableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Net Amount</TableCell>
              <TableCell>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.map((data) => {
              return (
                <Row
                  key={data.id}
                  name={data.name}
                  address={data.address}
                  phoneNumber={data.phoneNumber}
                  netAmount={data.netAmount}
                  orderDate={new Date(data.orderDate)}
                  cartData={data.cartDataList}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Row(props: RowDataType) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <TableRow key={1}>
        <TableCell>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell>{props.address}</TableCell>
        <TableCell>{props.phoneNumber}</TableCell>
        <TableCell>{props.netAmount}</TableCell>
        <TableCell>{props.orderDate.toISOString()}</TableCell>
      </TableRow>
      <TableRow key={2}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Cart Items
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.cartData?.map((data) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell>
                          <img
                            className={styles.dropDownImage}
                            src={data.image}
                          />
                        </TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell>{data.count}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
