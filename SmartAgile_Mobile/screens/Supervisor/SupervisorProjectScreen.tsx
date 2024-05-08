import {Image, ScrollView, StyleSheet, Text, View , Dimensions , RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import { baseUrl } from '../../env';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';
import StatusColor from '../../styles/StatusColor';
import { NavigationType } from '../../navigation/NavigationTypes';
import ProjectListCard from '../../components/SupervisorComponents/ProjectListCard';

type ProjectType = {
  proj_id: number,
  icon: string,
  proj_name: string,
  proj_deadline: string,
  proj_desc: string,
  status: string,
  organization: number
}
type Props = {
  navigation : NavigationType<'SupervisorProjectScreen'>
}

const {width , height} =  Dimensions.get('window')

const SupervisorProjectScreen : React.FC<Props> = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const[projects , setProjects] = useState<ProjectType[]>([]);
  const[status , setStatus] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchProjects()
      setRefreshing(false);
    }, 2000);
  };

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
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.secondary]} 
          tintColor={Colors.secondary} />
    }
      contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}>

        {projects.map((project,index) => (
          <ProjectListCard onPress={()=> navigation.navigate('ProjectView',{projId : project.proj_id})} key={index} project={project} />
        ))}

      </ScrollView>
    </View>
  );
};

export default SupervisorProjectScreen;

const styles = StyleSheet.create({});
