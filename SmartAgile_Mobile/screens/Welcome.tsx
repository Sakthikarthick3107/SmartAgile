import {StyleSheet, Text, View , Dimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';
import LottieView from 'lottie-react-native';
import robot from '../assets/robot.json';
import LinearGradient from 'react-native-linear-gradient';
import tlogo from '../assets/t-logo.png';

type Props = {
  navigation : NavigationType<'Welcome'>
}

const {width,height} = Dimensions.get('window');

const Welcome: React.FC<Props> = ({navigation}) => {
  return (
    <LinearGradient colors={[ Colors.secondary ,Colors.primary  ]} style={GlobalStyles.container}>
      <Image source={tlogo}/>
      <Text style={styles.heading}>Smart Agile</Text>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>
      
      <Text style={{fontFamily:"Poppins",fontSize:18,textAlign:'center',color:'white' , marginVertical:4}}> 
        Revolutionizing Project Management with Seamless Efficiency.
      </Text>

      <TouchableOpacity style={[styles.btn , styles.supervisorBtn]} onPress={() => navigation.navigate('SupervisorLogin')}>
        <Text style={[styles.btnText , {color:Colors.primary}]}>Supervisor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn , styles.employeeBtn]} onPress={() => navigation.navigate('EmployeeLogin')}>
        <Text style={[styles.btnText , {color:Colors.background}]}>Employee</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  heading:{
    color:'white',
    fontSize:40,
    fontFamily:'Poppins'
  },
  lottie: {
    width:width*0.9,
    height:height*0.3,
  },
  btn:{
    width:width*0.8,
    padding:6,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    elevation:10,
    marginVertical:5,
  },
  employeeBtn:{
    backgroundColor:Colors.primary,
  },
  supervisorBtn:{
    backgroundColor:Colors.background
  },

  btnText:{
    fontSize:20,
    fontFamily:'Poppins',
    fontWeight:'600'
  }
});
