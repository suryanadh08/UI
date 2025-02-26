import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ManagementInsights = () => {
  const [chartType, setChartType] = useState('');
  const [data, setData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleAddData = () => {
    setData([...data, { name: '', value: 0 }]);
  };

  const handleDataChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleChartConfigChange = (field, value) => {
    setChartConfig({ ...chartConfig, [field]: value });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Management Insights</Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select value={chartType} onChange={handleChartTypeChange}>
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
        </Select>
      </FormControl>
      {chartType && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">Chart Configuration</Typography>
          <TextField
            fullWidth
            label="Chart Title"
            value={chartConfig.title || ''}
            onChange={(e) => handleChartConfigChange('title', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleAddData}>
            Add Data Point
          </Button>
          {data.map((dataPoint, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <TextField
                label="Name"
                value={dataPoint.name}
                onChange={(e) => handleDataChange(index, 'name', e.target.value)}
                sx={{ marginRight: 2 }}
              />
              <TextField
                label="Value"
                type="number"
                value={dataPoint.value}
                onChange={(e) => handleDataChange(index, 'value', e.target.value)}
                sx={{ marginRight: 2 }}
              />
            </Box>
          ))}
        </Box>
      )}
      {chartType === 'line' && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {chartType === 'bar' && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {chartType === 'pie' && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default ManagementInsights;
