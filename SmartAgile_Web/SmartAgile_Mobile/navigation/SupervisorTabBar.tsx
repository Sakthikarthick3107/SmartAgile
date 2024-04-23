import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorDashboard from "../screens/Supervisor/SupervisorDashboard";
import { NavigationType } from "./NavigationTypes";
import SupervisorProjectScreen from "../screens/Supervisor/SupervisorProjectScreen";
import Colors from "../styles/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwersome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EmployeeView from "../screens/Supervisor/EmployeeView";
import { StyleSheet, Text, View } from "react-native";
import SupervisorSettings from "../screens/Supervisor/SupervisorSettings";


const Tab = createBottomTabNavigator()

type Props = {
    navigation : NavigationType<'SupervisorTabBar'>
  }

const SupervisorTabBar : React.FC<Props> = ({navigation}) => {
    return(
        <Tab.Navigator   screenOptions={{ headerStyle:{
                backgroundColor:Colors.secondary,
                elevation:20,
                shadowColor:'black',
                shadowRadius:20,
                
            },
            headerShadowVisible:true,
            headerTintColor:Colors.background,
            headerTitle:'',
            headerRight:()=>(
                <View style={styles.headerLeft}>
                    <Text style={styles.headerLeftTitle}>admin</Text>
                    <IonIcons name="notifications-sharp" size={24} color='white' />
                </View>
                
                
            ),
            tabBarActiveTintColor:Colors.secondary,
            tabBarInactiveTintColor:'black',
            tabBarStyle:{
            backgroundColor:'white',
            position:'relative',
            
            bottom:20,
            height:60,
            marginHorizontal: 20,
            borderRadius:30,
            paddingBottom:10,
            shadowOffset:{
                height:4,
                width:4
            },
        
        }}}>
            <Tab.Screen name="SupervisorDashboard" component={SupervisorDashboard}
                options={{
                    tabBarLabel:'Dashboard',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name='view-dashboard' size={24} color={color} />
                    )
                }} />
            <Tab.Screen name="SupervisorProjectScreen" component={SupervisorProjectScreen}
                options={{
                    tabBarLabel:'Projects',
                    tabBarIcon:({color})=>(
                        <Octicons name='project' size={24} color={color} />
                    )
                }}  />
            
            <Tab.Screen name="EmployeeView" component={EmployeeView}
                options={{
                    tabBarLabel:'Employees',
                    tabBarIcon:({color})=>(
                        <FontAwersome name='users' size={24} color={color} />
                    )
                }}  />
            <Tab.Screen name="SupervisorSettings" component={SupervisorSettings}
                options={{
                    tabBarLabel:'Settings',
                    tabBarIcon:({color})=>(
                        <IonIcons name='settings-outline' size={24} color={color} />
                    )
                }}  />
        </Tab.Navigator>
    )
}

export default SupervisorTabBar

const styles = StyleSheet.create({
    headerLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginRight:30,
    },
    headerLeftTitle:{
        fontFamily:'Poppins',
        fontSize:20,
        fontWeight:'600',
        color:'white'
    }
})