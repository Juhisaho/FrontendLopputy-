import React, {useState, useEffect} from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { format } from 'date-fns'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



export default function TrainingCalendar() {

    const [trainings, setTrainings] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))

    }


    const data = trainings.map(event => (
        {
            startDate: new Date(event.date),
            endDate: moment(event.date).add(event.duration, "minutes").toDate(),
            title: event.customer.firstname + " " + event.customer.lastname + " , " + event.activity
        }
    ))

    return(
        <div>
            <Paper>
                <Scheduler
                    data={data}
                >
                    <ViewState
                        defaultCurrentDate={currentDate}
                    />
                    <MonthView />
                    <WeekView />
                    <DayView />
                    <Toolbar />
                    <DateNavigator />
                    <ViewSwitcher />
                    <TodayButton />
                    <Appointments />
                </Scheduler> 
            </Paper>
        </div>
    )
}