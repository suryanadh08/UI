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

const UserRoles = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group A', description: 'Investigators Group' },
    { id: 2, name: 'Group B', description: 'Approvers Group' },
  ]);
  const [roles, setRoles] = useState([
    { id: 1, name: 'Investigator', description: 'Handles investigations' },
    { id: 2, name: 'Checker', description: 'Reviews investigations' },
    { id: 3, name: 'Approver', description: 'Approves or rejects requests' },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  const handleAddGroup = () => {
    setGroups([...groups, { id: groups.length + 1, ...newGroup }]);
    setOpenModal(false);
    setNewGroup({ name: '', description: '' });
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">User Groups and Roles</Typography>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">User Groups</Typography>
        <Paper sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => setOpenModal(true)}>
          Add Group
        </Button>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Roles</Typography>
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
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add New Group
          </Typography>
          <TextField
            fullWidth
            label="Group Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleAddGroup}>
            Add Group
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserRoles;
