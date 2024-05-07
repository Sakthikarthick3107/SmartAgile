import {Image, ScrollView, StyleSheet, Text, View , Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import { baseUrl } from '../../env';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';
import StatusColor from '../../styles/StatusColor';

type ProjectType = {
  proj_id: number,
  icon: string,
  proj_name: string,
  proj_deadline: string,
  proj_desc: string,
  status: string,
  organization: number
}

const {width , height} =  Dimensions.get('window')

const SupervisorProjectScreen : React.FC = () => {
  const user = useSelector(state => state.user);
  const[projects , setProjects] = useState<ProjectType[]>([]);
  const[status , setStatus] = useState<any>();

  const fetchProjects = async() =>{
    try {
      const projectFetch = await fetch(`${baseUrl}/projects/organization/${user.organization}`);
      const response = await projectFetch.json();
      //console.log(response)
      setProjects(response)
    } catch (error) {
      
    }
  }

  const getStatus = async() =>{
    try {
      const status_types = await fetch(`${baseUrl}/projects/status-choices/`);
      const status_response = await status_types.json();
      setStatus(status_response)
      //console.log(status_response)
    } catch (error) {
      
    }
  }

  useEffect(() =>{
    fetchProjects();
    getStatus();
  },[])
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}>

        {projects.map((project,index) => (
          <View key={index} style={styles.ProjectCard}>
            <View style={GlobalStyles.rowBetween}>
              <Text style={GlobalStyles.textStyle}> {project.proj_name}</Text>
              <Image style={{height:70 , width:70}} source={{ uri : baseUrl+project.icon}}/>
            </View> 
            <Text style={[GlobalStyles.textStyle , styles.description]}> {project.proj_desc}</Text>

            <View style={GlobalStyles.rowBetween}>
            
              <View style={[styles.chip , {backgroundColor:StatusColor[project.status]}]}>
                <Text style={[GlobalStyles.textStyle , styles.chipText]}> {status[project.status]}</Text>
              </View> 
              <Text style={[GlobalStyles.textStyle , styles.description]}>{project.proj_deadline}</Text>
            </View>
                       
            
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

export default SupervisorProjectScreen;

const styles = StyleSheet.create({
  ProjectCard : {
    backgroundColor:Colors.White,
    elevation:5,
    borderRadius:10,
    marginVertical:2,
    padding:10,
    display:'flex',
    flexDirection:'column',
    
  },
  description:{
    fontSize:14
  },
  chip:{
    paddingVertical:2,
    paddingHorizontal:10,
    // backgroundColor:Colors.background,
    elevation:1,
    borderRadius:30,
    display:'flex',
    width:'auto'
  },
  chipText:{
    color:Colors.White,
    fontSize:12,
    fontWeight:'bold'
  }
});
