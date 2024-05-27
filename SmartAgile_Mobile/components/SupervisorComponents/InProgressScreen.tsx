import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import TaskListCard from './TaskListCard'
import { Task } from '../../screens/Supervisor/SupervisorTaskView'

const InProgressScreen = ({tasks} : {tasks : Task[]}) => {
  return (
    <View>
      {tasks.filter((item)=>item.status==='Progress').map((task,index) =>(
          <TaskListCard  task={task} key={index}/>
        ))}
    </View>
  )
}

export default InProgressScreen

const styles = StyleSheet.create({})