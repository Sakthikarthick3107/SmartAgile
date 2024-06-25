import React from 'react'
import SDoughnet from '../../components/SupervisorComponents/DashboardComponents/SDoughnet'
import TasksBarchart from '../../components/SupervisorComponents/DashboardComponents/TasksBarchart'


export default function SDashboard() {
  return (
    <div>
      <TasksBarchart/>
      <SDoughnet/>
    </div>
  )
}
