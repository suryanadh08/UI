import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const RecordsPage = () => {
  const location = useLocation();
  const { process, rule } = location.state;
  const [showAllRecords, setShowAllRecords] = useState(false);

  const handleToggleRecords = () => {
    setShowAllRecords(!showAllRecords);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">{process.name} - {rule.name}</Typography>
      <FormControlLabel
        control={<Switch checked={showAllRecords} onChange={handleToggleRecords} />}
        label="Show All Records"
      />
      <Box sx={{ marginTop: 2 }}>
        {(showAllRecords ? rule.allRecords : rule.failedRecords).map((record) => (
          <Paper key={record.id} sx={{ padding: 1, marginBottom: 1 }}>
            {record.data}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default RecordsPage;
