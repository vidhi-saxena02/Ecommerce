import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: [thunk],
});

export default store;
