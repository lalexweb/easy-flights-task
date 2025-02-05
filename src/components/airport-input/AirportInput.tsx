import {Autocomplete, Box, FormHelperText, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {ControllerFieldState, ControllerRenderProps, FieldValues} from 'react-hook-form';
import {useDebounce} from 'use-debounce';
import FlightsService from '../../services/flights.service';
import {Airport, Airports} from '../../types/api';

interface AirportInputProps {
  label: string;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export default function AirportInput({label, field, fieldState}: AirportInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const [airports, setAirports] = useState<Airports>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateAirports = async (query: string) => {
    if (isLoading || !query) return;

    try {
      setIsLoading(true);

      const response = await FlightsService.getAirports({query});

      if (response.isOk && response?.response?.data?.length) {
        setAirports(response?.response?.data);
      } else {
        setAirports([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateAirports(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <Box sx={{width: '100%'}}>
      <Autocomplete
        noOptionsText={debouncedInputValue && !isLoading ? 'No places found' : 'Start typing'}
        getOptionLabel={(option: Airport) => option.presentation.suggestionTitle}
        isOptionEqualToValue={(option, value) => option.entityId === value.entityId}
        onChange={(_, value) => field.onChange(value?.entityId || '')}
        onBlur={field.onBlur}
        value={airports.find(airport => airport.entityId === field.value) || null}
        loading={isLoading}
        options={airports}
        renderInput={params => <TextField {...params} value={inputValue} onChange={handleInputChange} label={label} error={!!fieldState.error} />}
      />

      {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
    </Box>
  );
}
