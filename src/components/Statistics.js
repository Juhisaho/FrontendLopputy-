import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import _ from 'lodash';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



export default function Statistics() {

   
    const [trainings, setTrainings] = useState([])
    

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }
    


    const data = _(trainings).groupBy('activity').map((trainingData, key) => ({
        'activity': key,
        'duration': _.sumBy(trainingData, 'duration')
    })).value();

    return(
        <div style={{height: "400px"}}>
            <Paper>
                <h2>Training statistics sports per minutes</h2>
                <Chart palette="Soft" data={data} >
                    <ArgumentAxis  />
                    <ValueAxis   />
                    <BarSeries valueField="duration" argumentField="activity" />
                </Chart>
            </Paper>
        </div>
    )
}