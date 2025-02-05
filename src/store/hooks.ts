import {useSelector} from 'react-redux';
import {RootState} from './store';

export const useFlights = () => {
  const data = useSelector((state: RootState) => state.flights.flights);

  return data;
};

export const useFlightsAreLoading = () => {
  const data = useSelector((state: RootState) => state.flights.isLoading);

  return data;
};

export const useFlightsAreNotFound = () => {
  const data = useSelector((state: RootState) => state.flights.isNotFound);

  return data;
};
