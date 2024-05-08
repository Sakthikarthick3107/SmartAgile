import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'
import GlobalStyles from '../../styles/GlobalStyle'
import StatusColor from '../../styles/StatusColor'
import { baseUrl } from '../../env'

type ProjectType = {
    proj_id: number,
    icon: string,
    proj_name: string,
    proj_deadline: string,
    proj_desc: string,
    status: string,
    organization: number
  }

type ProjectListCardProps = {
  project : ProjectType,
  onPress : () => void
}

const ProjectListCard = ({project , onPress} :ProjectListCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}  style={styles.ProjectCard}>
            <View style={GlobalStyles.rowBetween}>
              <Text style={GlobalStyles.textStyle}> {project.proj_name}</Text>
              <Image style={{height:70 , width:70}} source={{ uri : baseUrl+project.icon}}/>
            </View> 
            <Text style={[GlobalStyles.textStyle , styles.description]}> {project.proj_desc}</Text>

            <View style={GlobalStyles.rowBetween}>
            
              <View style={[styles.chip , {backgroundColor:StatusColor[project.status]}]}>
                <Text style={[GlobalStyles.textStyle , styles.chipText]}> {project.status}</Text>
              </View> 
              <Text style={[GlobalStyles.textStyle , styles.description]}>{project.proj_deadline}</Text>
            </View>
                       
            
          </TouchableOpacity>
  )
}

export default ProjectListCard

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
})