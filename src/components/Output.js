import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from '@mui/material';

const Output = () => {
  const [outputData, setOutputData] = useState([
    { id: 1, source: 'CustomerID', derived: 'DerivedCustomerID', destination: 'CustomerID', status: 'success', selected: false },
    { id: 2, source: 'AccountNumber', derived: 'DerivedAccountNumber', destination: 'AccountNumber', status: 'failed', selected: false },
    { id: 3, source: 'TransactionAmount', derived: null, destination: 'TransactionAmount', status: 'success', selected: false },
    { id: 4, source: 'TransactionDate', derived: 'DerivedTransactionDate', destination: 'TransactionDate', status: 'pending', selected: false },
  ]);

  const handleSelect = (id) => {
    setOutputData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
    );
  };

  const handleExport = () => {
    const selectedRows = outputData.filter((row) => row.selected);
    console.log('Exporting selected rows:', selectedRows);
    // Add export logic here
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Output</Typography>
      <Paper sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Source Column</TableCell>
              <TableCell>Derived Column</TableCell>
              <TableCell>Destination Field</TableCell>
              <TableCell>Rule Execution Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outputData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox checked={row.selected} onChange={() => handleSelect(row.id)} />
                </TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.derived || 'N/A'}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleExport}>
        Export Selected
      </Button>
    </Box>
  );
};

export default Output;
