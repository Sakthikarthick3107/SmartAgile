import { Image, RefreshControl,Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors';
import { NavigationType } from '../../navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ProjectType, fetchProjectData, setProjectData } from '../../redux/projectsRedux/projectAction';
import { baseUrl } from '../../env';

const {width , height} = Dimensions.get('window')

type Props = {
  navigation : NavigationType<'ProjectView' >,
  route:{
    params:{
      projId : number
    }
  }
}

type ProjectMemberType = {
  id: number,
  user: number,
  username: string,
  image: string,
  role_within_project: string,
  project: 1,
  profile: 3
}



const ProjectView : React.FC<Props> = ({navigation , route}) => {
    const {projId} = route.params
    const [refreshing, setRefreshing] = useState(false);
    const project : ProjectType = useSelector(state => state.project.project);
    const dispatch = useDispatch();
    const[projectMembers , setProjectMembers] = useState<ProjectMemberType[]>([]);

    const fetchProjectData = async(projectId : number) =>{
          try {
              const fetchProject = await fetch(`${baseUrl}/projects/${projectId}`);
              const projectResponse = await fetchProject.json();
              //console.log(projectResponse);
              
              dispatch(setProjectData(projectResponse));
          } catch (error) {
              console.log('Failed to fetch');
              
          }
      
  }
  const fetchTeamMembers = async() =>{
    try {
      const fetchMembers = await fetch(`${baseUrl}/projects/project-members/${projId}`);
      const membersResponse = await fetchMembers.json();
      setProjectMembers(membersResponse)
    } catch (error) {
      
    }
  }
    

    useEffect(()=>{
      fetchProjectData(projId);
      fetchTeamMembers()
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
    contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}
    >
      <Text style={styles.projTitle}>{project.proj_name}</Text>
      {/* <Image source={{uri:`${baseUrl}/${project.icon}`}} height={30} width={30} /> */}
      <Text style={GlobalStyles.textStyle}>{project.proj_desc}</Text>

      <TouchableOpacity style={GlobalStyles.curvedButton}>
        <Text style={GlobalStyles.btnText}>Explore Tasks</Text>
      </TouchableOpacity>

      <Text style={GlobalStyles.textStyle}>Members</Text>

      <View style={styles.memberContainer}>
      {projectMembers.map((member,index) =>(
        <View style={styles.memberView} key={index}>
          <Image source={{uri : `${baseUrl}/media/${member.image}`}} style={styles.memberImages}/>
          <Text style={GlobalStyles.smallText}>{member.username}</Text>
        </View>
        
      ))}
      </View>
    </ScrollView>
    </View>
  )
}

export default ProjectView

const styles = StyleSheet.create({
  projTitle:{
    fontFamily:'Poppins-Medium',
    color:Colors.text,
    fontSize:30
  },

  memberContainer:{
    display:'flex',
    flexDirection:'row',
    flexGrow:1,
    alignItems:'center',
    width:'100%',
    flexWrap:'wrap',
    gap:8
  },
  memberImages:{
    width:width*0.15,
    height:width*0.15,
    borderRadius:50
  },
  memberView:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }
})