import { createSlice } from "@reduxjs/toolkit";

export type DbConfigType = {
  kvPairs: { keyName: string; keyValue: string }[];
};

const initialState: DbConfigType = { kvPairs: null };

const dbConfigSlice = createSlice({
  name: "dbCOnfig",
  initialState: initialState,
  reducers: {
    setAllParams(state, action) {
      state.kvPairs = action.payload;
    },
  },
});

export default dbConfigSlice;
export const dbConfigActions = dbConfigSlice.actions;
