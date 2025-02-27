import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DataFilters from './DataFilters';
import DerivedFields from './DerivedFields';
import JoinTables from './JoinTables';
import ValidationRules from './ValidationRules';

const BusinessRule = ({ rule, setRule }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tables = ['Customer', 'Account', 'Transaction']; // Example tables

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        fullWidth
        label="Business Rule Name"
        value={rule.name}
        onChange={(e) => setRule({ ...rule, name: e.target.value })}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Tables</InputLabel>
        <Select
          multiple
          value={rule.selectedTables || []}
          onChange={(e) => setRule({ ...rule, selectedTables: e.target.value })}
          renderValue={(selected) => selected.join(', ')}
        >
          {tables.map((table) => (
            <MenuItem key={table} value={table}>
              {table}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Derived Fields" />
        <Tab label="Data Filters" />
        {(rule.selectedTables || []).length > 1 && <Tab label="Join Tables" />}
        <Tab label="Validation Rules" />
      </Tabs>
      {tabIndex === 0 && (
        <DerivedFields
          selectedTables={rule.selectedTables || []}
          derivedFields={rule.derivedFields}
          setDerivedFields={(newDerivedFields) => setRule({ ...rule, derivedFields: newDerivedFields })}
        />
      )}
      {tabIndex === 1 && (
        <DataFilters
          selectedTables={rule.selectedTables || []}
          conditions={rule.conditions}
          setConditions={(newConditions) => setRule({ ...rule, conditions: newConditions })}
          derivedFields={rule.derivedFields}
        />
      )}
      {tabIndex === 2 && (rule.selectedTables || []).length > 1 && (
        <JoinTables
          joins={rule.joins}
          setJoins={(newJoins) => setRule({ ...rule, joins: newJoins })}
          tables={rule.selectedTables || []}
        />
      )}
      {tabIndex === 3 && (
        <ValidationRules
          selectedTables={rule.selectedTables || []}
          validationRules={rule.validationRules}
          setValidationRules={(newValidationRules) => setRule({ ...rule, validationRules: newValidationRules })}
          derivedFields={rule.derivedFields}
        />
      )}
    </Box>
  );
};

export default BusinessRule;
