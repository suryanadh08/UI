import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const BatchStatus = () => {
  const batches = [
    {
      id: 1,
      name: 'Batch 1',
      status: 'Completed',
      recordsProcessed: 100,
      recordsPassed: 90,
      recordsFailed: 10,
      processes: [
        {
          name: 'Process 1',
          businessRules: [
            { name: 'Business Rule 1', recordsProcessed: 50, recordsPassed: 45, recordsFailed: 5 },
            { name: 'Business Rule 2', recordsProcessed: 50, recordsPassed: 45, recordsFailed: 5 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Batch 2',
      status: 'Failed',
      recordsProcessed: 200,
      recordsPassed: 180,
      recordsFailed: 20,
      processes: [
        {
          name: 'Process 2',
          businessRules: [
            { name: 'Business Rule 3', recordsProcessed: 100, recordsPassed: 90, recordsFailed: 10 },
            { name: 'Business Rule 4', recordsProcessed: 100, recordsPassed: 90, recordsFailed: 10 },
          ],
        },
      ],
    },
  ];

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Batch Status</Typography>
      {batches.map((batch) => (
        <Paper key={batch.id} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">{batch.name}</Typography>
          <Typography variant="subtitle1">Status: {batch.status}</Typography>
          <Typography variant="subtitle1">Records Processed: {batch.recordsProcessed}</Typography>
          <Typography variant="subtitle1">Records Passed: {batch.recordsPassed}</Typography>
          <Typography variant="subtitle1">Records Failed: {batch.recordsFailed}</Typography>
          {batch.processes.map((process, processIndex) => (
            <Box key={processIndex} sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">{process.name}</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Business Rule</TableCell>
                    <TableCell>Records Processed</TableCell>
                    <TableCell>Records Passed</TableCell>
                    <TableCell>Records Failed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {process.businessRules.map((rule, ruleIndex) => (
                    <TableRow key={ruleIndex}>
                      <TableCell>{rule.name}</TableCell>
                      <TableCell>{rule.recordsProcessed}</TableCell>
                      <TableCell>{rule.recordsPassed}</TableCell>
                      <TableCell>{rule.recordsFailed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default BatchStatus;
