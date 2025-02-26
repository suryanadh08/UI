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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';

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
    </Box>
  );
};

export default ExceptionWorkflow;
