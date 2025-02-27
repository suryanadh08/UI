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
  Paper,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ValidationRules = ({ selectedTables, validationRules, setValidationRules, derivedFields }) => {
  const fields = ['Name', 'Age', 'Balance', 'Date']; // Example fields
  const operators = ['=', '!=', '>', '<', '>=', '<=', 'CONTAINS', 'LIKE', 'IN', 'LOOKUP']; // Example operators
  const logicalOperators = ['AND', 'OR']; // Logical operators

  const addValidationRule = () => {
    setValidationRules([...validationRules, { field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND', nestedConditions: [] }]);
  };

  const removeValidationRule = (index) => {
    const newValidationRules = validationRules.filter((_, i) => i !== index);
    setValidationRules(newValidationRules);
  };

  const addNestedCondition = (index) => {
    const newValidationRules = [...validationRules];
    newValidationRules[index].nestedConditions.push({ field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND' });
    setValidationRules(newValidationRules);
  };

  const removeNestedCondition = (index, nestedIndex) => {
    const newValidationRules = [...validationRules];
    newValidationRules[index].nestedConditions = newValidationRules[index].nestedConditions.filter((_, i) => i !== nestedIndex);
    setValidationRules(newValidationRules);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Validation Rules</Typography>
      {validationRules.map((rule, index) => (
        <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
              <InputLabel>Field</InputLabel>
              <Select value={rule.field} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].field = e.target.value;
                setValidationRules(newValidationRules);
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
              <Select value={rule.operator} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].operator = e.target.value;
                setValidationRules(newValidationRules);
              }}>
                {operators.map((operator) => (
                  <MenuItem key={operator} value={operator}>
                    {operator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
              <InputLabel>Type</InputLabel>
              <Select value={rule.type} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].type = e.target.value;
                setValidationRules(newValidationRules);
              }}>
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value="field">Field</MenuItem>
                <MenuItem value="derived">Derived Field</MenuItem>
              </Select>
            </FormControl>
            {rule.type === 'manual' ? (
              <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Enter Value" value={rule.value} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].value = e.target.value;
                setValidationRules(newValidationRules);
              }} />
            ) : rule.type === 'derived' ? (
              <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                <InputLabel>Derived Field</InputLabel>
                <Select value={rule.value} onChange={(e) => {
                  const newValidationRules = [...validationRules];
                  newValidationRules[index].value = e.target.value;
                  setValidationRules(newValidationRules);
                }}>
                  {Object.keys(derivedFields).flatMap((table) => derivedFields[table].map((field) => (
                    <MenuItem key={field.name} value={field.name}>
                      {field.name}
                    </MenuItem>
                  )))}
                </Select>
              </FormControl>
            ) : (
              <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                <InputLabel>Field</InputLabel>
                <Select value={rule.value} onChange={(e) => {
                  const newValidationRules = [...validationRules];
                  newValidationRules[index].value = e.target.value;
                  setValidationRules(newValidationRules);
                }}>
                  {fields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
              <InputLabel>Logical Operator</InputLabel>
              <Select value={rule.logicalOperator} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].logicalOperator = e.target.value;
                setValidationRules(newValidationRules);
              }}>
                {logicalOperators.map((operator) => (
                  <MenuItem key={operator} value={operator}>
                    {operator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton size="small" onClick={() => removeValidationRule(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ marginLeft: 4 }}>
            {rule.nestedConditions.map((nestedCondition, nestedIndex) => (
              <Paper key={nestedIndex} sx={{ padding: 2, marginBottom: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Field</InputLabel>
                    <Select value={nestedCondition.field} onChange={(e) => {
                      const newValidationRules = [...validationRules];
                      newValidationRules[index].nestedConditions[nestedIndex].field = e.target.value;
                      setValidationRules(newValidationRules);
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
                    <Select value={nestedCondition.operator} onChange={(e) => {
                      const newValidationRules = [...validationRules];
                      newValidationRules[index].nestedConditions[nestedIndex].operator = e.target.value;
                      setValidationRules(newValidationRules);
                    }}>
                      {operators.map((operator) => (
                        <MenuItem key={operator} value={operator}>
                          {operator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Type</InputLabel>
                    <Select value={nestedCondition.type} onChange={(e) => {
                      const newValidationRules = [...validationRules];
                      newValidationRules[index].nestedConditions[nestedIndex].type = e.target.value;
                      setValidationRules(newValidationRules);
                    }}>
                      <MenuItem value="manual">Manual</MenuItem>
                      <MenuItem value="field">Field</MenuItem>
                      <MenuItem value="derived">Derived Field</MenuItem>
                    </Select>
                  </FormControl>
                  {nestedCondition.type === 'manual' ? (
                    <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Enter Value" value={nestedCondition.value} onChange={(e) => {
                      const newValidationRules = [...validationRules];
                      newValidationRules[index].nestedConditions[nestedIndex].value = e.target.value;
                      setValidationRules(newValidationRules);
                    }} />
                  ) : nestedCondition.type === 'derived' ? (
                    <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                      <InputLabel>Derived Field</InputLabel>
                      <Select value={nestedCondition.value} onChange={(e) => {
                        const newValidationRules = [...validationRules];
                        newValidationRules[index].nestedConditions[nestedIndex].value = e.target.value;
                        setValidationRules(newValidationRules);
                      }}>
                        {Object.keys(derivedFields).flatMap((table) => derivedFields[table].map((field) => (
                          <MenuItem key={field.name} value={field.name}>
                            {field.name}
                          </MenuItem>
                        )))}
                      </Select>
                    </FormControl>
                  ) : (
                    <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                      <InputLabel>Field</InputLabel>
                      <Select value={nestedCondition.value} onChange={(e) => {
                        const newValidationRules = [...validationRules];
                        newValidationRules[index].nestedConditions[nestedIndex].value = e.target.value;
                        setValidationRules(newValidationRules);
                      }}>
                        {fields.map((field) => (
                          <MenuItem key={field} value={field}>
                            {field}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Logical Operator</InputLabel>
                    <Select value={nestedCondition.logicalOperator} onChange={(e) => {
                      const newValidationRules = [...validationRules];
                      newValidationRules[index].nestedConditions[nestedIndex].logicalOperator = e.target.value;
                      setValidationRules(newValidationRules);
                    }}>
                      {logicalOperators.map((operator) => (
                        <MenuItem key={operator} value={operator}>
                          {operator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton size="small" onClick={() => removeNestedCondition(index, nestedIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => addNestedCondition(index)}>
              Add Nested Condition
            </Button>
          </Box>
        </Paper>
      ))}
      <Button variant="contained" startIcon={<AddIcon />} onClick={addValidationRule}>
        Add Validation Rule
      </Button>
    </Box>
  );
};

export default ValidationRules;
