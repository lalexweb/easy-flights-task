import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {FlightResult} from '../../types/api';

interface FlightCardProps {
  data: FlightResult;
}

export default function FlightCard({data}: FlightCardProps) {
  return (
    <Card variant="elevation" sx={{height: '100%'}}>
      <CardMedia sx={{height: 200}} image={data?.content?.image?.url} />
      <CardContent>
        <Typography gutterBottom variant="h4">
          {data?.content?.location?.name}
        </Typography>

        {(!!data?.content?.flightQuotes?.cheapest?.price || !!data?.content?.flightQuotes?.direct?.price) && (
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 'auto'}}>
            {!!data?.content?.flightQuotes?.cheapest?.price && <Typography variant="body1">Cheapest: {data?.content?.flightQuotes?.cheapest?.price}</Typography>}

            {!!data?.content?.flightQuotes?.direct?.price && <Typography variant="body1">Direct: {data?.content?.flightQuotes?.direct?.price}</Typography>}
          </Box>
        )}

        {!data?.content?.flightRoutes?.directFlightsAvailable && (
          <Typography color="error" textAlign={'end'}>
            No Direct Flights
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
