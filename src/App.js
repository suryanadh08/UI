import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import RuleEngine from './components/RuleEngine';
import Configuration from './components/Configuration';
import ExecutionResults from './components/ExecutionResults';
import ConfigurationDetails from './components/ConfigurationDetails';
import ManagementInsights from './components/ManagementInsights';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rule Engine
          </Typography>
          <Button color="inherit" component={Link} to="/configuration">
            Configuration
          </Button>
          <Button color="inherit" component={Link} to="/rule-engine">
            Rule Engine
          </Button>
          <Button color="inherit" component={Link} to="/execution-results">
            Execution Results
          </Button>
          <Button color="inherit" component={Link} to="/configuration-details">
            Configuration Details
          </Button>
          <Button color="inherit" component={Link} to="/management-insights">
            Management Insights
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/rule-engine" element={<RuleEngine />} />
          <Route path="/execution-results" element={<ExecutionResults />} />
          <Route path="/configuration-details" element={<ConfigurationDetails />} />
          <Route path="/management-insights" element={<ManagementInsights />} />
          <Route path="/" element={<RuleEngine />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;