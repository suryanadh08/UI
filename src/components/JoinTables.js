import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const JoinTables = ({ joins, setJoins, tables }) => {
  const fields = ['Name', 'Age', 'Balance', 'Date']; // Example fields
  const operators = ['=', '!=', '>', '<', '>=', '<=', 'CONTAINS', 'LIKE', 'IN', 'LOOKUP']; // Example operators

  const addJoin = () => {
    setJoins([...joins, { table1: '', field1: '', operator: '', table2: '', field2: '' }]);
  };

  const removeJoin = (index) => {
    const newJoins = joins.filter((_, i) => i !== index);
    setJoins(newJoins);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Join Tables</Typography>
      {joins.map((join, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel>First Table</InputLabel>
            <Select value={join.table1} onChange={(e) => {
              const newJoins = [...joins];
              newJoins[index].table1 = e.target.value;
              setJoins(newJoins);
            }}>
              {tables.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel>Field</InputLabel>
            <Select value={join.field1} onChange={(e) => {
              const newJoins = [...joins];
              newJoins[index].field1 = e.target.value;
              setJoins(newJoins);
            }}>
              {fields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel>Operator</InputLabel>
            <Select value={join.operator} onChange={(e) => {
              const newJoins = [...joins];
              newJoins[index].operator = e.target.value;
              setJoins(newJoins);
            }}>
              {operators.map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {operator}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel>Second Table</InputLabel>
            <Select value={join.table2} onChange={(e) => {
              const newJoins = [...joins];
              newJoins[index].table2 = e.target.value;
              setJoins(newJoins);
            }}>
              {tables.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
            <InputLabel>Field</InputLabel>
            <Select value={join.field2} onChange={(e) => {
              const newJoins = [...joins];
              newJoins[index].field2 = e.target.value;
              setJoins(newJoins);
            }}>
              {fields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={() => removeJoin(index)}>
            Remove Join Condition
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addJoin}>
        Add Join Condition
      </Button>
    </Box>
  );
};

export default JoinTables;
