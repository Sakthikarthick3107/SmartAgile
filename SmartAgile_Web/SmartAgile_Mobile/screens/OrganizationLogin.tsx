import {Button, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, NativeModules, ScrollView} from 'react-native';
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
import { UseDispatch, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { baseUrl } from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { State } from '../redux/reducers';



type Props = {
  navigation : NavigationType<'OrganizationLogin'>
}

const {width,height} = Dimensions.get('window');

const OrganizationLogin: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const[email , setEmail] = useState<string>("");
  const[password , setPassword] = useState<string>("");



  const login =async () => {
    if(!email && !password){
      ToastModule.showToast('Fields must not be empty!')
    }
    else{
      try {
        const response = await fetch(`${baseUrl}/users/login/`,{
          method:'post',
          headers:{
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({
            email:email,
            password:password
          })
    
        });
        const res = await response.json()
        //console.log(res)
        if(response.status===200){
          const userData : any = {
            username : res.username,
            email : res.email,
            is_staff : res.is_staff
          }
          await AsyncStorage.setItem('user' ,JSON.stringify(userData) );
          dispatch(setUser(userData))
          ToastModule.showToast(res.message)
        }
        else{
          ToastModule.showToast('Invalid Credentials')
        }
      } catch (error) {
        
      }
    }
    
    
    //console.log(res)
  }

  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={GlobalStyles.scrollContainer}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>

      <View style={styles.form}>
        <TextInput onChangeText={(e)=>setEmail(e)} placeholder='Email' placeholderTextColor={'black'} style={styles.inputField} value={email}/>
        <TextInput secureTextEntry={true} onChangeText={(e)=>setPassword(e)} placeholder='Password' placeholderTextColor={'black'} style={styles.inputField} value={password}/>
        
        
        <TouchableOpacity  style={[styles.btn , styles.employeeBtn]} onPress={login}>
          <Text style={[styles.btnText , {color:Colors.background}]}>Login</Text>
        </TouchableOpacity>
        
        <View style={GlobalStyles.rowBetween}>
          <TouchableOpacity onPress={()=> navigation.navigate('NewOrganization')} >
            <Text style={styles.subOptions}>New Organization</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subOptions}>Forgot Password?</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
      
      </ScrollView>
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
    fontSize:14,
    padding:6,
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
    fontSize:16,
    fontFamily:'Poppins',
    fontWeight:'600'
  },
  subOptions:{
    color : Colors.background
  }
});
