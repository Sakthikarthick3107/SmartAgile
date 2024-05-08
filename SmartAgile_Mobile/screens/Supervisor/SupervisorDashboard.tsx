import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import Colors from '../../styles/Colors';
import welcomeBot from '../../assets/hello-bot.json'
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { fetchProjectData } from '../../redux/projectsRedux/projectAction';
import { PieChart } from 'react-native-gifted-charts';

const{width , height} = Dimensions.get('window')

const SupervisorDashboard = () => {
  const user = useSelector(state => state.user.user);
  const data=[ 
        {value : 50 , color : Colors.primary , text:'Hello'}, 
        {value : 80 , color : Colors.text , text:'Hello'}, 
        {value : 90 , color : Colors.secondary , text:'Hello'}, 
        {value : 70 , color : Colors.error , text:'Hello'} ]
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.welcome}>
          {/* <LottieView source={welcomeBot} loop autoPlay style={{height:250,width:250}} /> */}
          <Text style={GlobalStyles.textStyle}>Hello {user.is_staff && 'admin'}</Text>
        </View>
        <PieChart donut={true} radius={width*0.2}   data={data}/>
      
        
      </ScrollView>
    </View>
  );
};

export default SupervisorDashboard;

const styles = StyleSheet.create({
  welcome:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    
  }
});
