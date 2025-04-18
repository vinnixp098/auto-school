import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineSlices({
//   app: appReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
