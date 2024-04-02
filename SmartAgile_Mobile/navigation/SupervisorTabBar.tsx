import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorDashboard from "../screens/Supervisor/SupervisorDashboard";
import { NavigationType } from "./NavigationTypes";
import SupervisorProjectScreen from "../screens/Supervisor/SupervisorProjectScreen";
import Colors from "../styles/Colors";
import Icon from 'react-native-vector-icons/Ionicons'
import EmployeeView from "../screens/Supervisor/EmployeeView";
import { StyleSheet, Text } from "react-native";


const Tab = createBottomTabNavigator()

type Props = {
    navigation : NavigationType<'SupervisorTabBar'>
  }

const SupervisorTabBar : React.FC<Props> = ({navigation}) => {
    return(
        <Tab.Navigator screenOptions={{ headerStyle:{
                backgroundColor:Colors.secondary,
                elevation:20,
                shadowColor:'black',
                shadowRadius:20
            },
            headerShadowVisible:true,
            headerTintColor:Colors.background,
            headerTitle:'',
            headerRight:()=>(
                <Text style={styles.headerLeftTitle}>admin</Text>
            ),
            tabBarActiveTintColor:Colors.primary,
            tabBarInactiveTintColor:'black',
            tabBarStyle:{
            backgroundColor:'white',
            position:'relative',
            bottom:20,
            height:60,
            borderRadius:30,
            paddingBottom:10,
            elevation:20,
            shadowOffset:{
                height:4,
                width:4
            },
        
        }}}>
            <Tab.Screen name="SupervisorDashboard" component={SupervisorDashboard}
                options={{
                    tabBarLabel:'Dashboard',
                    tabBarIcon:({color})=>(
                        <Icon name='home' size={30} color={color} />
                    )
                }} />
            <Tab.Screen name="SupervisorProjectScreen" component={SupervisorProjectScreen}
                options={{
                    tabBarLabel:'Projects',
                    tabBarIcon:({color})=>(
                        <Icon name='home' size={30} color={color} />
                    )
                }}  />
            
            <Tab.Screen name="EmployeeView" component={EmployeeView}
                options={{
                    tabBarLabel:'Employees',
                    tabBarIcon:({color})=>(
                        <Icon name='home' size={30} color={color} />
                    )
                }}  />
        </Tab.Navigator>
    )
}

export default SupervisorTabBar

const styles = StyleSheet.create({
    headerLeftTitle:{
        fontFamily:'Poppins',
        fontSize:20,
        marginRight:30,
        fontWeight:'600'
    }
})