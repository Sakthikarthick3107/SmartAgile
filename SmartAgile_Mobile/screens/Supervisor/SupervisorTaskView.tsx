import { NativeModules, RefreshControl, ScrollView, StyleSheet, Text, View , Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors'
import { NavigationType } from '../../navigation/NavigationTypes'
import { baseUrl } from '../../env';
import { useFocusEffect } from '@react-navigation/native'
import TaskListCard from '../../components/SupervisorComponents/TaskListCard'
import ReactNativeModal from 'react-native-modal'
import TaskPriorityNavigator from '../../navigation/TaskPriorityNavigator'
const ToastModule = NativeModules.ToastModule;

const {width , height} = Dimensions.get('window')

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
  status:string,
  project: number,
  assigned_to: {
    id : number,
    user : number,
    username : string,
    image : string,
    role_within_project : string,
    project : number,
    profile : number
  }
}

const SupervisorTaskView : React.FC<Props> = ({navigation , route}) => {
    const {projId , projectName} = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const[tasks,setTasks] = useState<Task[] | []>([]);
    const[activePriority , setActivePriority] = useState<string>("");
    const[isModalVisible , setIsModalVisible] = useState<boolean>(false);
    const[selectedTask , setSelectedTask] = useState<Task | {}>({});

    const toggleModal = (taskId : number) =>{
      setIsModalVisible(!isModalVisible);
      fetchSelectedTask(taskId);
    }

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          //fetchProjects()
          setRefreshing(false);
        }, 2000);
      };

      const fetchSelectedTask = async(taskId : number) =>{
        try {
          const taskDetail = await fetch(`${baseUrl}/tasks/${taskId}`);
          const taskResponse = await taskDetail.json();
          setSelectedTask(taskResponse);
          ToastModule.showToast(taskResponse.task_name);
        } catch (error) {
          
        }
        


      }


      const allTaskDetails = async() =>{
        let url = `${baseUrl}/tasks/project/${projId}`;
        if(activePriority !== ""){
          url += `/prior=${activePriority}`
        }
        try {
          const request_tasks = await fetch(url);
          const task_response  = await request_tasks.json();
          //console.log(task_response)
          setTasks(task_response);
          ToastModule.showToast(projectName)
        } catch (error) {
          ToastModule.showToast(error)
        }
        
      }

  // useFocusEffect(
  //   useCallback(() =>{
  //     const onBackPress = () =>{
  //       //console.log('Enter');
  //       allTaskDetails()
  //     }
  //     navigation.addListener('focus' , onBackPress);

  //     return () =>{
  //       //console.log('Leave');
  //       navigation.removeListener('focus' , onBackPress);
  //     }
  //   },[activePriority])
  // )

  useEffect(()=>{
    allTaskDetails()
  },[activePriority])
      
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

        <TaskPriorityNavigator tasks={tasks} />

        {/* {tasks.map((task,index) =>(
          <TaskListCard onPress={()=>toggleModal(task.task_id)} task={task} key={index}/>
        ))} */}
    </ScrollView>
    <ReactNativeModal onBackButtonPress={()=>toggleModal(0)} backdropColor='transparent' isVisible={isModalVisible} onBackdropPress={()=>toggleModal(0)} animationInTiming={300} animationOutTiming={300} swipeDirection='up'>
        <View style={styles.modalContainer}>
          <Text style={GlobalStyles.textStyle}>{selectedTask.task_name}</Text>
          <Text style={GlobalStyles.smallText}>{selectedTask.status}</Text>
        </View>
      </ReactNativeModal> 
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
},

modalContainer:{
  height: height*0.75 ,
  borderColor : Colors.primary,
  borderRadius:10,
  elevation:10,
   backgroundColor:Colors.background,
   padding:20
}
})