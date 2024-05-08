import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors';
import { NavigationType } from '../../navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProjectData, setProjectData } from '../../redux/projectsRedux/projectAction';
import { baseUrl } from '../../env';


type Props = {
  navigation : NavigationType<'ProjectView' >,
  route:{
    params:{
      projId : number
    }
  }
}



const ProjectView : React.FC<Props> = ({navigation , route}) => {
    const {projId} = route.params
    const [refreshing, setRefreshing] = useState(false);
    const project = useSelector(state => state.project.project);
    const dispatch = useDispatch()

    const fetchProjectData = async(projectId : number) =>{
          try {
              const fetchProject = await fetch(`${baseUrl}/projects/${projectId}`);
              const projectResponse = await fetchProject.json();
              console.log(projectResponse);
              
              dispatch(setProjectData(projectResponse));
          } catch (error) {
              console.log('Failed to fetch');
              
          }
      
  }
    

    useEffect(()=>{
      fetchProjectData(projId);
      console.log(project)
    },[])

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      //fetchProjects()
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[Colors.secondary]} 
          tintColor={Colors.secondary} />
    }
    >
      <Text style={GlobalStyles.textStyle}>{project.proj_name}</Text>
    </ScrollView>
    </View>
  )
}

export default ProjectView

const styles = StyleSheet.create({})