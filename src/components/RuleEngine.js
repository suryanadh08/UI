import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [expanded, setExpanded] = useState(false);

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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

      <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Derived Fields</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DerivedFields
            selectedTables={selectedTables}
            derivedFields={derivedFields}
            setDerivedFields={setDerivedFields}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Data Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataFilters
            selectedTables={selectedTables}
            conditions={conditions}
            setConditions={setConditions}
            derivedFields={derivedFields}
          />
        </AccordionDetails>
      </Accordion>

      {selectedTables.length > 1 && (
        <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Join Tables</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JoinTables
              joins={joins}
              setJoins={setJoins}
              tables={tables}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {selectedTables.length > 0 && (
        <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Validation Rules</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ValidationRules
              selectedTables={selectedTables}
              validationRules={validationRules}
              setValidationRules={setValidationRules}
              derivedFields={derivedFields}
            />
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion expanded={expanded === 'panel5'} onChange={handleAccordionChange('panel5')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Scheduler</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Scheduler
            schedulerConfig={schedulerConfig}
            setSchedulerConfig={setSchedulerConfig}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default RuleEngine;
