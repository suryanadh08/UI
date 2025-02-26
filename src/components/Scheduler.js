import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const Scheduler = ({ schedulerConfig, setSchedulerConfig }) => {
  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Specific Date', 'Custom'];
  const times = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const customRecurrenceOptions = [
    'First Business Day of the Month',
    'Last Business Day of the Month',
    'Nth Business Day of the Month',
    'First Day of the Month',
    'Last Day of the Month',
    'First Monday of the Month',
    'Last Friday of the Month',
    'Nth Occurrence of a Weekday',
  ];

  const handleFrequencyChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, frequency: event.target.value });
  };

  const handleTimeChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, time: event.target.value });
  };

  const handleDateChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, date: event.target.value });
  };

  const handleDayOfWeekChange = (event) => {
    const newDaysOfWeek = schedulerConfig.daysOfWeek || [];
    if (event.target.checked) {
      newDaysOfWeek.push(event.target.value);
    } else {
      const index = newDaysOfWeek.indexOf(event.target.value);
      if (index > -1) {
        newDaysOfWeek.splice(index, 1);
      }
    }
    setSchedulerConfig({ ...schedulerConfig, daysOfWeek: newDaysOfWeek });
  };

  const handleDayOfMonthChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, dayOfMonth: event.target.value });
  };

  const handleCustomRecurrenceChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, customRecurrence: event.target.value });
  };

  const handleBusinessDayAdjustmentChange = (event) => {
    setSchedulerConfig({ ...schedulerConfig, adjustForBusinessDays: event.target.checked });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Schedule Your Rule</Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>How Often?</InputLabel>
        <Select value={schedulerConfig.frequency || ''} onChange={handleFrequencyChange}>
          {frequencies.map((frequency) => (
            <MenuItem key={frequency} value={frequency}>
              {frequency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {schedulerConfig.frequency === 'Specific Date' && (
        <TextField
          fullWidth
          label="Select Date"
          type="date"
          value={schedulerConfig.date || ''}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginBottom: 2 }}
        />
      )}
      {schedulerConfig.frequency === 'Weekly' && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">Select Days of the Week</Typography>
          {daysOfWeek.map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  value={day}
                  checked={schedulerConfig.daysOfWeek?.includes(day) || false}
                  onChange={handleDayOfWeekChange}
                />
              }
              label={day}
            />
          ))}
        </Box>
      )}
      {schedulerConfig.frequency === 'Monthly' && (
        <TextField
          fullWidth
          label="Day of the Month"
          type="number"
          value={schedulerConfig.dayOfMonth || ''}
          onChange={handleDayOfMonthChange}
          InputProps={{ inputProps: { min: 1, max: 31 } }}
          sx={{ marginBottom: 2 }}
        />
      )}
      {schedulerConfig.frequency === 'Custom' && (
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Custom Recurrence</InputLabel>
            <Select value={schedulerConfig.customRecurrence || ''} onChange={handleCustomRecurrenceChange}>
              {customRecurrenceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {schedulerConfig.customRecurrence === 'Nth Business Day of the Month' && (
            <TextField
              fullWidth
              label="Which Business Day? (e.g., 3 for 3rd business day)"
              type="number"
              value={schedulerConfig.nthBusinessDay || ''}
              onChange={(e) => setSchedulerConfig({ ...schedulerConfig, nthBusinessDay: e.target.value })}
              InputProps={{ inputProps: { min: 1, max: 31 } }}
              sx={{ marginBottom: 2 }}
            />
          )}
          {schedulerConfig.customRecurrence === 'Nth Occurrence of a Weekday' && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <TextField
                label="Which Occurrence? (e.g., 2 for 2nd)"
                type="number"
                value={schedulerConfig.nthOccurrence || ''}
                onChange={(e) => setSchedulerConfig({ ...schedulerConfig, nthOccurrence: e.target.value })}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                sx={{ marginRight: 2 }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Select Weekday</InputLabel>
                <Select value={schedulerConfig.weekday || ''} onChange={(e) => setSchedulerConfig({ ...schedulerConfig, weekday: e.target.value })}>
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={schedulerConfig.adjustForBusinessDays || false}
                onChange={handleBusinessDayAdjustmentChange}
              />
            }
            label="Adjust for Holidays and Weekends"
          />
        </Box>
      )}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Time</InputLabel>
        <Select value={schedulerConfig.time || ''} onChange={handleTimeChange}>
          {times.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={() => console.log('Scheduler Config:', schedulerConfig)}>
        Save Schedule
      </Button>
    </Box>
  );
};

export default Scheduler;
