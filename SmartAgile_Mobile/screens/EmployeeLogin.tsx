import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationType } from '../navigation/NavigationTypes';

type Props = {
  navigation : NavigationType<'EmployeeLogin'>
}

const EmployeeLogin: React.FC<Props> = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <Text>EmployeeLogin</Text>
      <Button color={Colors.primary} title="Login" />
    </View>
  );
};

export default EmployeeLogin;

const styles = StyleSheet.create({});
