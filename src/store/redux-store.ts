import { Action, configureStore } from "@reduxjs/toolkit";

const initialState = { count: 0 };
interface State {
  count: number;
}

const reducerFn = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
  }
  return state;
};
const store = configureStore({
  reducer: reducerFn,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
