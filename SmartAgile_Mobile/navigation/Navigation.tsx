import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import EmployeeLogin from '../screens/EmployeeLogin';
import SupervisorLogin from '../screens/SupervisorLogin';
import SupervisorDashboard from '../screens/Supervisor/SupervisorDashboard';
import { RootStackParamList } from './NavigationTypes';
import SupervisorTabBar from './SupervisorTabBar';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false ,gestureDirection:'horizontal' , animation:'slide_from_right',animationDuration:50}}>
        <Stack.Screen name="Welcome" component={Welcome}  />
        <Stack.Screen name="SupervisorLogin" component={SupervisorLogin}  />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLogin}  />
        <Stack.Screen name="SupervisorTabBar" component={SupervisorTabBar}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
