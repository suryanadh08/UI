import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import DataFilters from './DataFilters';
import DerivedFields from './DerivedFields';
import JoinTables from './JoinTables';
import ValidationRules from './ValidationRules';
import Scheduler from './Scheduler';

const RuleEngine = () => {
  const [selectedTables, setSelectedTables] = useState([]);
  const [conditions, setConditions] = useState({});
  const [validationRules, setValidationRules] = useState([]);
  const [derivedFields, setDerivedFields] = useState({});
  const [joins, setJoins] = useState([]);
  const [schedulerConfig, setSchedulerConfig] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const tables = ['Customer', 'Account', 'Transaction']; // Example tables

  const handleTableChange = (event) => {
    const selected = event.target.value;
    setSelectedTables(selected);
    const newConditions = {};
    const newDerivedFields = {};
    selected.forEach(table => {
      newConditions[table] = [];
      newDerivedFields[table] = [];
    });
    setConditions(newConditions);
    setDerivedFields(newDerivedFields);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const clearAllTables = () => {
    setSelectedTables([]);
    setConditions({});
    setDerivedFields({});
    setJoins([]);
    setValidationRules([]);
    setSchedulerConfig({});
  };

  const clearTable = (table) => {
    const newSelectedTables = selectedTables.filter(t => t !== table);
    setSelectedTables(newSelectedTables);
    const newConditions = { ...conditions };
    delete newConditions[table];
    setConditions(newConditions);
    const newDerivedFields = { ...derivedFields };
    delete newDerivedFields[table];
    setDerivedFields(newDerivedFields);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Rule Engine
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">General Configuration</Typography>
        <FormControl fullWidth>
          <InputLabel>Select Tables</InputLabel>
          <Select
            multiple
            value={selectedTables}
            onChange={handleTableChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {tables.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={clearAllTables}>
            Clear All Tables
          </Button>
          {selectedTables.map((table) => (
            <Button key={table} variant="contained" color="secondary" onClick={() => clearTable(table)}>
              Remove {table}
            </Button>
          ))}
        </Box>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Derived Fields" />
        <Tab label="Data Filters" />
        {selectedTables.length > 1 && <Tab label="Join Tables" />}
        <Tab label="Validation Rules" />
        <Tab label="Scheduler" />
      </Tabs>

      {tabIndex === 0 && (
        <DerivedFields
          selectedTables={selectedTables}
          derivedFields={derivedFields}
          setDerivedFields={setDerivedFields}
        />
      )}

      {tabIndex === 1 && (
        <DataFilters
          selectedTables={selectedTables}
          conditions={conditions}
          setConditions={setConditions}
          derivedFields={derivedFields}
        />
      )}

      {tabIndex === 2 && selectedTables.length > 1 && (
        <JoinTables
          joins={joins}
          setJoins={setJoins}
          tables={tables}
        />
      )}

      {tabIndex === 3 && selectedTables.length > 0 && (
        <ValidationRules
          selectedTables={selectedTables}
          validationRules={validationRules}
          setValidationRules={setValidationRules}
          derivedFields={derivedFields}
        />
      )}

      {tabIndex === 4 && (
        <Scheduler
          schedulerConfig={schedulerConfig}
          setSchedulerConfig={setSchedulerConfig}
        />
      )}
    </Box>
  );
};

export default RuleEngine;
