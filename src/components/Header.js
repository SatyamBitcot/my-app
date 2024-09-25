'use client';
import React, { useState } from 'react';
import { Tooltip } from '@mui/material';

import AddTodoDialog from './AddTodo';

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
 

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  
  return (
    <div  className='header'>
      
      <Tooltip title='Add Todo'>     
         <button className="btn btn-primary  ms-5 headerAddTodoBtn" onClick={handleClickOpenDialog} >Add Todo</button>
         </Tooltip>

      <AddTodoDialog open={dialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default Header;
