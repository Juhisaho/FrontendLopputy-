import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {

    const [customer] = useState(props.customer)
    const [training, setTraining] = useState({customer: customer.links[0].href})
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false)
    }

    const handleChange = (e) => {
        setTraining({...training, [e.target.id]: e.target.value})
    }

    const handleAdd = () => {
        props.addTraining(training);
       
    }

    return (
        <>
        <Button onClick={handleClickOpen} startIcon={<AddIcon />}></Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Training for {customer.firstname} {customer.lastname}</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="date"
                type="datetime-local"
                fullWidth
                variant="standard"
            />
            
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="duration"
                label="Duration"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="activity"
                label="Activity"
                type="text"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
            <Button onClick={handleAdd} variant="outlined">Add</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}