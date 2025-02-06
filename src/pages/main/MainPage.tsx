import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {Box, Button, CircularProgress, Container, FormControl, Grid2, IconButton, InputLabel, MenuItem, Pagination, Select, TextField, Typography} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {ChangeEvent, useState} from 'react';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import AirportInput from '../../components/airport-input/AirportInput';
import FlightCard from '../../components/flight-card/FlightCard';
import {useFlights, useFlightsAreLoading, useFlightsAreNotFound} from '../../store/hooks';
import {getAllFlights} from '../../store/slices/flights-data/FlightsDataThunk';
import {AppDispatch} from '../../store/store';
import {Airport, GetAllFlightsParams} from '../../types/api';
import styles from './MainPage.module.scss';

const pagination = 12;
const journeyTypes = [
  {name: 'One way', value: 'one_way'},
  {name: 'Round trip', value: 'round_trip'},
];
const cabinClasses = [
  {name: 'Economy', value: 'economy'},
  {name: 'Premium Economy', value: 'premium_economy'},
  {name: 'Business', value: 'business'},
  {name: 'First', value: 'first'},
];

export default function MainPage() {
  const {control, handleSubmit, setValue, getValues, watch} = useForm();

  const flightsAreLoading = useFlightsAreLoading();
  const flightsAreNotFound = useFlightsAreNotFound();
  const flights = useFlights();

  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);

  const formValues = watch();

  console.log(formValues);

  const onSubmit = (values: FieldValues) => {
    if (flightsAreLoading) return;

    const fromAirport: Airport = values.from_airport as Airport;
    const toAirport: Airport = values.to_airport as Airport;
    const travelDate = values.travel_date ? dayjs(values.travel_date).format('YYYY-MM-DD') : '';
    const returnDate = values.return_date ? dayjs(values.return_date).format('YYYY-MM-DD') : '';

    const sendingData: GetAllFlightsParams = {
      originEntityId: fromAirport.entityId,
      destinationEntityId: toAirport.entityId,
      travelDate,
      returnDate,
      journeyType: values.journey_type,
      cabinClass: values.cabin_class,
      adults: values.adults,
    };

    dispatch(getAllFlights(sendingData));
  };

  const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
    window.scrollTo({behavior: 'smooth', top: 0});

    setCurrentPage(page);
  };

  const handleSwitchAirports = () => {
    const values = getValues();

    setValue('from_airport', values.to_airport);
    setValue('to_airport', values.from_airport);
  };

  return (
    <Container>
      <Box sx={{display: 'flex', flexDirection: 'column', my: {xs: 3, md: 10}, gap: {xs: 3, md: 10}}} className={styles.wrapper}>
        <Box className={styles.filters}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, p: 2, alignItems: 'center'}}>
              <Box sx={{display: 'flex', gap: 2, alignItems: 'center', width: '100%'}}>
                <Controller
                  control={control}
                  name="journey_type"
                  defaultValue={journeyTypes?.[0]?.value}
                  render={field => (
                    <FormControl fullWidth>
                      <InputLabel id="journeyType">Journey Type</InputLabel>
                      <Select onChange={field?.field?.onChange} value={field?.field?.value} labelId="journeyType" label="Journey Type">
                        {journeyTypes?.map(type => (
                          <MenuItem value={type?.value} key={type?.value}>
                            {type?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="cabin_class"
                  defaultValue={cabinClasses?.[0]?.value}
                  render={field => (
                    <FormControl fullWidth>
                      <InputLabel id="cabinClass">Cabin Class</InputLabel>
                      <Select onChange={field?.field?.onChange} value={field?.field?.value} labelId="cabinClass" label="Cabin Class">
                        {cabinClasses?.map(type => (
                          <MenuItem value={type?.value} key={type?.value}>
                            {type?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller control={control} name="adults" defaultValue={1} render={field => <TextField id="outlined-basic" label="Adults" variant="outlined" value={field?.field?.value} onChange={field?.field?.onChange} type="number" />} />
              </Box>
              <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
                <Grid2 sx={{alignItems: 'center'}} container spacing={2}>
                  <Grid2 size={5.5}>
                    <Controller control={control} name="from_airport" defaultValue={''} rules={{required: 'Select airport, please'}} render={field => <AirportInput label="From" {...field} />} />
                  </Grid2>
                  <Grid2 sx={{display: 'flex', justifyContent: 'center'}} size={1}>
                    <IconButton onClick={handleSwitchAirports} color="primary">
                      <SyncAltIcon />
                    </IconButton>
                  </Grid2>
                  <Grid2 size={5.5}>
                    <Controller control={control} name="to_airport" defaultValue={''} render={field => <AirportInput label="To" {...field} />} />
                  </Grid2>
                </Grid2>
                <Grid2 sx={{alignItems: 'center'}} container spacing={2}>
                  <Grid2 size={5.5}>
                    <Controller control={control} name="travel_date" defaultValue={''} render={field => <DatePicker label="Travel Date" sx={{width: '100%'}} onChange={newValue => field.field.onChange(newValue)} />} />
                  </Grid2>
                  <Grid2 sx={{display: 'flex', justifyContent: 'center'}} size={1} />
                  <Grid2 size={5.5}>{formValues?.journey_type === 'round_trip' && <Controller control={control} name="return_date" defaultValue={''} render={field => <DatePicker label="Return Date" sx={{width: '100%'}} onChange={newValue => field.field.onChange(newValue)} />} />}</Grid2>
                </Grid2>
              </Box>
              <Button loading={flightsAreLoading} type="submit" startIcon={<SearchIcon />} variant="contained">
                Search
              </Button>
            </Box>
          </form>
        </Box>
        {(flightsAreLoading || !!flights?.results?.length) && (
          <Box className={styles.flights} sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center'}}>
            {flightsAreLoading && (
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                <CircularProgress />
              </Box>
            )}
            {!flightsAreLoading && !!flights?.results?.length && (
              <Grid2 container sx={{width: '100%'}} spacing={2}>
                {flights?.results?.slice((currentPage - 1) * pagination, pagination * currentPage)?.map(flight => (
                  <Grid2 key={flight?.id} size={{xs: 12, sm: 6, md: 4}}>
                    <FlightCard data={flight} />
                  </Grid2>
                ))}
              </Grid2>
            )}
            {!flightsAreLoading && !!flights?.results?.length && Math.ceil(flights?.results?.length / pagination) > 1 && <Pagination count={Math.ceil(flights?.results?.length / pagination)} shape="rounded" onChange={handleChangePage} />}
          </Box>
        )}
        {!flightsAreLoading && flightsAreNotFound && (
          <Box className={styles.flights} sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center'}}>
            <Typography variant="h2" component={'div'}>
              No Flights Found
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
