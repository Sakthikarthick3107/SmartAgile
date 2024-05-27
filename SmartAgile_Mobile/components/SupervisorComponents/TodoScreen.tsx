import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import { Task } from '../../screens/Supervisor/SupervisorTaskView'
import TaskListCard from './TaskListCard'

const TodoScreen = ({tasks} : {tasks : Task[]}) => {
  return (
    <View style={styles.todo}>
      {tasks.filter((item)=>item.status==='Todo').map((task,index) =>(
          <TaskListCard  task={task} key={index}/>
        ))}
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
    todo:{
        backgroundColor:'transparent'
    }
})