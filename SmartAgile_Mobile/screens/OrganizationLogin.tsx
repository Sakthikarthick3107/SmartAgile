// Import necessary components and libraries from react-native and other packages
import {Button, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, NativeModules, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';   // Import React and useState hook for state management
import GlobalStyles from '../styles/GlobalStyle';   // Import global styles
import Colors from '../styles/Colors';    // Import color schemes
import { NavigationType } from '../navigation/NavigationTypes';   // Type definition for navigation props
import LinearGradient from 'react-native-linear-gradient';    // Component for gradient backgrounds
import LottieView from 'lottie-react-native';   // Animation view component
import robot from '../assets/robot.json';   // Animation file
import tlogo from '../assets/t-logo.png';   //Company Logo image
const ToastModule = NativeModules.ToastModule;    // Android Native module for displaying toast messages
//import Config from 'react-native-config';
import { useDispatch } from 'react-redux';    // Hook to dispatch actions to Redux store
import { setUser } from '../redux/actions';   // Action to set user data in the Redux store
import { baseUrl } from '../env';   // Base URL for network requests
import AsyncStorage from '@react-native-async-storage/async-storage';   // Storage library for async storage operations
//import { State } from '../redux/reducers';



// Define props type for the component
type Props = {
  navigation : NavigationType<'OrganizationLogin'>
}

// Get screen dimensions
const {width,height} = Dimensions.get('window');

// Main component function
const OrganizationLogin: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();   // Hook to dispatch Redux actions

  // State variables for the email, password, and their respective error messages
  const[email , setEmail] = useState<string>("");
  const[password , setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>('');
  const[passErr,setPassErr] = useState<string>('');
  
  // Function to validate email format
  const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  // Function to validate password 
  const validatePassword = (pass:string) =>{
    if(pass.length >0 && pass.length <5){
      setPassErr('Password length should be minimum of 5');
    }
    else{
      setPassErr('');
    }
  }

   // Handlers for changes in email and password inputs
  const handleEmailChange = (text : string) =>{
    setEmail(text);
    validateEmail(text);
  }

  const handlePassChange = ( pass : string) =>{
    setPassword(pass);
    validatePassword(pass);
  }

  // Login function to handle user authentication
  const login =async () => {
    // Check if both email and password fields are empty
    if(!email && !password){ 
      ToastModule.showToast('Fields must not be empty!')
    }

    // Check if the email field is empty
    else if(!email){
      ToastModule.showToast('Email must not be empty!')
    }

    // Check if the password field is empty
    else if(!password){
      ToastModule.showToast('Password must not be empty!')
    }
    else{
      try {
        // Attempt to send a POST request to the server to authenticate the user
        const response = await fetch(`${baseUrl}/users/login/`,{
          method:'post',
          headers:{
            'Content-Type' : 'application/json'    // Set the content type header for JSON
          },
          body:JSON.stringify({
            email:email,
            password:password
          })    // Send the email and password as JSON in the body of the request
    
        });
        // Parse the JSON response from the server
        const res = await response.json()
        //console.log(res)
        // Check if the response status code is 200, indicating a successful login
        if(response.status===200){
          // Extract user data from the response
          const userData : any = {
            username : res.username,
            email : res.email,
            organization : res.organization,
            is_staff : res.is_staff,
            is_superuser : res.is_superuser,

          }

          await AsyncStorage.setItem('user' ,JSON.stringify(userData) );    // Store the user data in AsyncStorage for persistent storage
          dispatch(setUser(userData))     // Update the user state in Redux with the new user data
          ToastModule.showToast(res.message)    // Display a toast message indicating the login was successful
        }
        else{
          ToastModule.showToast('Invalid Credentials')    // Display a toast message indicating the credentials were invalid
        }
      } catch (error) {     // Handle any errors that occur during the fetch operation
        console.log('Login failed with error: ', error);
        ToastModule.showToast('Login failed. Please try again.');
      }
    }
    
    
    //console.log(res)
  }

  // Component layout including inputs, buttons, and navigation options
  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={GlobalStyles.scrollContainer}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>

      <View style={styles.form}>
        <TextInput onChangeText={handleEmailChange} placeholder='Email' placeholderTextColor={'black'} style={styles.inputField} value={email}/>
        <Text style={styles.errorText}>{emailError}</Text>

        <TextInput secureTextEntry={true} onChangeText={handlePassChange} placeholder='Password' placeholderTextColor={'black'} style={styles.inputField} value={password}/>
        <Text style={styles.errorText}>{passErr}</Text>
        
        <TouchableOpacity 
          disabled={emailError !=='' || passErr !==''}    // Condition to disable the button until input error clears
          style={[styles.btn , styles.employeeBtn]} 
          onPress={login}>
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
});
