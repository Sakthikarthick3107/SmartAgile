import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Task } from '../../screens/Supervisor/SupervisorTaskView'
import Colors from '../../styles/Colors'
import GlobalStyles from '../../styles/GlobalStyle'



const TaskListCard = ({task} :{task: Task}) => {
  return (
    <TouchableOpacity style={styles.taskContainer}>
      <View style={GlobalStyles.rowBetween}>
        <Text style={styles.taskTitle}>{task.task_name}</Text>
        <Text style={styles.priorityChip}>{task.task_priority} </Text>
        {/* <Text style={GlobalStyles.smallText}>{task.task_deadline} </Text> */}
      </View>
      
      <Text style={GlobalStyles.smallText}>{task.task_desc}</Text>
    </TouchableOpacity>
  )
}

export default TaskListCard

const styles = StyleSheet.create({
    taskContainer :{
        width : '100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:Colors.White,
        marginVertical:6,
        elevation:2,
        padding:8,
        borderRadius:5
    },
    taskTitle:{
        fontSize:16,
        fontFamily:'Poppins-Medium',
        color:Colors.text
    },
    priorityChip:{
        paddingHorizontal:6,
        backgroundColor:Colors.background,
        color:Colors.text,
        borderRadius:50,
        fontSize:12
    }
})