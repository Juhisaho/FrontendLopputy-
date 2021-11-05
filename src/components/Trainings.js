import React, { useEffect, useState } from "react";
import {AgGridReact} from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { format } from 'date-fns'
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, Paper} from '@material-ui/core';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Trainings() {


    const [trainings, setTrainings] = useState([])

    useEffect(() => fetchTrainings(), [])

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
  
      setOpen(false)
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      )

    const fetchTrainings = () => {
        setLoading(true)
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        setLoading(false)
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, {
            method: 'DELETE'
        })
        .then(() => fetchTrainings())
            .then(_=> {
                setMsg('Customer deleted')
                setOpen(true)
                
            })
        
        .catch(err => console.error(err))
    }}

   

    const columns = [
        {headerName: 'Customer', field: 'fullname', valueGetter(params) {
            return params.data.customer.firstname + ' ' + params.data.customer.lastname;
        },sortable: true, filter: true},
        { field: 'date',  cellRenderer: (params) => { return format(new Date(params.data.date), 'dd/MM/yyyy HH:mm');}, sortable: true, filter: true},
       { field: 'activity', sortable: true, filter: true},
       { field: 'duration', sortable: true, filter: true},
       
    
        {
            width: 60,
            cellRendererFramework: params => <Button onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)} startIcon={<DeleteIcon color="error" />}/>
        }
    ]
    if (loading) return <Paper style={{padding: '1em'}}><div>Loading customers <CircularProgress /></div></Paper>
    else
      return (
        <>
        <div className="ag-theme-material" style={{height: 660, width: 900, margin: 'auto', marginTop: 20}}>
           <AgGridReact 
                rowData={trainings}
                columnDefs={columns}
           />
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        action={action}
        />
        </>
        
    )
}