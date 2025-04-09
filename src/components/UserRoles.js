import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
} from '@mui/material';

const UserRoles = ({ processId }) => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Investigator', description: 'Handles investigations' },
    { id: 2, name: 'Checker', description: 'Reviews investigations' },
    { id: 3, name: 'Approver', description: 'Approves or rejects requests' },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const handleAddRole = () => {
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    setOpenModal(false);
    setNewRole({ name: '', description: '' });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">User Roles for Process {processId}</Typography>
      <Paper sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => setOpenModal(true)}>
        Add Role
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add New Role
          </Typography>
          <TextField
            fullWidth
            label="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleAddRole}>
            Add Role
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserRoles;
