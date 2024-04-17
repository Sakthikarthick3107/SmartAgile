import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DevSettings } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyle'
const SupervisorSettings = () => {
    const logout = async() =>{
        await AsyncStorage.removeItem('user');
        DevSettings.reload()
    }
  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollAuthContainer}>
        {/* <Text style={GlobalStyles.textStyle}>Settings</Text> */}
      <TouchableOpacity style={styles.profileBtns}>
        <Text style={GlobalStyles.textStyle}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout} style={styles.profileBtns}>
        <Text style={GlobalStyles.textStyle}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default SupervisorSettings

const styles = StyleSheet.create({
  profileBtns:{
    padding:6
  }
})