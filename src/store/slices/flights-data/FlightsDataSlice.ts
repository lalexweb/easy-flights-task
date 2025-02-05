import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AllFlights} from '../../../types/api';
import {FlightsDataSlice} from '../../../types/store';
import {getAllFlights} from './FlightsDataThunk';

const initialState: FlightsDataSlice = {
  isLoading: false,
  isNotFound: false,
  isError: false,
  flights: undefined,
};

const flightsDataSlice = createSlice({
  name: 'flightsData',
  initialState,
  reducers: {
    setFlights(state, action: PayloadAction<AllFlights>) {
      state.flights = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllFlights.pending, state => {
        state.isLoading = true;
        state.isNotFound = false;
        state.isError = false;
        state.flights = undefined;
      })
      .addCase(getAllFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.status) {
          if (!action.payload.data?.results?.length) {
            state.isNotFound = true;
          }

          state.flights = action.payload.data;
        } else if (action.payload?.message && 400 <= action.payload?.message?.code && action.payload?.message?.code <= 499) {
          state.isNotFound = true;
        } else {
          state.isError = true;
        }
      })
      .addCase(getAllFlights.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {setFlights} = flightsDataSlice.actions;

export default flightsDataSlice.reducer;
