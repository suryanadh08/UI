import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfiguredRules = () => {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch configured rules from API or mock data
    setRules([
      { id: 1, name: 'Rule 1', description: 'Description for Rule 1', version: '1.0', status: 'Active' },
      { id: 2, name: 'Rule 2', description: 'Description for Rule 2', version: '1.1', status: 'Inactive' },
      { id: 3, name: 'Rule 3', description: 'Description for Rule 3', version: '2.0', status: 'Active' },
    ]);
  }, []);

  const handleViewEditRule = (rule) => {
    navigate('/rule-engine', { state: { rule } });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Configured Rules</Typography>
      <Paper sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.name}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell>{rule.version}</TableCell>
                <TableCell>{rule.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleViewEditRule(rule)}>
                    View/Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ConfiguredRules;
