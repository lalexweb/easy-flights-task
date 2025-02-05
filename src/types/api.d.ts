export interface RESTAPIResponse<T> {
  status: boolean;
  timestamp: number;
  message?: {
    message: string;
    code: number;
  };
  data?: T;
}

export interface APIResponse<T> {
  status?: number;
  response?: RESTAPIResponse<T>;
  isOk: boolean;
}

export interface FlightResultQuote {
  price: string;
  rawPrice: number;
  direct: boolean;
}

export interface FlightResult {
  id: string;
  type: string;
  content: {
    location: {
      id: string;
      skyCode: string;
      name: string;
      type: string;
    };
    flightQuotes: {
      cheapest: FlightResultQuote;
      direct?: FlightResultQuote;
    };
    image: {
      url: string;
    };
    flightRoutes: {
      directFlightsAvailable: boolean;
    };
  };
}

export interface AllFlights {
  context: {
    status: string;
    sessionId: string;
    totalResults: number;
  };
  results: FlightResult[];
}

export interface GetAllFlightsParams {
  originEntityId: string;
  destinationEntityId?: string;

  /** Departure or travel date. Format: YYYY-MM-DD */
  travelDate?: string;

  /** Return date. Format: YYYY-MM-DD */
  returnDate?: string;

  /** Adults: 15+ years Default value: 1 Ex: 2 for 2 adults */
  adults?: number;

  /** The ages of the children are separated by commas. Eg: Child 1 = < 1 years Child 2 = 14 years
    Then childAges = 0,14
    Note: Children age should be less then 15 years */
  childAges?: string;

  /**  Default value: economy */
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';

  journeyType?: 'one_way' | 'round_trip';

  /** currency can be retrieved from api/v1/getConfig endpoint(data->currency) Default value: USD Ex: USD */
  currency?: string;
}

export interface AllFlightsComplete {
  context: {
    status: string;
    sessionId: string;
    totalResults: number;
  };
  results: FlightResult[];
}

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export type Airports = Airport[];

export interface GetAirportsParams {
  query: string;
  locale?: string;
}
