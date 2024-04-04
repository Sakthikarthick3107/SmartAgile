import {Button, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, NativeModules} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import robot from '../assets/robot.json';
import tlogo from '../assets/t-logo.png';
const ToastModule = NativeModules.ToastModule;  
import Config from 'react-native-config';

const baseUrl = Config.BASE_URL;

type Props = {
  navigation : NavigationType<'OrganizationLogin'>
}

const {width,height} = Dimensions.get('window');

const OrganizationLogin: React.FC<Props> = ({navigation}) => {
  const[username , setUserName] = useState<string>("");
  const[password , setPassword] = useState<string>("");



  const login =async () => {
    const response = await fetch(`https://b98f-2409-40f4-a9-b6e7-cc4c-b03-2fc3-c619.ngrok-free.app/users/login/`,{
      method:'post',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        username:username,
        password:password
      })

    });
    const res = await response.json()
    if(response.status===200){
      navigation.navigate('SupervisorTabBar');
      ToastModule.showToast(res.message)
    }
    else{
      ToastModule.showToast('Invalid Credentials')
    }
    console.log(res)
  }

  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>
      <Text style={styles.heading}>Organization credentials</Text>

      <View style={styles.form}>
        <TextInput onChangeText={(e)=>setUserName(e)} placeholder='Username' placeholderTextColor={'black'} style={styles.inputField} value={username}/>
        <TextInput secureTextEntry={true} onChangeText={(e)=>setPassword(e)} placeholder='Password' placeholderTextColor={'black'} style={styles.inputField} value={password}/>
        
        <TouchableOpacity  style={[styles.btn , styles.employeeBtn]} onPress={login}>
          <Text style={[styles.btnText , {color:Colors.background}]}>Login</Text>
        </TouchableOpacity>
        
        <View style={GlobalStyles.rowBetween}>
          <TouchableOpacity>
            <Text>New Organization</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </LinearGradient>
  );
};

export default OrganizationLogin;

const styles = StyleSheet.create({
  lottie: {
    width:width*0.9,
    height:height*0.3,
  },
  heading:{
    color:'white',
    fontSize:20,
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
    marginVertical:5,
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
