import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import Refresh from '@mui/icons-material/Refresh';

import slice, { topUp, searchHistory } from './BraintreeSlice';

function Braintree() {
  return (
    <Box mb={2} p={2}>
      <Typography style={{textAlign: "left", fontSize: 20, marginBottom: 20}}>
        <b>Braintree Top Up</b>
      </Typography>
      <TopUpPanel />
      <br />
      <hr />
      <Typography style={{textAlign: "left", fontSize: 20, marginTop: 20}}>
        <b>History</b>
      </Typography>
      <HistoryTable />
    </Box>
  );
}

function TopUpPanel() {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => state.braintree);

  const handleChange = (event: any) => {
    dispatch(slice.actions.setTopUpValue(
      event.target.value < 1 ? '' : event.target.value
    ));
  };

  return (
    <div style={{display: "flex", alignItems: 'start', flexDirection: "column"}}>
      <Paper variant="outlined" square
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140, width: 298}}
      >
        <span>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13, marginBottom: 8, color: 'gray'}}>
            Total Sales Volume
            <Refresh
              style={{marginLeft: 5, fontSize: 18, cursor: sliceState.isLoading ? 'default' : 'pointer'}}
              onClick={() => !sliceState.isLoading && dispatch(searchHistory())}
            />
          </div>
          <div style={{fontSize: 28}}>
            {
              sliceState.isLoading ? "--" : "$ " + sliceState.transactionHistory.totalApproved
            }
          </div>
        </span>
      </Paper>
      <FormControl sx={{ width: 300 }} variant="filled" style={{marginTop: -5, backgroundColor: '#FFFFFF'}}>
        <InputLabel>Amount</InputLabel>
        <FilledInput
          autoFocus
          type={'number'}
          value={sliceState.topUpValue}
          onChange={handleChange}
          disabled={sliceState.isLoading}
          startAdornment={
            <InputAdornment position="start">
              $
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => dispatch(topUp(sliceState.topUpValue))}
                edge="end"
                disabled={!sliceState.topUpValue || sliceState.topUpValue.length == 0}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
}

function HistoryTable() {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => state.braintree);

  useEffect(() => {
    dispatch(slice.actions.resetStore());
    dispatch(searchHistory());
  }, []);

  const columnForDataGrid: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1 },
    // { field: 'type', headerName: 'Type', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1 },
    {
      field: 'status', headerName: 'Status', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1,
      valueFormatter: params => String(params?.value).replaceAll('_', ' ')
    },
    {
      field: 'amount', headerName: 'Amount', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1,
      valueGetter: params => `${params.row.currencyIsoCode}$ ${params?.value}`
    },
    {
      field: 'cardType', headerName: 'Card', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1,
      valueGetter: params => `${params.row.creditCard?.cardType}\n${params.row.creditCard?.maskedNumber}`,
      renderCell: (params) => { return <p style={{whiteSpace:'pre-wrap', textAlign: 'center'}}>{params?.value}</p> }
    },
    {
      field: 'createdAt', headerName: 'Created At', headerAlign: "center", sortable: true, align: "center", minWidth: 100, flex: 1,
      valueFormatter: params => new Date(params?.value).toLocaleString().replace(',', '')
    },
  ];

  return (
    <>
      <Box mb={2}>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          {/* <Button
            endIcon={<AddIcon />}
            onClick={() => dispatch(topUp(10))}
            style={{marginLeft: 5, fontSize: 15, fontWeight: 550}}
          >
            Top Up
          </Button> */}
          <Button
            endIcon={<Refresh />}
            onClick={() => dispatch(searchHistory())}
            style={{marginLeft: 5, fontSize: 15, fontWeight: 550}}
          >
            Refresh
          </Button>
        </div>
        <DataGrid
          columns={columnForDataGrid}
          rows={sliceState.transactionHistory.rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowId={row => row.id}
          rowCount={sliceState.transactionHistory.totalCount}
          loading={sliceState.isLoading}
          pageSizeOptions={[10, 50, 100]}
          autoHeight
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default Braintree;
