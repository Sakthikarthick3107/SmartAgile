import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorDashboard from "../screens/Supervisor/SupervisorDashboard";
import { NavigationType, RootStackParamList } from "./NavigationTypes";
import SupervisorProjectScreen from "../screens/Supervisor/SupervisorProjectScreen";
import Colors from "../styles/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwersome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EmployeeView from "../screens/Supervisor/EmployeeView";
import { StyleSheet, Text, View } from "react-native";
import SupervisorSettings from "../screens/Supervisor/SupervisorSettings";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProjectView from "../screens/Supervisor/ProjectView";

const Tab = createBottomTabNavigator();
const ProjectStackNavigator = createNativeStackNavigator<RootStackParamList>();

export const SupervisorProjectStack =() =>{
    return(
        
        <ProjectStackNavigator.Navigator   screenOptions={{
                                                    headerShown:false,
                                                    gestureDirection:'horizontal' , 
                                                    animation:'slide_from_bottom',
                                                    animationDuration:50
                                                        }}>
            <ProjectStackNavigator.Screen name="SupervisorProjectScreen" component={SupervisorProjectScreen}/>
            <ProjectStackNavigator.Screen name='ProjectView' component={ProjectView}/>
        </ProjectStackNavigator.Navigator>
        
    )
}

type Props = {
    navigation : NavigationType<'SupervisorTabBar'>
  }

const SupervisorTabBar : React.FC<Props> = ({navigation}) => {
    const user = useSelector(state => state.user.user);

    return(
        <Tab.Navigator   screenOptions={{ headerStyle:{
                backgroundColor:Colors.secondary,
                elevation:20,
                shadowColor:'black',
                shadowRadius:20,
                
            },
            tabBarHideOnKeyboard:true,
            headerShadowVisible:true,
            headerTintColor:Colors.background,
            headerTitle:'',
            headerTitleStyle:{
                fontWeight :'normal',
                fontSize:24
            },
            tabBarHideOnKeyboard:true,
            headerRight:()=>(
                <View style={styles.headerLeft}>
                    <Text style={styles.headerLeftTitle}>{user && user.username}</Text>
                    <IonIcons name="notifications-sharp" size={24} color='white' />
                </View>
                
                
            ),
            tabBarActiveTintColor:Colors.secondary,
            tabBarInactiveTintColor:'black',
            tabBarStyle:{
            backgroundColor:'white',
            height:60,
            paddingTop:10,
            shadowOffset:{
                height:4,
                width:4
            },
        
        }}}>
            <Tab.Screen name="SupervisorDashboard" component={SupervisorDashboard}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name='view-dashboard' size={24} color={color} />
                    )
                }} />

            <Tab.Screen name="SupervisorProjectStack" component={SupervisorProjectStack}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color})=>(
                        <Octicons name='project' size={24} color={color} />
                    )
                }}  />
            
            <Tab.Screen name="EmployeeView" component={EmployeeView}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color})=>(
                        <FontAwersome name='users' size={24} color={color} />
                    )
                }}  />
            <Tab.Screen name="SupervisorSettings" component={SupervisorSettings}
                options={{
                    tabBarLabel:'',
                    headerTitle: 'Settings',
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
        fontSize:16,
        fontWeight:'600',
        color:'white'
    }
})