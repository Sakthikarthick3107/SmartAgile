import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationType } from '../../navigation/NavigationTypes';
import GlobalStyles from '../../styles/GlobalStyle';

type Props = {
    navigation : NavigationType<'SupervisorProfile'>
}

const SupervisorProfile : React.FC<Props> = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer}>
        <Text style={GlobalStyles.textStyle}>Hi</Text>
      </ScrollView>
      
    </View>
  )
}

export default SupervisorProfile

const styles = StyleSheet.create({})