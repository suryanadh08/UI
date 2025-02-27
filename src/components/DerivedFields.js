import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const DerivedFields = ({ selectedTables = [], derivedFields, setDerivedFields }) => {
  const fields = ['Name', 'Age', 'Balance', 'Date']; // Example fields
  const arithmeticOperators = ['+', '-', '*', '/']; // Arithmetic operators

  const addDerivedField = (table) => {
    setDerivedFields({
      ...derivedFields,
      [table]: [...(derivedFields[table] || []), { name: '', fields: [], operator: '', rightOperand: '', type: 'manual' }]
    });
  };

  const removeDerivedField = (table, index) => {
    const newDerivedFields = derivedFields[table].filter((_, i) => i !== index);
    setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Derived Fields</Typography>
      {selectedTables.map((table) => (
        <Box key={table} sx={{ marginBottom: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="subtitle1">{table}</Typography>
          {derivedFields[table]?.map((field, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Derived Field Name" value={field.name} onChange={(e) => {
                  const newDerivedFields = [...derivedFields[table]];
                  newDerivedFields[index].name = e.target.value;
                  setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                }} />
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                  <InputLabel>Left Operand</InputLabel>
                  <Select multiple value={field.fields} onChange={(e) => {
                    const newDerivedFields = [...derivedFields[table]];
                    newDerivedFields[index].fields = e.target.value;
                    setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                  }}>
                    {fields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                  <InputLabel>Operator</InputLabel>
                  <Select value={field.operator} onChange={(e) => {
                    const newDerivedFields = [...derivedFields[table]];
                    newDerivedFields[index].operator = e.target.value;
                    setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                  }}>
                    {arithmeticOperators.map((operator) => (
                      <MenuItem key={operator} value={operator}>
                        {operator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                  <InputLabel>Right Operand Type</InputLabel>
                  <Select value={field.type} onChange={(e) => {
                    const newDerivedFields = [...derivedFields[table]];
                    newDerivedFields[index].type = e.target.value;
                    setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                  }}>
                    <MenuItem value="manual">Manual</MenuItem>
                    <MenuItem value="field">Field</MenuItem>
                  </Select>
                </FormControl>
                {field.type === 'manual' ? (
                  <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Right Operand" value={field.rightOperand} onChange={(e) => {
                    const newDerivedFields = [...derivedFields[table]];
                    newDerivedFields[index].rightOperand = e.target.value;
                    setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                  }} />
                ) : (
                  <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Field</InputLabel>
                    <Select value={field.rightOperand} onChange={(e) => {
                      const newDerivedFields = [...derivedFields[table]];
                      newDerivedFields[index].rightOperand = e.target.value;
                      setDerivedFields({ ...derivedFields, [table]: newDerivedFields });
                    }}>
                      {fields.map((field) => (
                        <MenuItem key={field} value={field}>
                          {field}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <IconButton size="small" onClick={() => removeDerivedField(table, index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => addDerivedField(table)}>
            Add Derived Field
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DerivedFields;