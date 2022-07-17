import { configureStore } from '@reduxjs/toolkit'
import rateReducer from '../component/slice';

export const store = configureStore({
  reducer: {
    rate: rateReducer,
  },
})