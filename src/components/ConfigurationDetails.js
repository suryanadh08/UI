import React from 'react';
import { Box, Typography } from '@mui/material';

const ConfigurationDetails = () => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Configuration Details</Typography>
      <Typography variant="body1">This page shows the details of your rule engine configurations.</Typography>
    </Box>
  );
};

export default ConfigurationDetails;
