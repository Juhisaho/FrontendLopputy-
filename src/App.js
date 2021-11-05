import React, { useState } from 'react'
import Customers from './components/Customers';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';




function App() {

  const [show, setShow] = useState('one')

  const handleChange = (e, value) => {
      setShow(value)
  }

  

    return (

    <div className="App">
      <Box sx={{ width: '100%' }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        
        <Toolbar centered>
          <Typography variant="h6" component="div" color ='white' sx={{ flexGrow: 1 }}>
            Personal trainer           
          </Typography>
          <Tabs value={show} onChange={handleChange} centered textColor="secondary" >
              <Tab label="Customers" value="one" />
              <Tab label="Trainings" value="two" />
              <Tab label="Calendar"  value="three" />
              <Tab label="Statistics" value="four" />
            </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
    {show === "one" && <Customers />}
    {show === "two" && <Trainings />}
    {show === "three" && <Calendar />}
    {show === "four" && <Statistics />}
    </div>
  );
}
  


export default App;