import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DevSettings } from 'react-native'
const SupervisorSettings = () => {
    const logout = async() =>{
        await AsyncStorage.removeItem('user');
        DevSettings.reload()
    }
  return (
    <View>
      <Text>SupervisorSettings</Text>
      <Button onPress={logout} title='Logout'/>
    </View>
  )
}

export default SupervisorSettings

const styles = StyleSheet.create({})