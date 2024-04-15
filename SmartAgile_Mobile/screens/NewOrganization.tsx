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




type Props = {
  navigation : NavigationType<'NewOrganization'>
}

const {width,height} = Dimensions.get('window');

const NewOrganization: React.FC<Props> = ({navigation}) => {
  const[username , setUserName] = useState<string>("");
  const[password , setPassword] = useState<string>("");


  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}  contentContainerStyle={GlobalStyles.scrollContainer}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>

      <View style={styles.form}>
        <TextInput placeholder='Organization Name' placeholderTextColor={'black'} style={styles.inputField}/>
        <TextInput placeholder='Organization Email' placeholderTextColor={'black'} style={styles.inputField}/>
        <TextInput placeholder='Website' placeholderTextColor={'black'} style={styles.inputField}/>
        <TextInput onChangeText={(e)=>setUserName(e)} placeholder='Owner Name' placeholderTextColor={'black'} style={styles.inputField} value={username}/>
        <TextInput placeholder='Owner Mail' placeholderTextColor={'black'} style={styles.inputField}/>
        <TextInput secureTextEntry={true} onChangeText={(e)=>setPassword(e)} placeholder='Create Password' placeholderTextColor={'black'} style={styles.inputField} value={password}/>
        
        
        <TouchableOpacity  style={[styles.btn , styles.employeeBtn]} >
          <Text style={[styles.btnText , {color:Colors.background}]}>Create Organization</Text>
        </TouchableOpacity>
        
        
      </View>
      
      </ScrollView>
    </LinearGradient>
  );
};

export default NewOrganization;

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
