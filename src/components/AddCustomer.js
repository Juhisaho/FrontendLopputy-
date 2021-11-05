import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({})
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setCustomer({...customer, [e.target.id]: e.target.value})
    }

    const handleAddClick = () => {
        props.addCustomer(customer)
        handleClose()
    }

    return (
        <>
        <div style= {{ textAlign: 'center', marginTop: 20 }}>
        <Button style={{ margin: 'auto'}} variant="outlined" onClick={handleClickOpen}>Add Customer</Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent>
            <TextField
                onChange={handleChange}
                autoFocus
                margin="dense"
                id="firstname"
                label="Firstname"
                type="text"
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="lastname"
                label="Lastname"
                type="text"
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="streetaddress"
                label="Street"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="postcode"
                label="Postcode"
                type="text"
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="city"
                label="City"
                type="text"
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                id="phone"
                label="Phone"
                type="text"
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
            <Button onClick={handleAddClick} variant="outlined">Add</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}