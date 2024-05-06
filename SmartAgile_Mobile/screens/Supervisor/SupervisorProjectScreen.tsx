import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import { baseUrl } from '../../env';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';

type ProjectType = {
  proj_id: number,
  icon: string,
  proj_name: string,
  proj_deadline: string,
  proj_desc: string,
  status: string,
  organization: number
}

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
      console.log(status_response)
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

            <View style={styles.chip}>
              <Text style={[GlobalStyles.textStyle , styles.description]}> {status[project.status]}</Text>
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
    padding:2,
    backgroundColor:Colors.background,
    elevation:2,
    borderRadius:30,
    display:'flex',
    maxWidth:80
  }
});
