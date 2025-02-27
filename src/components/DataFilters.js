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

const DataFilters = ({ selectedTables = [], conditions = {}, setConditions, derivedFields }) => {
  const fields = ['Name', 'Age', 'Balance', 'Date']; // Example fields
  const operators = ['=', '!=', '>', '<', '>=', '<=', 'CONTAINS', 'LIKE', 'IN', 'LOOKUP']; // Example operators
  const logicalOperators = ['AND', 'OR']; // Logical operators
  const staticTables = ['StaticTable1', 'StaticTable2']; // Example static tables
  const staticFields = ['StaticField1', 'StaticField2']; // Example static fields

  const addCondition = (table) => {
    setConditions({
      ...conditions,
      [table]: [...(conditions[table] || []), { field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND', nestedConditions: [] }]
    });
  };

  const removeCondition = (table, index) => {
    const newConditions = conditions[table].filter((_, i) => i !== index);
    setConditions({ ...conditions, [table]: newConditions });
  };

  const addNestedCondition = (table, index) => {
    const newConditions = [...conditions[table]];
    newConditions[index].nestedConditions.push({ field: '', operator: '', value: '', type: 'manual', logicalOperator: 'AND' });
    setConditions({ ...conditions, [table]: newConditions });
  };

  const removeNestedCondition = (table, index, nestedIndex) => {
    const newConditions = [...conditions[table]];
    newConditions[index].nestedConditions = newConditions[index].nestedConditions.filter((_, i) => i !== nestedIndex);
    setConditions({ ...conditions, [table]: newConditions });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Data Filters</Typography>
      {selectedTables.map((table) => (
        <Box key={table} sx={{ marginBottom: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="subtitle1">{table}</Typography>
          {(conditions[table] || []).map((condition, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                  <InputLabel>Field</InputLabel>
                  <Select value={condition.field} onChange={(e) => {
                    const newConditions = [...conditions[table]];
                    newConditions[index].field = e.target.value;
                    setConditions({ ...conditions, [table]: newConditions });
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
                  <Select value={condition.operator} onChange={(e) => {
                    const newConditions = [...conditions[table]];
                    newConditions[index].operator = e.target.value;
                    setConditions({ ...conditions, [table]: newConditions });
                  }}>
                    {operators.map((operator) => (
                      <MenuItem key={operator} value={operator}>
                        {operator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {condition.operator === 'LOOKUP' ? (
                  <>
                    <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                      <InputLabel>Static Table</InputLabel>
                      <Select value={condition.value} onChange={(e) => {
                        const newConditions = [...conditions[table]];
                        newConditions[index].value = e.target.value;
                        setConditions({ ...conditions, [table]: newConditions });
                      }}>
                        {staticTables.map((staticTable) => (
                          <MenuItem key={staticTable} value={staticTable}>
                            {staticTable}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                      <InputLabel>Static Field</InputLabel>
                      <Select value={condition.value} onChange={(e) => {
                        const newConditions = [...conditions[table]];
                        newConditions[index].value = e.target.value;
                        setConditions({ ...conditions, [table]: newConditions });
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
                    <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                      <InputLabel>Type</InputLabel>
                      <Select value={condition.type} onChange={(e) => {
                        const newConditions = [...conditions[table]];
                        newConditions[index].type = e.target.value;
                        setConditions({ ...conditions, [table]: newConditions });
                      }}>
                        <MenuItem value="manual">Manual</MenuItem>
                        <MenuItem value="field">Field</MenuItem>
                        <MenuItem value="derived">Derived Field</MenuItem>
                      </Select>
                    </FormControl>
                    {condition.type === 'manual' ? (
                      <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Enter Value" value={condition.value} onChange={(e) => {
                        const newConditions = [...conditions[table]];
                        newConditions[index].value = e.target.value;
                        setConditions({ ...conditions, [table]: newConditions });
                      }} />
                    ) : condition.type === 'derived' ? (
                      <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                        <InputLabel>Derived Field</InputLabel>
                        <Select value={condition.value} onChange={(e) => {
                          const newConditions = [...conditions[table]];
                          newConditions[index].value = e.target.value;
                          setConditions({ ...conditions, [table]: newConditions });
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
                        <Select value={condition.value} onChange={(e) => {
                          const newConditions = [...conditions[table]];
                          newConditions[index].value = e.target.value;
                          setConditions({ ...conditions, [table]: newConditions });
                        }}>
                          {fields.map((field) => (
                            <MenuItem key={field} value={field}>
                              {field}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </>
                )}
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                  <InputLabel>Logical Operator</InputLabel>
                  <Select value={condition.logicalOperator} onChange={(e) => {
                    const newConditions = [...conditions[table]];
                    newConditions[index].logicalOperator = e.target.value;
                    setConditions({ ...conditions, [table]: newConditions });
                  }}>
                    {logicalOperators.map((operator) => (
                      <MenuItem key={operator} value={operator}>
                        {operator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton size="small" onClick={() => removeCondition(table, index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ marginLeft: 4 }}>
                {condition.nestedConditions.map((nestedCondition, nestedIndex) => (
                  <Paper key={nestedIndex} sx={{ padding: 2, marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                      <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                        <InputLabel>Field</InputLabel>
                        <Select value={nestedCondition.field} onChange={(e) => {
                          const newConditions = [...conditions[table]];
                          newConditions[index].nestedConditions[nestedIndex].field = e.target.value;
                          setConditions({ ...conditions, [table]: newConditions });
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
                          const newConditions = [...conditions[table]];
                          newConditions[index].nestedConditions[nestedIndex].operator = e.target.value;
                          setConditions({ ...conditions, [table]: newConditions });
                        }}>
                          {operators.map((operator) => (
                            <MenuItem key={operator} value={operator}>
                              {operator}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {nestedCondition.operator === 'LOOKUP' ? (
                        <>
                          <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                            <InputLabel>Static Table</InputLabel>
                            <Select value={nestedCondition.value} onChange={(e) => {
                              const newConditions = [...conditions[table]];
                              newConditions[index].nestedConditions[nestedIndex].value = e.target.value;
                              setConditions({ ...conditions, [table]: newConditions });
                            }}>
                              {staticTables.map((staticTable) => (
                                <MenuItem key={staticTable} value={staticTable}>
                                  {staticTable}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                            <InputLabel>Static Field</InputLabel>
                            <Select value={nestedCondition.value} onChange={(e) => {
                              const newConditions = [...conditions[table]];
                              newConditions[index].nestedConditions[nestedIndex].value = e.target.value;
                              setConditions({ ...conditions, [table]: newConditions });
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
                          <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                            <InputLabel>Type</InputLabel>
                            <Select value={nestedCondition.type} onChange={(e) => {
                              const newConditions = [...conditions[table]];
                              newConditions[index].nestedConditions[nestedIndex].type = e.target.value;
                              setConditions({ ...conditions, [table]: newConditions });
                            }}>
                              <MenuItem value="manual">Manual</MenuItem>
                              <MenuItem value="field">Field</MenuItem>
                              <MenuItem value="derived">Derived Field</MenuItem>
                            </Select>
                          </FormControl>
                          {nestedCondition.type === 'manual' ? (
                            <TextField sx={{ marginRight: 2, minWidth: 150 }} label="Enter Value" value={nestedCondition.value} onChange={(e) => {
                              const newConditions = [...conditions[table]];
                              newConditions[index].nestedConditions[nestedIndex].value = e.target.value;
                              setConditions({ ...conditions, [table]: newConditions });
                            }} />
                          ) : nestedCondition.type === 'derived' ? (
                            <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                              <InputLabel>Derived Field</InputLabel>
                              <Select value={nestedCondition.value} onChange={(e) => {
                                const newConditions = [...conditions[table]];
                                newConditions[index].nestedConditions[nestedIndex].value = e.target.value;
                                setConditions({ ...conditions, [table]: newConditions });
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
                                const newConditions = [...conditions[table]];
                                newConditions[index].nestedConditions[nestedIndex].value = e.target.value;
                                setConditions({ ...conditions, [table]: newConditions });
                              }}>
                                {fields.map((field) => (
                                  <MenuItem key={field} value={field}>
                                    {field}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </>
                      )}
                      <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                        <InputLabel>Logical Operator</InputLabel>
                        <Select value={nestedCondition.logicalOperator} onChange={(e) => {
                          const newConditions = [...conditions[table]];
                          newConditions[index].nestedConditions[nestedIndex].logicalOperator = e.target.value;
                          setConditions({ ...conditions, [table]: newConditions });
                        }}>
                          {logicalOperators.map((operator) => (
                            <MenuItem key={operator} value={operator}>
                              {operator}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <IconButton size="small" onClick={() => removeNestedCondition(table, index, nestedIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => addNestedCondition(table, index)}>
                  Add Nested Condition
                </Button>
              </Box>
            </Paper>
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => addCondition(table)}>
            Add Condition
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DataFilters;
