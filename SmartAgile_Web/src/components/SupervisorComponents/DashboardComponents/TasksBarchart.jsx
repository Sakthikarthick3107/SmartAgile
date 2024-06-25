import React from 'react'
import { Bar } from 'react-chartjs-2';
import{Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip} from 'chart.js'
Chart.register(
  LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
)
const labels = ['Jan','Feb','Mar','Apr','May','Jun']


const data = {
  labels,
  datasets: [
    {
      label:"Tasks assigned",
      data: [15,12,18,20,10,17],
      backgroundColor:'#98E392'

    },
    {
      label:"Tasks Completed",
      data: [10,7,15,10,19,12],
      backgroundColor:'#76CBDE'
    }

  ]
}

const TasksBarchart = () => {
  return (
    <div>
       
        <h1>Performance</h1>  
        <div className='w-[800px] h-[400px]'> 
            <Bar data={data} className='bargraph'/>
        </div>
        
        
    </div>
  )
}

export default TasksBarchart;
