import {Image, ScrollView, RefreshControl, StyleSheet, Text, View, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import { baseUrl } from '../../env';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';
import EmployeeListCard from '../../components/SupervisorComponents/EmployeeListCard';
import RNPickerSelect from 'react-native-picker-select';


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
  const user = useSelector(state => state.user.user);
  const[employees,setEmployees] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const[pos , setPos] = useState<any>([]);
  const[selectedPos , setSelectedPos] = useState<string>('');

  const positionItems = Object.entries(pos).map(([value,label]) =>({
    label , value
  }))

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getEmployees()
      setRefreshing(false);
    }, 2000);
  };

  const getEmployees = async() =>{
    try {
      const fetchEmployees = await fetch(`${baseUrl}/users/employee/profile/org=${user.organization}/${selectedPos}`);
      const response = await fetchEmployees.json();
      //console.log(response)
      setEmployees(response)
    } catch (error) {
      
    }
  }

  const getPositions = async() =>{
    try {
      const positions = await fetch(`${baseUrl}/users/employee/position-choices/`);
      const response = await positions.json();
    
      setPos(response);

      //console.log(response)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getEmployees();
  },[selectedPos])

  useEffect(() =>{
    getPositions();
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

        <RNPickerSelect   onValueChange={(value)=>{setSelectedPos(value) ; console.log(value)}}
            items={positionItems}
            value={selectedPos}
            style={{
              inputAndroid:{
                //backgroundColor:Colors.primary,
                color:Colors.text,
                width:200,
                borderRadius:50,
                backgroundColor:Colors.White,
                
              },
              placeholder:{
                color:Colors.text,
                //fontFamily:'Poppins-Bold'
              }
              
            }}

            placeholder={{
              label : 'Positions',
              value:''
            }}

          
          />

        {employees.map((employee , index) =>  (
          <EmployeeListCard  employee={employee} key={index}/>
        ))}

      </ScrollView>
    </View>
  );
};

export default EmployeeView;

const styles = StyleSheet.create({});
