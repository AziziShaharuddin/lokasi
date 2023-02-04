import { configureStore } from "@reduxjs/toolkit";
import autoCompleteReducer from '../slices'

const store = configureStore({
  reducer: {
    autoComplete: autoCompleteReducer,
  },
})

export default store