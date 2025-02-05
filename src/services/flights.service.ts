import {Airports, AllFlights, APIResponse, GetAirportsParams, GetAllFlightsParams, RESTAPIResponse} from '../types/api';
import apiClient from './api';

const FlightsService = {
  async getAllFlights(params: GetAllFlightsParams): Promise<APIResponse<AllFlights>> {
    try {
      const response = await apiClient.get<RESTAPIResponse<AllFlights>>('/v2/flights/searchFlightEverywhere', {params});

      return {isOk: true, status: response.status, response: response.data};
    } catch (err) {
      console.warn('Error: getAllFlights', err);
      return {isOk: false};
    }
  },

  async getAirports(params: GetAirportsParams): Promise<APIResponse<Airports>> {
    try {
      const response = await apiClient.get<RESTAPIResponse<Airports>>('/v1/flights/searchAirport', {params});

      return {isOk: true, status: response.status, response: response.data};
    } catch (err) {
      console.warn('Error: getAirports', err);
      return {isOk: false};
    }
  },
};

export default FlightsService;
