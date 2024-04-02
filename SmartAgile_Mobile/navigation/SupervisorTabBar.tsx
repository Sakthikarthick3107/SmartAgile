import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupervisorDashboard from "../screens/Supervisor/SupervisorDashboard";
import { NavigationType } from "./NavigationTypes";
import SupervisorProjectScreen from "../screens/Supervisor/SupervisorProjectScreen";
import Colors from "../styles/Colors";


const Tab = createBottomTabNavigator()

type Props = {
    navigation : NavigationType<'SupervisorTabBar'>
  }

const SupervisorTabBar : React.FC<Props> = ({navigation}) => {
    return(
        <Tab.Navigator screenOptions={{headerShown:false ,
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
            <Tab.Screen name="SupervisorDashboard" component={SupervisorDashboard}/>
            <Tab.Screen name="SupervisorProjectScreen" component={SupervisorProjectScreen}/>
        </Tab.Navigator>
    )
}

export default SupervisorTabBar