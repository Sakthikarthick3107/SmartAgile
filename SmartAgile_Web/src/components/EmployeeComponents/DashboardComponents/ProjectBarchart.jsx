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
      label:"Projects Completed",
      data: [2,3,2,4,1,3],
      backgroundColor:'#98E392'

    },
    {
      label:"Tasks Completed",
      data: [5,6,4,3,2,1],
      backgroundColor:'#76CBDE'
    }

  ]
}

const ProjectBarchart = () => {
  return (
    <div>
       
        <h1>Performance</h1>  
        <div className='w-[800px] h-[400px]'> 
            <Bar data={data} className='bargraph'/>
        </div>
        
        
    </div>
  )
}

export default ProjectBarchart;
