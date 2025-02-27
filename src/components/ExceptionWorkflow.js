import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ExceptionWorkflow = () => {
  const [failedBatches, setFailedBatches] = useState([
    { id: 1, name: 'Batch 1' },
    { id: 2, name: 'Batch 2' },
  ]);
  const [exceptions, setExceptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedException, setSelectedException] = useState(null);
  const [expandedProcessIndex, setExpandedProcessIndex] = useState(null);
  const [showAllRecords, setShowAllRecords] = useState(false);

  const processes = [
    {
      name: 'Process 1',
      businessRules: [
        { name: 'Business Rule 1', failedRecords: [{ id: 1, data: 'Record 1' }, { id: 2, data: 'Record 2' }], allRecords: [{ id: 1, data: 'Record 1' }, { id: 2, data: 'Record 2' }, { id: 3, data: 'Record 3' }] },
        { name: 'Business Rule 2', failedRecords: [{ id: 3, data: 'Record 3' }], allRecords: [{ id: 3, data: 'Record 3' }, { id: 4, data: 'Record 4' }] },
      ],
    },
    {
      name: 'Process 2',
      businessRules: [
        { name: 'Business Rule 3', failedRecords: [{ id: 5, data: 'Record 5' }], allRecords: [{ id: 5, data: 'Record 5' }, { id: 6, data: 'Record 6' }] },
      ],
    },
  ];

  const handleAddAttachment = (event) => {
    const file = event.target.files[0];
    setAttachments([...attachments, file]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleSubmitException = () => {
    const newException = {
      id: exceptions.length + 1,
      batch: selectedBatch,
      remarks,
      attachments,
      status: 'Pending Approval',
    };
    setExceptions([...exceptions, newException]);
    setOpenModal(false);
    setSelectedBatch('');
    setRemarks('');
    setAttachments([]);
  };

  const handleExceptionClick = (exception) => {
    setSelectedException(exception);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedException(null);
  };

  const handleExpandProcess = (index) => {
    setExpandedProcessIndex(expandedProcessIndex === index ? null : index);
  };

  const handleToggleRecords = () => {
    setShowAllRecords(!showAllRecords);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exception Workflow
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
        Trigger Exception
      </Button>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Submitted Exceptions</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Batch</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exceptions.map((exception) => (
              <TableRow key={exception.id}>
                <TableCell>{exception.batch}</TableCell>
                <TableCell>{exception.remarks}</TableCell>
                <TableCell>{exception.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleExceptionClick(exception)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Trigger Exception
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Select Batch</InputLabel>
            <Select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
              {failedBatches.map((batch) => (
                <MenuItem key={batch.id} value={batch.name}>
                  {batch.name}
                </MenuItem>
              ))}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Exception Details</DialogTitle>
        <DialogContent>
          {selectedException && (
            <Box>
              <Typography variant="subtitle1">Batch: {selectedException.batch}</Typography>
              <Typography variant="subtitle1">Remarks: {selectedException.remarks}</Typography>
              <Typography variant="subtitle1">Status: {selectedException.status}</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="subtitle1">Attachments:</Typography>
                {selectedException.attachments.map((file, index) => (
                  <Paper key={index} sx={{ display: 'flex', alignItems: 'center', padding: 1, marginBottom: 1 }}>
                    <Typography sx={{ flexGrow: 1 }}>{file.name}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Exception Workflow</Typography>
        {processes.map((process, processIndex) => (
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
                        <Paper key={record.id} sx={{ padding: 1, marginBottom: 1 }}>
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
    </Box>
  );
};

export default ExceptionWorkflow;
