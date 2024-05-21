import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Task } from '../../screens/Supervisor/SupervisorTaskView'
import Colors from '../../styles/Colors'
import GlobalStyles from '../../styles/GlobalStyle'
import PriorityColor from '../../styles/PriorityColor'



const TaskListCard = ({task} :{task: Task}) => {
  return (
    <TouchableOpacity style={styles.taskContainer}>
      <View style={GlobalStyles.rowBetween}>
        <Text style={styles.taskTitle }>{task.task_name}</Text>
        <Text style={[styles.priorityChip , {backgroundColor : PriorityColor[task.task_priority]}]}>{task.task_priority} </Text>
        {/* <Text style={GlobalStyles.smallText}>{task.task_deadline} </Text> */}
      </View>
      <Text style={[GlobalStyles.smallText,{padding:4}]}>{task.assigned_to.username}</Text>
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
        //paddingVertical:8,
        borderRadius:5
    },
    taskTitle:{
        fontSize:14,
        fontFamily:'Poppins-Medium',
        color:Colors.text,
        padding:4
    },
    priorityChip:{
        //paddingHorizontal:6,
        color:Colors.White,
        fontSize:12,
        paddingHorizontal: 12,
        borderTopLeftRadius:5,
        //borderBottomRightRadius: 50,
        borderBottomLeftRadius:50,
        borderTopRightRadius: 5,
        shadowColor: '#000',
        elevation: 10,
        //position:'absolute',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        transform: [{ skewX: '-10deg' }]
    }
})