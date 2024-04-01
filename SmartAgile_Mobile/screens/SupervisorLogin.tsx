import {Button, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image} from 'react-native';
import React, { useState } from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import robot from '../assets/robot.json';
import tlogo from '../assets/t-logo.png';

type Props = {
  navigation : NavigationType<'SupervisorLogin'>
}

const {width,height} = Dimensions.get('window');

const SupervisorLogin: React.FC<Props> = ({navigation}) => {
  const[username , setUserName] = useState<string>("");
  const[password , setPassword] = useState<string>("");

  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>
      <Text style={styles.heading}>Login as Supervisor</Text>

      <View style={styles.form}>
        <TextInput onChangeText={(e)=>setUserName(e)} placeholder='Username' placeholderTextColor={'black'} style={styles.inputField} value={username}/>
        <TextInput secureTextEntry={true} onChangeText={(e)=>setPassword(e)} placeholder='Password' placeholderTextColor={'black'} style={styles.inputField} value={password}/>
        
        <TouchableOpacity style={[styles.btn , styles.employeeBtn]} onPress={() => navigation.navigate('SupervisorDashboard')}>
          <Text style={[styles.btnText , {color:Colors.background}]}>Login</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
};

export default SupervisorLogin;

const styles = StyleSheet.create({
  lottie: {
    width:width*0.9,
    height:height*0.3,
  },
  heading:{
    color:'white',
    fontSize:30,
    fontFamily:'Poppins'
  },
  form:{
    minHeight:height*0.2,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:width*0.9,
    justifyContent:'space-around'
  },
  inputField:{
    backgroundColor:Colors.background,
    width:'100%',
    fontSize:15,
    padding:8,
    borderRadius:10,
    elevation:10,
    fontFamily:'Poppins',
    color:'black'
  },
  btn:{
    width:'100%',
    padding:6,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    elevation:10,
    marginVertical:5,
    borderRadius:10,
  },
  employeeBtn:{
    backgroundColor:Colors.primary,
  },
  btnText:{
    fontSize:20,
    fontFamily:'Poppins',
    fontWeight:'600'
  }
});
