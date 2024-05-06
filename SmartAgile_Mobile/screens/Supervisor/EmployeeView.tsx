import {Image, ScrollView, RefreshControl, StyleSheet, Text, View, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import { baseUrl } from '../../env';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';

type Employee = {
    id: number,
    email: string,
    username: string,
    image: string,
    position: string,
    role: string,
    date_joined: string,
    user: number,
    organization: number
  }


const EmployeeView = () => {
  const user = useSelector(state => state.user);
  const[employees,setEmployees] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching data and wait for 2 seconds
    setTimeout(() => {
      getEmployees()
      setRefreshing(false);
    }, 2000);
  };

  const getEmployees = async() =>{
    try {
      const fetchEmployees = await fetch(`${baseUrl}//users/employee/profile/org=${user.organization}`);
      const response = await fetchEmployees.json();
      //console.log(response)
      setEmployees(response)
    } catch (error) {
      
    }
  }
  useEffect(() =>{
    getEmployees();
  },[])


  return (
    <View style={GlobalStyles.authContainer}>
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.secondary]} 
          tintColor={Colors.secondary} 
        />}  
        contentContainerStyle={GlobalStyles.scrollAuthContainer} showsVerticalScrollIndicator={false}>
        
        <TextInput placeholder='Seach...' placeholderTextColor={'#000'} style={GlobalStyles.searchBar} />

        {employees.map((employee , index) =>  (
          <View key={index} style={styles.employeeCard}>
            <Image source={{uri : `${baseUrl}/media/${employee.image}`}} style={GlobalStyles.employeeIcon} />
            <View>
              <Text style={GlobalStyles.textStyle}>{employee.username}</Text>
              <Text style={styles.sideText}>{employee.email}</Text>
            </View>
            
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

export default EmployeeView;

const styles = StyleSheet.create({
  employeeCard:{
    display:'flex',
    flexDirection:'row',
    padding:6,
    marginVertical:2,
    gap:10,
    borderBottomWidth:0.2,
    borderBottomColor:Colors.text,
    borderStyle:'dashed'
  },
  sideText:{
    color:'black',
    fontFamily:'Poppins',
    fontSize:12
  }
});
