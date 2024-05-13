import { ScrollView, StyleSheet, Text, View , Dimensions ,NativeModules} from 'react-native'
import React, { useEffect, useState } from 'react';
import { NavigationType } from '../../navigation/NavigationTypes';
import GlobalStyles from '../../styles/GlobalStyle';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';
import { baseUrl } from '../../env';
const ToastModule = NativeModules.ToastModule; 

const {width,height} = Dimensions.get('window');

type Props = {
    navigation : NavigationType<'SupervisorProfile'>
}

const SupervisorProfile : React.FC<Props> = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const userName = user.username[0].toUpperCase() + user.username.substring(1);
  const[orgDetails , setOrgDetails] = useState({});

  const getOrganizationDetails = async() =>{
    try{
      const org_details = await fetch(`${baseUrl}/organization/${user.organization}/`);
      const response = await org_details.json();
      setOrgDetails(response);
      console.log(response )
    }
    catch(e){
      ToastModule.showToast(e)
      console.log(user.organization)
    }

   

  }
  useEffect(()=>{
    getOrganizationDetails();
  },[])

  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer}>

        <View style={styles.imageContainer}>

        </View>
        <Text style={[GlobalStyles.textStyle , styles.username]}>{userName}</Text>
        {/* <Text style={GlobalStyles.textStyle}>{user.email}</Text> */}
        <Text style={GlobalStyles.textStyle}>{orgDetails.org_name}</Text>
      </ScrollView>
      
    </View>
  )
}

export default SupervisorProfile;

const styles = StyleSheet.create({
  imageContainer:{
    height : height*0.15,
    backgroundColor: Colors.White
  },
  username:{
    fontSize : 28,
    //fontWeight:'bold'
  }
})