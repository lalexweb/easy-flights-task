import {createAsyncThunk} from '@reduxjs/toolkit';
import FlightsService from '../../../services/flights.service';
import {AllFlights, GetAllFlightsParams, RESTAPIResponse} from '../../../types/api';

// DEPRECATED
export const getAllFlights = createAsyncThunk<RESTAPIResponse<AllFlights> | undefined, GetAllFlightsParams>('flights/getAll', async (params: GetAllFlightsParams) => {
  const response = await FlightsService.getAllFlights(params);

  return response?.response;
});
