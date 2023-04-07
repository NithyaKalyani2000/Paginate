import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../Reducer/reducer";

export default configureStore({
  reducer: {
    reduce_store: reducer,
  },
});
