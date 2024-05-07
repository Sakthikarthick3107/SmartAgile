import React from 'react'
import { Doughnut } from 'react-chartjs-2'

// import Chart from 'chart.js/auto'
import{Chart,ArcElement,Tooltip} from 'chart.js'
Chart.register(
  ArcElement,Tooltip
)


const Doughnet = () => {

    const data = {
        labels: ['UI Design','Templatw Creation','Design Mapping'],
        datasets:[{
            label:'Time',
            data:[5,3,2],
            backgroundColor:['#6767FA','#994C9F','#D8AD59']
        }]
    }



  return (
    <div>
      <div style={{width:'300px',height:'300px'}}>
        <h1>Track Time</h1>
        <Doughnut
            data = {data}
            // options={options}
        ></Doughnut>
      </div>
    </div>
  )
}

export default Doughnet
