import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import { Task } from '../../screens/Supervisor/SupervisorTaskView'
import TaskListCard from './TaskListCard'

const CompletedScreen = ({tasks} : {tasks : Task[]}) => {
  return (
    <View>
      {tasks.filter((item)=>item.status==='Completed').map((task,index) =>(
          <TaskListCard  task={task} key={index}/>
        ))}
    </View>
  )
}

export default CompletedScreen

const styles = StyleSheet.create({})