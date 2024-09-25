'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/TodoSlice';  

const AddTodoDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  
  const [todoText, setTodoText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);  
  const [todoDescription, setTodoDescription] = useState('');
  const [creationDate, setCreationDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  // const handleCheckboxChange = (e) => {
  //   setIsCompleted(e.target.checked);
  // };

  const handleImportantChange = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleAddTodo = () => {
    
    if (!todoText.trim()) {
      setError('Text is required');
      return;
    }

   
    const newTodo = {
      text: todoText.trim(),
      completed: isCompleted,
      important: isImportant,
      description: todoDescription.trim(),
      creationDate,
    };

    
    dispatch(addTodo(newTodo));

    
    setTodoText('');
    setIsCompleted(false);
    setIsImportant(false);
    setTodoDescription('');
    setError('');
    
   
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Todo</DialogTitle>
      <DialogContent>
       
        <TextField
          autoFocus
          margin="dense"
          label="Todo"
          fullWidth
          value={todoText}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
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
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isImportant}
              onChange={handleImportantChange}
            />
          }
          label="Set as Important"
        />
      </DialogContent>
      
      
      <DialogActions>
        <Button onClick={onClose}  className='addTodo-cancel'>Cancel</Button>
        <Button onClick={handleAddTodo} className='addTodoBtn'  >Add Todo</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoDialog;
