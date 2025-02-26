import React from 'react';
import { Box, Typography } from '@mui/material';

const KPIWidget = ({ data }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Total Rules Executed</Typography>
      <Typography variant="h4">{data}</Typography>
    </Box>
  );
};

export default KPIWidget;
