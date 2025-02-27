import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProcessWorkflow = () => {
  const [expandedProcessIndex, setExpandedProcessIndex] = useState(null);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBusinessRules, setSelectedBusinessRules] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [currentRule, setCurrentRule] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const processes = [
    {
      name: 'Process 1',
      status: 'Completed',
      businessRules: [
        { name: 'Business Rule 1', failedRecords: [], allRecords: [{ id: 1, data: 'Record 1' }, { id: 2, data: 'Record 2' }, { id: 3, data: 'Record 3' }] },
        { name: 'Business Rule 2', failedRecords: [], allRecords: [{ id: 3, data: 'Record 3' }, { id: 4, data: 'Record 4' }] },
      ],
    },
    {
      name: 'Process 2',
      status: 'Pending Investigation',
      businessRules: [
        { name: 'Business Rule 3', failedRecords: [{ id: 5, data: 'Record 5' }], allRecords: [{ id: 5, data: 'Record 5' }, { id: 6, data: 'Record 6' }] },
        { name: 'Business Rule 4', failedRecords: [{ id: 7, data: 'Record 7' }], allRecords: [{ id: 7, data: 'Record 7' }, { id: 8, data: 'Record 8' }] },
      ],
    },
    {
      name: 'Process 3',
      status: 'Completed',
      businessRules: [
        { name: 'Business Rule 5', failedRecords: [], allRecords: [{ id: 9, data: 'Record 9' }, { id: 10, data: 'Record 10' }] },
      ],
    },
  ];

  const handleExpandProcess = (index) => {
    setExpandedProcessIndex(expandedProcessIndex === index ? null : index);
  };

  const handleToggleRecords = () => {
    setShowAllRecords(!showAllRecords);
  };

  const handleAddAttachment = (event) => {
    const file = event.target.files[0];
    setAttachments([...attachments, file]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleSubmitException = () => {
    // Trigger email logic here
    setOpenModal(false);
    setSelectedBusinessRules([]);
    setRemarks('');
    setAttachments([]);
  };

  const handleOpenModal = (process, rule) => {
    setCurrentProcess(process);
    setCurrentRule(rule);
    setSelectedBusinessRules([rule.name]);
    setOpenModal(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleViewRecords = (process, rule) => {
    navigate('/records', { state: { process, rule } });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Process Workflow</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Completed" />
        <Tab label="Pending Investigation" />
      </Tabs>
      {tabIndex === 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Completed Processes</Typography>
          {processes.filter((process) => process.status === 'Completed').map((process, processIndex) => (
            <Paper key={processIndex} sx={{ padding: 2, marginBottom: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{process.name}</Typography>
                <IconButton onClick={() => handleExpandProcess(processIndex)}>
                  {expandedProcessIndex === processIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              {expandedProcessIndex === processIndex && (
                <Box sx={{ marginTop: 2 }}>
                  {process.businessRules.map((rule, ruleIndex) => (
                    <Paper key={ruleIndex} sx={{ padding: 2, marginBottom: 2 }}>
                      <Typography variant="subtitle1">{rule.name}</Typography>
                      <FormControlLabel
                        control={<Switch checked={showAllRecords} onChange={handleToggleRecords} />}
                        label="Show All Records"
                      />
                      <Box sx={{ marginTop: 2 }}>
                        {(showAllRecords ? rule.allRecords : rule.failedRecords).map((record) => (
                          <Paper key={record.id} sx={{ padding: 1, marginBottom: 1 }} onClick={() => handleViewRecords(process, rule)}>
                            {record.data}
                          </Paper>
                        ))}
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Pending Investigation</Typography>
          {processes.filter((process) => process.status === 'Pending Investigation').map((process, processIndex) => (
            <Paper key={processIndex} sx={{ padding: 2, marginBottom: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{process.name}</Typography>
                <IconButton onClick={() => handleExpandProcess(processIndex)}>
                  {expandedProcessIndex === processIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              {expandedProcessIndex === processIndex && (
                <Box sx={{ marginTop: 2 }}>
                  {process.businessRules.map((rule, ruleIndex) => (
                    <Paper key={ruleIndex} sx={{ padding: 2, marginBottom: 2 }}>
                      <Typography variant="subtitle1">{rule.name}</Typography>
                      <FormControlLabel
                        control={<Switch checked={showAllRecords} onChange={handleToggleRecords} />}
                        label="Show All Records"
                      />
                      <Box sx={{ marginTop: 2 }}>
                        {(showAllRecords ? rule.allRecords : rule.failedRecords).map((record) => (
                          <Paper key={record.id} sx={{ padding: 1, marginBottom: 1 }} onClick={() => handleViewRecords(process, rule)}>
                            {record.data}
                          </Paper>
                        ))}
                      </Box>
                      <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal(process.name, rule)}>
                        Trigger Exception
                      </Button>
                    </Paper>
                  ))}
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Trigger Exception
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select Business Rules</InputLabel>
            <Select
              multiple
              value={selectedBusinessRules}
              onChange={(e) => setSelectedBusinessRules(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
            >
              {processes.flatMap((process) =>
                process.businessRules.map((rule) => (
                  <MenuItem key={rule.name} value={rule.name}>
                    {rule.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Remarks"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label" startIcon={<AttachFileIcon />} sx={{ marginBottom: 2 }}>
            Attach File
            <input type="file" hidden onChange={handleAddAttachment} />
          </Button>
          <Box sx={{ marginBottom: 2 }}>
            {attachments.map((file, index) => (
              <Paper key={index} sx={{ display: 'flex', alignItems: 'center', padding: 1, marginBottom: 1 }}>
                <Typography sx={{ flexGrow: 1 }}>{file.name}</Typography>
                <IconButton size="small" onClick={() => handleRemoveAttachment(index)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Box>
          <Button variant="contained" onClick={handleSubmitException}>
            Submit Exception
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProcessWorkflow;
