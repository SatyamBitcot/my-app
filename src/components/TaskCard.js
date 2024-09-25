'use client';
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, Star, StarBorder } from "@mui/icons-material";
import DeleteDialog from "./DeleteDIalog";


const TaskCard = ({
  task,
  onToggleComplete,
  onToggleImportant,
  onDelete,
  onEdit,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleOpenViewDialog=()=>{
    setIsViewDialogOpen(true)
  }

  const handleCloseViewDialog=()=>{
    debugger;
    console.log("hslkfjlksajdf")
    setIsViewDialogOpen(false)
  }
  console.log(isViewDialogOpen)

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    handleCloseDeleteDialog();
  };

  const getBorderStyle = () => {
    if (task.completed) {
      return "4px solid green";
    } else if (task.important) {
      return "5px solid yellow";
    } else if (!task.important) {
      return "5px solid red";
    }
    return "none";
  };

  return (
    <div>
      <Card
        sx={{ marginBottom: 2 }}
      
        style={{
          backgroundColor: "#B0EBB4",
           height:'250px',
           width:'300px',
           flexWrap:'wrap',
           display:'flex',

          borderRight: getBorderStyle(),
          
        }}
        onClick={()=>handleOpenViewDialog()}
      >
        <CardContent>
          <Typography variant="h4" component="div" >
            {task.text
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </Typography>
          <Typography variant="body2" style={{color:'#0079FF'}}>
            Description: {task.description}
          </Typography>
          <Typography variant="caption" style={{color:'#77037B'}}>
            Creation Date: {task.creationDate}
          </Typography>
          <br />
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            color="primary"
          />
          Completed
          <Tooltip title="important">
            <IconButton onClick={() => onToggleImportant(task.id)}>
              {task.important ? <Star color="warning" /> : <StarBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleOpenDeleteDialog}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(task)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </CardContent>

        <DeleteDialog
          isDeleteDialogOpen={isDeleteDialogOpen}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          handleConfirmDelete={handleConfirmDelete}
        />

       
      </Card>
    </div>
  );
};

export default TaskCard;
