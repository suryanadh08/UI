import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const ExecutionResults = () => {
  const [ruleEngines, setRuleEngines] = useState([]);
  const [selectedRuleEngine, setSelectedRuleEngine] = useState('');
  const [executions, setExecutions] = useState([]);
  const [selectedExecution, setSelectedExecution] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch rule engines from API or mock data
    setRuleEngines(['Rule Engine 1', 'Rule Engine 2', 'Rule Engine 3']);
  }, []);

  const handleRuleEngineChange = (event) => {
    setSelectedRuleEngine(event.target.value);
    // Fetch executions for the selected rule engine from API or mock data
    setExecutions([
      { id: 1, date: '2023-10-01', status: 'Pass' },
      { id: 2, date: '2023-10-05', status: 'Fail' },
      { id: 3, date: '2023-10-10', status: 'Pass' },
    ]);
  };

  const handleExecutionClick = (execution) => {
    setSelectedExecution(execution);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExecution(null);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Execution Results</Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Rule Engine</InputLabel>
        <Select value={selectedRuleEngine} onChange={handleRuleEngineChange}>
          {ruleEngines.map((ruleEngine) => (
            <MenuItem key={ruleEngine} value={ruleEngine}>
              {ruleEngine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {executions.length > 0 && (
        <Box>
          <Typography variant="subtitle1">Executions in the last month</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {executions.map((execution) => (
                <TableRow key={execution.id}>
                  <TableCell>{execution.date}</TableCell>
                  <TableCell>{execution.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleExecutionClick(execution)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Execution Details</DialogTitle>
        <DialogContent>
          {selectedExecution && (
            <Box>
              <Typography variant="subtitle1">Execution Date: {selectedExecution.date}</Typography>
              <Typography variant="subtitle1">Status: {selectedExecution.status}</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Derived Field</TableCell>
                    <TableCell>Calculated Field</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mock data for execution details */}
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>Pass</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Balance</TableCell>
                    <TableCell>$1000</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>$50</TableCell>
                    <TableCell>Pass</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExecutionResults;
