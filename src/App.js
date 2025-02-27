import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ProcessControl from './components/ProcessControl';
import Dashboard from './components/Dashboard';
import ProcessWorkflow from './components/ProcessWorkflow';
import ConfiguredRules from './components/ConfiguredRules';
import BatchStatus from './components/BatchStatus';
import RecordsPage from './components/RecordsPage';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rule Engine
          </Typography>
          <Button color="inherit" component={Link} to="/process-control">
            Process Control
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/process-workflow">
            Process Workflow
          </Button>
          <Button color="inherit" component={Link} to="/configured-rules">
            Configured Rules
          </Button>
          <Button color="inherit" component={Link} to="/batch-status">
            Batch Status
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/process-control" element={<ProcessControl />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/process-workflow" element={<ProcessWorkflow />} />
          <Route path="/configured-rules" element={<ConfiguredRules />} />
          <Route path="/batch-status" element={<BatchStatus />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/" element={<ProcessControl />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;