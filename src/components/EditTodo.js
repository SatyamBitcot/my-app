import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditTodoDialog = ({ open, onClose, task, onEditTodo }) => {
  const [todoText, setTodoText] = useState(task.text);
  const [todoDescription, setTodoDescription] = useState(task.description);
  const [creationDate, setCreationDate] = useState(task.creationDate);

  const handleTextChange = (e) => setTodoText(e.target.value);
  const handleDescriptionChange = (e) => setTodoDescription(e.target.value);
  const handleCreationDateChange = (e) => setCreationDate(e.target.value);

  const handleEditTodo = () => {
    onEditTodo({
      id: task.id,
      newText: todoText,
      newDescription: todoDescription,
      newCreationDate: creationDate,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Todo"
          fullWidth
          value={todoText}
          onChange={handleTextChange}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={todoDescription}
          onChange={handleDescriptionChange}
        />
        <TextField
          margin="dense"
          label="Creation Date"
          type="date"
          fullWidth
          value={creationDate}
          onChange={handleCreationDateChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  className='edit-cancel'>Cancel</Button>
        <Button onClick={handleEditTodo}  className='edit-save'>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
