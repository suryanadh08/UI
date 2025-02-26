import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import RuleEngine from './components/RuleEngine';
import ExecutionResults from './components/ExecutionResults';
import Dashboard from './components/Dashboard';
import ExceptionWorkflow from './components/ExceptionWorkflow';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rule Engine
          </Typography>
          <Button color="inherit" component={Link} to="/rule-engine">
            Rule Engine
          </Button>
          <Button color="inherit" component={Link} to="/execution-results">
            Execution Results
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/exception-workflow">
            Exception Workflow
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/rule-engine" element={<RuleEngine />} />
          <Route path="/execution-results" element={<ExecutionResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exception-workflow" element={<ExceptionWorkflow />} />
          <Route path="/" element={<RuleEngine />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;