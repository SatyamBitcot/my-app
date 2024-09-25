import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'


const DeleteDialog = ({isDeleteDialogOpen,handleCloseDeleteDialog,handleConfirmDelete}) => {
  return (
    <div>
       <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}  className='delete-cancel'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className='deleteBtn' >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteDialog
