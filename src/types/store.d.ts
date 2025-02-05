import {AllFlights} from './api';

export interface FlightsDataSlice {
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  flights?: AllFlights;
}
