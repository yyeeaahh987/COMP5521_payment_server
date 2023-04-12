import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
      <Typography style={{textAlign: "left", fontSize: 20}}>
        <b>Top Up</b>
      </Typography>
      <TopUp />
      <br />
      <hr />
      <Typography style={{textAlign: "left", fontSize: 20, marginTop: 20}}>
        <b>History</b>
      </Typography>
      <HistoryTable />
    </Box>
  );
}

function TopUp() {
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');

  const handleChange = (event: any) => {
    setVal(event.target.value < 1 ? '' : event.target.value);
  };

  return (
    <div style={{display: "flex", justifyContent: "flex-start", verticalAlign: "middle"}}>
      <FormControl sx={{ m: 1, width: 300 }} variant="filled">
        <InputLabel style={{fontSize: 20}}>Amount ($)</InputLabel>
        <FilledInput
          autoFocus
          type={'number'}
          value={val}
          onChange={handleChange}
          style={{fontSize: 20}}
          // startAdornment={
          //   <InputAdornment position="start">
          //     $
          //   </InputAdornment>
          // }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => dispatch(topUp(val))}
                edge="end"
                disabled={!val || val.length == 0}
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
    { field: 'id', headerName: 'ID', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1 },
    // { field: 'type', headerName: 'Type', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1 },
    { field: 'status', headerName: 'Status', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1 },
    { field: 'amount', headerName: 'Amount', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1 },
    {
      field: 'cardType', headerName: 'Card', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1,
      valueGetter: params => `${params.row.creditCard?.cardType} ${params.row.creditCard?.maskedNumber}`
    },
    {
      field: 'createdAt', headerName: 'Created At', headerAlign: "center", sortable: true, align: "center", minWidth: 130, flex: 1,
      valueFormatter: params => new Date(params?.value).toLocaleString()
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
                pageSize: 100,
              },
            },
          }}
          getRowId={row => row.id}
          rowCount={sliceState.transactionHistory.totalCount}
          loading={sliceState.isLoading}
          pageSizeOptions={[100]}
          pagination
          paginationMode='server'
          autoHeight
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default Braintree;
