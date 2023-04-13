import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';

import Refresh from '@mui/icons-material/Refresh';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import slice, { getAllAmounts } from './ExchangeSlice';

function Exchange() {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => state.exchange);

  useEffect(() => {
    dispatch(slice.actions.resetStore());
    dispatch(getAllAmounts());
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 15000 }}
        open={sliceState.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box mb={2} p={2}>
        <Typography style={{textAlign: "left", fontSize: 20, marginBottom: 20}}>
          <b>Exchange</b>
        </Typography>
        <div style={{display: "flex", alignItems: 'start', flexDirection: "column"}}>
          <TotalAmountPanel />
          <ExchangePanel />
        </div>
      </Box>
    </>
  );
}

function TotalAmountPanel() {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => state.exchange);

  return (
    <Card
      sx={{ width: 300, textAlign: "left" }}
      style={{backgroundColor: '#EEEEEE'}}
    >
      <CardHeader
        title="My Wallet"
      />
      <hr style={{marginLeft: 10, marginRight: 10}}/>
      <CardContent>
        <Typography>
          Braintree: ${sliceState.isLoading ? '--' : sliceState.totalAmount.braintree}
        </Typography>
        <Typography>
          BTC: ${sliceState.isLoading ? '--' : sliceState.totalAmount.btc}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton style={{marginLeft: 'auto'}}
          onClick={() => dispatch(getAllAmounts())}
          disabled={sliceState.isLoading}
        >
          <Refresh />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function ExchangePanel() {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => state.exchange);

  const handleChange = (event: any) => {
    dispatch(slice.actions.setCurrency({name: event.target.name, value: event.target.value}));
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
      <FormControl variant="standard" sx={{ width: 150 }}>
        <InputLabel>From Currency</InputLabel>
        <Select
          id="fromCurrency"
          name="fromCurrency"
          label="fromCurrency"
          value={sliceState.exchangeCurrency.fromCurrency}
          onChange={handleChange}
        >
          <MenuItem value={'braintree'}>Braintree</MenuItem>
          <MenuItem value={'btc'}>BTC</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ width: 150 }}>
        <InputLabel>Amount</InputLabel>
        <Input
          autoFocus
          name="fromValue"
          type={'number'}
          value={sliceState.exchangeCurrency.fromValue}
          onChange={handleChange}
          disabled={sliceState.isLoading}
          startAdornment={
            <InputAdornment position="start">
              $
            </InputAdornment>
          }
        />
      </FormControl>
      < KeyboardDoubleArrowRightIcon style={{color: "gray"}} />
      <FormControl variant="standard" sx={{ width: 150 }}>
        <InputLabel>To Currency</InputLabel>
        <Select
          id="toCurrency"
          name="toCurrency"
          label="toCurrency"
          value={sliceState.exchangeCurrency.toCurrency}
          onChange={handleChange}
        >
          <MenuItem value={'braintree'}>Braintree</MenuItem>
          <MenuItem value={'btc'}>BTC</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Exchange;
