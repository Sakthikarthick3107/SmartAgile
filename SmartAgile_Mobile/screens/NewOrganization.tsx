import {Button, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, NativeModules, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import robot from '../assets/robot.json';
import tlogo from '../assets/t-logo.png';
import { baseUrl } from '../env';
const ToastModule = NativeModules.ToastModule; 



type Props = {
  navigation : NavigationType<'NewOrganization'>
}

const {width,height} = Dimensions.get('window');

const NewOrganization: React.FC<Props> = ({navigation}) => {

  const [organization, setOrganization] = useState({
    organizationName: '',
    organizationEmail: '',
    website: '',
    ownerName: '',
    ownerEmail: '',
    password: '',
  });
  
  const handleOrganizationDetails = (name: string, value: string) => {
    setOrganization(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const createOrganization = async() => {
    const superuser = {
      username : organization.ownerName,
      email : organization.ownerEmail,
      password:  organization.password
    }
    try {
      const createSuperuser = await fetch(`${baseUrl}/users/employees/superuser/`,{
        method :'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(superuser)
        
      })
        const superuserResponse = await createSuperuser.json();
        console.log(superuserResponse);
        
        if(createSuperuser.status === 201){
          const newOrganization = {
            org_name : organization.organizationName,
            org_mail : organization.organizationEmail,
            org_website : organization.website,
            owner : superuserResponse.id
          }
          try {
            const postNewOrganization = await fetch(`${baseUrl}/organization/`,{
              method :'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(newOrganization)
        
            });
            const orgResponse =await postNewOrganization.json();
            console.log(orgResponse);
            
            if(postNewOrganization.status===200 && orgResponse.message  === 'successfully created'){
              const profileStatus = {
                user : superuserResponse.id,
                organization : orgResponse.data.org_id
              }
              const userProfileCreate = await fetch(`${baseUrl}/users/employee/profile`,{
                method:'post',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(profileStatus)
              })
              const profileResponse = await userProfileCreate.json();
              if(userProfileCreate.status === 201){
                ToastModule.showToast('New Organization created successfully')
              }
            }
          } catch (error) {
            
          }
        }
    } catch (error) {
      
    }
  }


  return (
    <LinearGradient colors={[ Colors.primary , Colors.secondary ]} style={GlobalStyles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}  contentContainerStyle={GlobalStyles.scrollContainer}>
      <Image source={tlogo}/>
      <LottieView source={robot} autoPlay loop style={styles.lottie}/>

      <View style={styles.organization}>
      <TextInput
          placeholder='Organization Name'
          placeholderTextColor='black'
          style={styles.inputField}
          onChangeText={(text) => handleOrganizationDetails('organizationName', text)}
          value={organization.organizationName}
        />
      <TextInput
        placeholder='Organization Email'
        placeholderTextColor='black'
        style={styles.inputField}
        onChangeText={(text) => handleOrganizationDetails('organizationEmail', text)}
        value={organization.organizationEmail}
      />
      <TextInput
        placeholder='Website'
        placeholderTextColor='black'
        style={styles.inputField}
        onChangeText={(text) => handleOrganizationDetails('website', text)}
        value={organization.website}
      />
      <TextInput
        onChangeText={(text) => handleOrganizationDetails('ownerName', text)}
        placeholder='Owner Name'
        placeholderTextColor='black'
        style={styles.inputField}
        value={organization.ownerName}
      />
      <TextInput
        placeholder='Owner Mail'
        placeholderTextColor='black'
        style={styles.inputField}
        onChangeText={(text) => handleOrganizationDetails('ownerEmail', text)}
        value={organization.ownerEmail}
      />
      <TextInput
        secureTextEntry={true}
        placeholder='Create Password'
        placeholderTextColor='black'
        style={styles.inputField}
        onChangeText={(text) => handleOrganizationDetails('password', text)}
        value={organization.password}
      />

        
        
        <TouchableOpacity  style={[styles.btn , styles.employeeBtn]} onPress={createOrganization} >
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
  organization:{
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
