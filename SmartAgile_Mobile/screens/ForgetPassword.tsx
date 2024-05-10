import { Dimensions, StyleSheet,ScrollView, Text,Image, TextInput, TouchableOpacity, View, NativeModules } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../styles/Colors'
import GlobalStyles from '../styles/GlobalStyle'
import LottieView from 'lottie-react-native';
import { NavigationType } from '../navigation/NavigationTypes'
import tlogo from '../assets/t-logo.png'; 
import robot from '../assets/robot.json';
import { baseUrl } from '../env'
const ToastModule = NativeModules.ToastModule; 

const {width,height} = Dimensions.get('window');

type Props = {
    navigation : NavigationType<'ForgetPassword'>
  }

const ForgetPassword : React.FC<Props> = ({navigation}) => {

    const[email , setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>('');


    const validateEmail = (email : string) => {
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email.length > 0) {
          setEmailError('Invalid email format');
        } else {
          setEmailError('');
        }
      };


    const handleEmailChange = (text : string) =>{
        setEmail(text);
        validateEmail(text);
      }

      const getVerificationCode = async() =>{
        if(!email){
          ToastModule.showToast('Email must not be empty!')
        }
        else{
          try {
            const getCodeRequest = await fetch(`${baseUrl}/users/auth/password_reset/`,{
              method:'post',
              headers:{
                'Content-Type' :'application/json'
              },
              body:JSON.stringify({
                email: email
              })
            });
            if(getCodeRequest.ok){
              const response = await getCodeRequest.json();
              ToastModule.showToast(response.message);
              navigation.navigate('OrganizationLogin')
            }
            
          } catch (error) {
            
          }
        }
      }

  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={GlobalStyles.scrollContainer}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>

      <View style={styles.form}>
        <TextInput onChangeText={handleEmailChange} placeholder='Enter your valid E-mail address' autoComplete='email' placeholderTextColor={'black'} style={styles.inputField} value={email}/>
        <Text style={styles.errorText}>{emailError}</Text>
        
        <TouchableOpacity  onPress={getVerificationCode}
          disabled={emailError !=='' }    
          style={[styles.btn , styles.employeeBtn]} 
          >
          <Text style={[styles.btnText , {color:Colors.background}]}>Submit</Text>
        </TouchableOpacity>
        
        
        
      </View>
      
      </ScrollView>
    </LinearGradient>
  )
}

export default ForgetPassword

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
        //alignItems:'center',
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
      },
      errorText: {
        color: Colors.error,
        fontSize:14,
        fontWeight:'bold'
      }
})