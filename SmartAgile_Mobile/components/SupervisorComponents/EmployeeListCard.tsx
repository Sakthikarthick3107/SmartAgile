<<<<<<< HEAD
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'
import GlobalStyles from '../../styles/GlobalStyle'
import { baseUrl } from '../../env'


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

const EmployeeListCard  = ({employee} : {employee: Employee})  => {
  return (
    <View  style={styles.employeeCard}>
        <Image source={{uri : `${baseUrl}/media/${employee.image}`}} style={GlobalStyles.employeeIcon} />
        <View>
            <View style={styles.nameAndPosition}>
                <Text style={styles.nameText}>{employee.username}  </Text>
                <View style={styles.positionChip}>
                    <Text style={styles.smallText}>{employee.position}</Text>
                </View>
                
            </View>
              
            <Text style={styles.smallText}>{employee.email}</Text>
        </View>
            
    </View>
  )
}

export default EmployeeListCard

const styles = StyleSheet.create({
    employeeCard:{
        display:'flex',
        flexDirection:'row',
        padding:6,
        marginVertical:2,
        gap:10,
        borderBottomWidth:0.2,
        borderBottomColor:Colors.text,
        borderStyle:'dashed',
      },
      nameText:{
        color:'black',
        fontFamily:'Poppins-Medium',
        fontSize:16,
      },
      smallText:{
        color:'black',
        fontFamily:'Poppins',
        fontSize:10
      },
      nameAndPosition:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        justifyContent:'space-between',
      },
      positionChip:{
        paddingHorizontal:10,
        borderRadius:50,
        backgroundColor:Colors.White,
        elevation:2
      }
})

=======
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../styles/Colors'
import GlobalStyles from '../../styles/GlobalStyle'
import { baseUrl } from '../../env'


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

const EmployeeListCard  = ({employee} : {employee: Employee})  => {
  return (
    <View  style={styles.employeeCard}>
        <Image source={{uri : `${baseUrl}/media/${employee.image}`}} style={GlobalStyles.employeeIcon} />
        <View>
            <View style={styles.nameAndPosition}>
                <Text style={styles.nameText}>{employee.username}  </Text>
                <View style={styles.positionChip}>
                    <Text style={styles.smallText}>{employee.position}</Text>
                </View>
                
            </View>
              
            <Text style={styles.smallText}>{employee.email}</Text>
        </View>
            
    </View>
  )
}

export default EmployeeListCard

const styles = StyleSheet.create({
    employeeCard:{
        display:'flex',
        flexDirection:'row',
        padding:6,
        marginVertical:2,
        gap:10,
        borderBottomWidth:0.2,
        borderBottomColor:Colors.text,
        borderStyle:'dashed',
      },
      nameText:{
        color:'black',
        fontFamily:'Poppins-Medium',
        fontSize:16,
      },
      smallText:{
        color:'black',
        fontFamily:'Poppins',
        fontSize:10
      },
      nameAndPosition:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        justifyContent:'space-between',
      },
      positionChip:{
        paddingHorizontal:10,
        borderRadius:50,
        backgroundColor:Colors.White,
        elevation:2
      }
})

>>>>>>> 41f63ad5242e077c7f7c7cf316ed6d9ea73da5bc
