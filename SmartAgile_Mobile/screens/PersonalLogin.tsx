import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyle';
import Colors from '../styles/Colors';
import { NavigationType } from '../navigation/NavigationTypes';

type Props = {
  navigation : NavigationType<'PersonalLogin'>
}

const PersonalLogin: React.FC<Props> = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <Text>PersonalLogin</Text>
      <Button color={Colors.primary} title="Login" />
    </View>
  );
};

export default PersonalLogin;

const styles = StyleSheet.create({});
