import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';

type Props = {
  navigation : NavigationType<'SupervisorLogin'>
}

const SupervisorLogin: React.FC<Props> = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <Text>SupervisorLogin</Text>
      <Button
        color={Colors.primary}
        title="Login"
        onPress={() => navigation.navigate('SupervisorDashboard')}
      />
    </View>
  );
};

export default SupervisorLogin;

const styles = StyleSheet.create({});
