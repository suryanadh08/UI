import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LineChartWidget from './widgets/LineChartWidget';
import BarChartWidget from './widgets/BarChartWidget';
import KPIWidget from './widgets/KPIWidget';
import PieChartWidget from './widgets/PieChartWidget';
import TableWidget from './widgets/TableWidget';

const ItemTypes = {
  WIDGET: 'widget',
};

const dataPoints = {
  'Execution Data 1': [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
  ],
  'Execution Data 2': [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ],
  'Execution Data 3': [
    { name: 'John Doe', age: 30, balance: 1000 },
    { name: 'Jane Smith', age: 25, balance: 2000 },
    { name: 'Sam Johnson', age: 35, balance: 1500 },
  ],
};

const DraggableWidget = ({ widget, index, moveWidget, removeWidget }) => {
  const [, ref] = useDrag({
    type: ItemTypes.WIDGET,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveWidget(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Grid item xs={12} md={6} lg={4} ref={(node) => ref(drop(node))}>
      <Paper sx={{ padding: 2, position: 'relative' }}>
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={() => removeWidget(index)}
        >
          <DeleteIcon />
        </IconButton>
        {widget.type === 'line' && <LineChartWidget data={widget.data} />}
        {widget.type === 'bar' && <BarChartWidget data={widget.data} />}
        {widget.type === 'kpi' && <KPIWidget data={Array.isArray(widget.data) ? widget.data.length : 0} />}
        {widget.type === 'pie' && <PieChartWidget data={widget.data} />}
        {widget.type === 'table' && <TableWidget data={widget.data} />}
      </Paper>
    </Grid>
  );
};

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState('');

  const handleAddWidget = (type) => {
    setWidgets([...widgets, { id: `widget-${widgets.length + 1}`, type, data: dataPoints[selectedData] }]);
    setOpenModal(false);
    setSelectedData('');
  };

  const handleRemoveWidget = (index) => {
    const newWidgets = widgets.filter((_, i) => i !== index);
    setWidgets(newWidgets);
  };

  const moveWidget = (fromIndex, toIndex) => {
    const newWidgets = Array.from(widgets);
    const [movedWidget] = newWidgets.splice(fromIndex, 1);
    newWidgets.splice(toIndex, 0, movedWidget);
    setWidgets(newWidgets);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Add Widget
        </Button>
        <Grid container spacing={2}>
          {widgets.map((widget, index) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              index={index}
              moveWidget={moveWidget}
              removeWidget={handleRemoveWidget}
            />
          ))}
        </Grid>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select Widget Type
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Select Data Point</InputLabel>
              <Select value={selectedData} onChange={(e) => setSelectedData(e.target.value)}>
                {Object.keys(dataPoints).map((dataPoint, index) => (
                  <MenuItem key={index} value={dataPoint}>
                    {dataPoint}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => handleAddWidget('line')} sx={{ marginRight: 2 }}>
              Line Chart
            </Button>
            <Button variant="contained" onClick={() => handleAddWidget('bar')} sx={{ marginRight: 2 }}>
              Bar Chart
            </Button>
            <Button variant="contained" onClick={() => handleAddWidget('kpi')} sx={{ marginRight: 2 }}>
              KPI
            </Button>
            <Button variant="contained" onClick={() => handleAddWidget('pie')} sx={{ marginRight: 2 }}>
              Pie Chart
            </Button>
            <Button variant="contained" onClick={() => handleAddWidget('table')}>
              Table
            </Button>
          </Box>
        </Modal>
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
