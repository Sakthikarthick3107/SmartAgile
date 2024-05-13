import { NativeModules, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors'
import { NavigationType } from '../../navigation/NavigationTypes'
import { baseUrl } from '../../env';
import { useFocusEffect } from '@react-navigation/native'
import TaskListCard from '../../components/SupervisorComponents/TaskListCard'
const ToastModule = NativeModules.ToastModule;


type Props = {
    navigation : NavigationType<'SupervisorTaskView'>,
    route :{
        params:{
            projId : number,
            projectName : string
        }
    }
}

export type Task = {
  task_id: number,
  task_name: string,
  task_deadline: string,
  task_priority: string,
  task_desc: string,
  created_at: string,
  project: number,
  assigned_to: number
}

const SupervisorTaskView : React.FC<Props> = ({navigation , route}) => {
    const {projId , projectName} = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const[tasks,setTasks] = useState<Task[] | []>([]);
    const[activePriority , setActivePriority] = useState<string>("");

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          //fetchProjects()
          setRefreshing(false);
        }, 2000);
      };


      const allTaskDetails = async() =>{
        try {
          const request_tasks = await fetch(`${baseUrl}/tasks/project/${projId}`);
          const task_response  = await request_tasks.json();
          setTasks(task_response);
          ToastModule.showToast(projectName)
        } catch (error) {
          ToastModule.showToast(error)
        }
        
      }

  useFocusEffect(
    useCallback(() =>{
      const onBackPress = () =>{
        //console.log('Enter');
        allTaskDetails()
      }
      navigation.addListener('focus' , onBackPress);

      return () =>{
        //console.log('Leave');
        navigation.removeListener('focus' , onBackPress);
      }
    },[])
  )
      
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.secondary]} 
          tintColor={Colors.secondary} />

    }
    contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}
    >

        <Text style={styles.projTitle}>{projectName}</Text>

        <View style={GlobalStyles.row}>
          <Text onPress={()=>setActivePriority("")} style={[styles.priorityChip,activePriority === '' && styles.activePriority]}>All</Text>
          <Text onPress={()=>setActivePriority("LOW")} style={[styles.priorityChip,activePriority === 'LOW' && styles.activePriority]}>Low</Text>
          <Text onPress={()=>setActivePriority("MED")} style={[styles.priorityChip,activePriority === 'MED' && styles.activePriority]}>Medium</Text>
          <Text onPress={()=>setActivePriority("HIGH")} style={[styles.priorityChip,activePriority === 'HIGH' && styles.activePriority]}>High</Text>
        </View>

        {tasks.map((task,index) =>(
          <TaskListCard task={task} key={index}/>
        ))}
    </ScrollView>
    </View>
  )
}

export default SupervisorTaskView

const styles = StyleSheet.create({
  projTitle:{
    fontFamily:'Poppins-Medium',
    color:Colors.text,
    fontSize:30
  },
  priorityChip:{
    paddingHorizontal:8,
    backgroundColor:Colors.White,
    marginHorizontal:5,
    color:Colors.text,
    borderRadius:50,
    fontSize:14
},
activePriority:{
  color:Colors.White,
  backgroundColor:Colors.primary
}
})