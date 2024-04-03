import React from 'react'
import {Bar} from "react-chartjs-2";

import{Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip} from 'chart.js'
Chart.register(
  LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
)
const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']


const data = {
  labels,
  datasets: [
    {
      label:"Projects Assigned",
      data: [3,1,2,3,3,4,2,5,1,5,2,3],
      backgroundColor:'#F58319'

    },
    {
      label:"Projects Completed",
      data: [2,1,1,2,2,3,2,4,0,2,1,2],
      backgroundColor:'#608CCE'
    }

  ]
}

const BarChart = () => {
  return (
    <div>
        <div className='w-[60%] mx-[10px]' >
        <h1 className='text-center' >Organization Performance</h1>   
        <Bar  data={data} className='bargraph'/>
    
    </div>
      
    </div>
  )
}

export default BarChart
