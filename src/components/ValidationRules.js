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
} from '@mui/material';

const ValidationRules = ({ selectedTables, validationRules, setValidationRules, derivedFields }) => {
  const fields = ['Name', 'Age', 'Balance', 'Date']; // Example fields
  const operators = ['=', '!=', '>', '<', '>=', '<=', 'CONTAINS', 'LIKE', 'IN', 'LOOKUP']; // Example operators
  const logicalOperators = ['AND', 'OR']; // Logical operators
  const staticTables = ['StaticTable1', 'StaticTable2']; // Example static tables
  const staticFields = ['StaticField1', 'StaticField2']; // Example static fields

  const addValidationRule = () => {
    setValidationRules([...validationRules, { field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND', nestedConditions: [] }]);
  };

  const removeValidationRule = (index) => {
    const newValidationRules = validationRules.filter((_, i) => i !== index);
    setValidationRules(newValidationRules);
  };

  const addNestedValidationRule = (index) => {
    const newValidationRules = [...validationRules];
    newValidationRules[index].nestedConditions.push({ field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND' });
    setValidationRules(newValidationRules);
  };

  const removeNestedValidationRule = (index, nestedIndex) => {
    const newValidationRules = [...validationRules];
    newValidationRules[index].nestedConditions = newValidationRules[index].nestedConditions.filter((_, i) => i !== nestedIndex);
    setValidationRules(newValidationRules);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Validation Rules</Typography>
      {validationRules.map((rule, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
              <InputLabel>Field</InputLabel>
              <Select value={rule.field} onChange={(e) => {
                const newValidationRules = [...validationRules];
                newValidationRules[index].field = e.target.value;
                setValidationRules(newValidationRules);
              }}>
                {selectedTables.flatMap((table) => fields.map((field) => `${table}.${field}`)).map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
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
            {rule.operator === 'LOOKUP' ? (
              <>
                <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                  <InputLabel>Static Table</InputLabel>
                  <Select value={rule.value} onChange={(e) => {
                    const newValidationRules = [...validationRules];
                    newValidationRules[index].value = e.target.value;
                    setValidationRules(newValidationRules);
                  }}>
                    {staticTables.map((staticTable) => (
                      <MenuItem key={staticTable} value={staticTable}>
                        {staticTable}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                  <InputLabel>Static Field</InputLabel>
                  <Select value={rule.value} onChange={(e) => {
                    const newValidationRules = [...validationRules];
                    newValidationRules[index].value = e.target.value;
                    setValidationRules(newValidationRules);
                  }}>
                    {staticFields.map((staticField) => (
                      <MenuItem key={staticField} value={staticField}>
                        {staticField}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                  <InputLabel>Type</InputLabel>
                  <Select value={rule.type} onChange={(e) => {
                    const newValidationRules = [...validationRules];
                    newValidationRules[index].type = e.target.value;
                    setValidationRules(newValidationRules);
                  }}>
                    <MenuItem value="manual">Manual</MenuItem>
                    <MenuItem value="field">Field</MenuItem>
                    <MenuItem value="derived">Derived</MenuItem>
                  </Select>
                </FormControl>
                {rule.type === 'manual' ? (
                  <TextField sx={{ marginRight: 2, minWidth: 120 }} label="Value" value={rule.value} onChange={(e) => {
                    const newValidationRules = [...validationRules];
                    newValidationRules[index].value = e.target.value;
                    setValidationRules(newValidationRules);
                  }} />
                ) : (
                  <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
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
                      {rule.type === 'derived' && Object.keys(derivedFields).flatMap((table) => derivedFields[table].map((field) => (
                        <MenuItem key={field.name} value={field.name}>
                          {field.name}
                        </MenuItem>
                      )))}
                    </Select>
                  </FormControl>
                )}
              </>
            )}
            <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
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
            <Button variant="contained" color="secondary" onClick={() => removeValidationRule(index)}>
              Remove Rule
            </Button>
          </Box>
          {rule.nestedConditions.map((nestedRule, nestedIndex) => (
            <Box key={nestedIndex} sx={{ display: 'flex', alignItems: 'center', marginLeft: 4, marginBottom: 2 }}>
              <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                <InputLabel>Field</InputLabel>
                <Select value={nestedRule.field} onChange={(e) => {
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
              <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                <InputLabel>Operator</InputLabel>
                <Select value={nestedRule.operator} onChange={(e) => {
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
              <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select value={nestedRule.type} onChange={(e) => {
                  const newValidationRules = [...validationRules];
                  newValidationRules[index].nestedConditions[nestedIndex].type = e.target.value;
                  setValidationRules(newValidationRules);
                }}>
                  <MenuItem value="manual">Manual</MenuItem>
                  <MenuItem value="field">Field</MenuItem>
                  <MenuItem value="derived">Derived</MenuItem>
                </Select>
              </FormControl>
              {nestedRule.type === 'manual' ? (
                <TextField sx={{ marginRight: 2, minWidth: 120 }} label="Value" value={nestedRule.value} onChange={(e) => {
                  const newValidationRules = [...validationRules];
                  newValidationRules[index].nestedConditions[nestedIndex].value = e.target.value;
                  setValidationRules(newValidationRules);
                }} />
              ) : (
                <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                  <InputLabel>Field</InputLabel>
                  <Select value={nestedRule.value} onChange={(e) => {
                    const newValidationRules = [...validationRules];
                    newValidationRules[index].nestedConditions[nestedIndex].value = e.target.value;
                    setValidationRules(newValidationRules);
                  }}>
                    {fields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                    {nestedRule.type === 'derived' && Object.keys(derivedFields).flatMap((table) => derivedFields[table].map((field) => (
                      <MenuItem key={field.name} value={field.name}>
                        {field.name}
                      </MenuItem>
                    )))}
                  </Select>
                </FormControl>
              )}
              <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
                <InputLabel>Logical Operator</InputLabel>
                <Select value={nestedRule.logicalOperator} onChange={(e) => {
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
              <Button variant="contained" color="secondary" onClick={() => removeNestedValidationRule(index, nestedIndex)}>
                Remove Nested Rule
              </Button>
            </Box>
          ))}
          <Button variant="contained" onClick={() => addNestedValidationRule(index)}>
            Add Nested Rule
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addValidationRule} disabled={selectedTables.length === 0}>
        Add Validation Rule
      </Button>
    </Box>
  );
};

export default ValidationRules;
