import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessRule from './BusinessRule';
import Scheduler from './Scheduler';

const ProcessControl = () => {
  const [process, setProcess] = useState({ name: '', businessRules: [] });
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedSubTabIndex, setSelectedSubTabIndex] = useState(0);
  const [schedulerConfig, setSchedulerConfig] = useState({});

  const handleProcessNameChange = (name) => {
    setProcess({ ...process, name });
  };

  const addBusinessRule = () => {
    setProcess({
      ...process,
      businessRules: [...process.businessRules, { name: '', selectedTables: [], conditions: {}, derivedFields: {}, joins: [], validationRules: [] }]
    });
  };

  const removeBusinessRule = (ruleIndex) => {
    const newBusinessRules = process.businessRules.filter((_, i) => i !== ruleIndex);
    setProcess({ ...process, businessRules: newBusinessRules });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    setSelectedSubTabIndex(newValue);
  };

  const saveProcess = () => {
    // Save process and business rules logic here
    console.log('Process saved:', process);
    console.log('Scheduler config saved:', schedulerConfig);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Process Control
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Process Name"
          value={process.name}
          onChange={(e) => handleProcessNameChange(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Tabs value={selectedTabIndex} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
          <Tab label="Business Rules" />
          <Tab label="Scheduler" />
        </Tabs>
        {selectedTabIndex === 0 && (
          <Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={addBusinessRule} sx={{ marginBottom: 2 }}>
              Add Business Rule
            </Button>
            {process.businessRules.map((rule, ruleIndex) => (
              <Paper key={ruleIndex} sx={{ padding: 2, marginBottom: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Business Rule {ruleIndex + 1}</Typography>
                  <IconButton size="small" onClick={() => removeBusinessRule(ruleIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <BusinessRule
                  rule={rule}
                  setRule={(newRule) => {
                    const newBusinessRules = [...process.businessRules];
                    newBusinessRules[ruleIndex] = newRule;
                    setProcess({ ...process, businessRules: newBusinessRules });
                  }}
                />
              </Paper>
            ))}
          </Box>
        )}
        {selectedTabIndex === 1 && (
          <Scheduler
            schedulerConfig={schedulerConfig}
            setSchedulerConfig={setSchedulerConfig}
          />
        )}
      </Paper>
      <Button variant="contained" color="primary" onClick={saveProcess}>
        Save Process
      </Button>
    </Box>
  );
};

export default ProcessControl;
