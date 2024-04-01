import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationType } from '../navigation/NavigationTypes';

type Props = {
  navigation : NavigationType<'Welcome'>
}

const Welcome: React.FC<Props> = ({navigation}) => {
  return (
    <View style={[GlobalStyles.container,{backgroundColor : Colors.primary}]}>
      <Text style={styles.heading}>Smart Agile</Text>
      <Button
        title="Supervisor"
        color={Colors.primary}
        onPress={() => navigation.navigate('SupervisorLogin')}
      />
      <Button
        title="Employee"
        onPress={() => navigation.navigate('EmployeeLogin')}
        color={Colors.primary}
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  heading:{
    color:'white',
    fontSize:30
  }
});
