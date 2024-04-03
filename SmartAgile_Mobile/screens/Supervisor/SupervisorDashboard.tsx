import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import Colors from '../../styles/Colors';
import welcomeBot from '../../assets/hello-bot.json'
import LottieView from 'lottie-react-native';

const SupervisorDashboard = () => {
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView style={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.welcome}>
          <LottieView source={welcomeBot} loop autoPlay style={{height:250,width:250}} />
          <Text style={GlobalStyles.textStyle}>Hello admin</Text>
        </View>

      
        
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
