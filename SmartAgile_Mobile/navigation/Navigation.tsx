import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import EmployeeLogin from '../screens/EmployeeLogin';
import SupervisorLogin from '../screens/SupervisorLogin';
import SupervisorDashboard from '../screens/Supervisor/SupervisorDashboard';
import { RootStackParamList } from './NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorLogin" component={SupervisorLogin} options={{headerShown: false}} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} options={{headerShown: false}} />
        <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
