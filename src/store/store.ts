import {configureStore} from '@reduxjs/toolkit';
import FlightsData from './slices/flights-data/FlightsDataSlice';

export const store = configureStore({
  reducer: {
    flights: FlightsData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
