import React, { useEffect, useRef, useState } from "react";
import {AgGridReact} from 'ag-grid-react';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import { CSVLink } from 'react-csv';
import { CircularProgress, Paper} from '@material-ui/core';

export default function Customers() {

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
    const gridRef = useRef()
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    }


    const editStarts = () => {
        setCustomer(gridRef.current.getSelectedNodes()[0].data)
    }

    useEffect(() => fetchCustomers(), [])

    const fetchCustomers = () => {
        setLoading(true)
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
        setLoading(false)
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then( () => fetchCustomers())
        .then(_=> {
                setMsg('Customer added')
                setOpen(true)
                
            })
        .catch(err => console.error(err))
    }

    const editCustomer = () => {
        fetch(customer.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(() => fetchCustomers())
        .then(_=> {
                setMsg('Customer edited')
                setOpen(true)
                
            })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (customerUrl) => {
        if (window.confirm('Are you sure?')) {
            fetch(customerUrl, {
                method: 'DELETE'
            })
            .then(() => fetchCustomers())
            .then(_=> {
                setMsg('Customer deleted')
                setOpen(true)
                
            })
            .catch(err => console.error(err))
        }
    }

    const addTrainingToCustomer = (training) => {
        console.log(JSON.stringify(training))
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers()
                setMsg('Training added')
                setOpen(true)
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'lastname', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'streetaddress', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'postcode', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'city', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'email', filter: true, sortable: true, floatingFilter: true, editable: true},
        {field: 'phone', filter: true, sortable: true, floatingFilter: true, editable: true},        
        {
            width: 60,
            cellRendererFramework: params => <AddTraining addTraining={addTrainingToCustomer} customer={params.data} />
        },
        {
            width: 60,
            cellRendererFramework: params => <Button onClick={() => deleteCustomer(params.data.links[0].href)} startIcon={<DeleteIcon color="error"/>}></Button>
        }

    ]

    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "streetaddress" },
        { label: "First Name", key: "postcode" },
        { label: "Last Name", key: "city" },
        { label: "Email", key: "email" },
         { label: "Phone", key: "phone" },
    ]
    if (loading) return <Paper style={{padding: '1em'}}><div>Loading customers <CircularProgress /></div></Paper>
    else
    return (
        <>
        <div className="ag-theme-material" style={{height: 660, width: 'auto', margin: 10}}>
           <AgGridReact
               rowData={customers}
               columnDefs={columns}
               pagination={true}
               paginationPageSize={10}
               suppressCellSelection={true}
               animateRows={true}
               onGridReady={params => gridRef.current = params.api}
               rowSelection="single"
               onCellEditingStarted={editStarts}
               onCellEditingStopped={editCustomer}>               
           </AgGridReact>
           <AddCustomer  addCustomer={addCustomer}/>
           <CSVLink data={customers} headers ={headers}>CSV EXPORT</CSVLink>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
        />
        </>
    )
}