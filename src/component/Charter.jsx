import React from 'react';
import './Charter.scss';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'



export const Charter = ({chartData}) => {

  return (
    <div className='charter'> 
      <Line 
        data={chartData}
        />
    </div>
  )
}

