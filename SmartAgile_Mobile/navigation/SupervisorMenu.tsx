
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SupervisorProfile from '../screens/Supervisor/SupervisorProfile';
import SupervisorDashboard from '../screens/Supervisor/SupervisorDashboard';
import SupervisorProjectScreen from '../screens/Supervisor/SupervisorProjectScreen';
import EmployeeView from '../screens/Supervisor/EmployeeView';
import SupervisorSettings from '../screens/Supervisor/SupervisorSettings';
import { NavigationType } from "./NavigationTypes";
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import Colors from '../styles/Colors';
import { useSelector } from "react-redux";
import IonIcons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

type Props = {
    navigation : NavigationType<'SupervisorMenu'>
  }

const SupervisorMenu : React.FC<Props> = ({navigation}) => {
    const user = useSelector(state => state.user);

  return (
    <Drawer.Navigator screenOptions={{ headerStyle:{
        backgroundColor:Colors.secondary,
        elevation:20,
        shadowColor:'black',
        shadowRadius:20,
        
    },
    headerShadowVisible:true,
    headerTintColor:Colors.background,
    headerTitle:'',
    headerTitleStyle:{
        fontWeight :'normal',
        fontSize:24
    },
    headerRight:()=>(
        <View style={styles.headerLeft}>
            <Text style={styles.headerLeftTitle}>{user && user.username}</Text>
            <IonIcons name="notifications-sharp" size={24} color='white' />
        </View>
        
        
    ),
    drawerActiveBackgroundColor:Colors.secondary,
    drawerActiveTintColor: Colors.White
    }} >
        <Drawer.Screen name='Dashboard' component={SupervisorDashboard}/>
        <Drawer.Screen name='Projects' component={SupervisorProjectScreen}/>
        <Drawer.Screen name='Employees' component={EmployeeView}/>
      <Drawer.Screen name="Settings" component={SupervisorSettings} />
      {/* <Drawer.Screen name="About" component={Article} /> */}
      {/* <Drawer.Screen name="Profile" component={SupervisorProfile} /> */}
    </Drawer.Navigator>
  );
}

export default SupervisorMenu;

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