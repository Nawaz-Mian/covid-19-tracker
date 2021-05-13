import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({ data: {  confirmed, recovered, deaths }, country }) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        const fetchApi = async () =>{
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    },[]);

    const lineChart = (
        dailyData.length
            ? (
            <Line 
                data = {{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Confirmed',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },{
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'rgba(84, 78, 77, 0.5)',
                        backgroundColor: 'rgba(84, 78, 77, 0.5)',
                        fill: true,
                    }]
                }}
            />) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Confirmed', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor:[
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(84, 78, 77, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />
        ): null
    );
    return (
        <div className={styles.container}>
            { country ? barChart : lineChart }
        </div>
    );
}

export default Charts;