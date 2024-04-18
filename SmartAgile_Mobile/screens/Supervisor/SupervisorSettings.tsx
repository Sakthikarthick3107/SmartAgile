import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DevSettings } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyle'
import Colors from '../../styles/Colors';
import { NavigationType } from '../../navigation/NavigationTypes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props ={
  navigation : NavigationType<'SupervisorSettings'>
}

const SupervisorSettings :React.FC<Props> = ({navigation}) => {
    const logout = async() =>{
        await AsyncStorage.removeItem('user');
        DevSettings.reload()
    }
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer}>
        {/* <Text style={GlobalStyles.textStyle}>Settings</Text> */}
        
      <TouchableOpacity style={styles.profileBtns} onPress={() => navigation.navigate('SupervisorProfile')} >
        <AntDesign name='profile' size={24} color={Colors.text}/>
        <Text style={GlobalStyles.textStyle}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileBtns}>
      <Feather name='info' size={24} color={Colors.text}/>
        <Text style={GlobalStyles.textStyle}>About Organization</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileBtns}>
        <Feather name='help-circle' size={24} color={Colors.text}/>
        <Text style={GlobalStyles.textStyle}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileBtns}>
        <Fontisto name='hipchat' size={24} color={Colors.text}/>
        <Text style={GlobalStyles.textStyle}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout} style={styles.profileBtns}>
        <MaterialCommunityIcons name='logout' size={24} color={Colors.text}/>
        <Text style={GlobalStyles.textStyle}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default SupervisorSettings

const styles = StyleSheet.create({
  profileBtns:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    padding:10,
    backgroundColor:Colors.White,
    elevation:2,
    shadowOffset:{
      height:5,
      width:-2
    },
    marginTop:4,
    borderRadius:5
  }
})