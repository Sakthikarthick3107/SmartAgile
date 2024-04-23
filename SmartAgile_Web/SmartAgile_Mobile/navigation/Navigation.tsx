import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import PersonalLogin from '../screens/PersonalLogin';
import OrganizationLogin from '../screens/OrganizationLogin';
import { RootStackParamList } from './NavigationTypes';
import { useSelector } from 'react-redux';
import SupervisorTabBar from './SupervisorTabBar';
import NewOrganization from '../screens/NewOrganization';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const user = useSelector(state  => state.user);
  return (
    <NavigationContainer>
      {user ?
        <Stack.Navigator initialRouteName="SupervisorTabBar" screenOptions={{headerShown:false ,gestureDirection:'horizontal' , animation:'slide_from_right',animationDuration:50}}>
            <Stack.Screen name="SupervisorTabBar" component={SupervisorTabBar}  />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false ,gestureDirection:'horizontal' , animation:'slide_from_right',animationDuration:50}}>
          <Stack.Screen name="Welcome" component={Welcome}  />
          <Stack.Screen name="OrganizationLogin" component={OrganizationLogin}  />
          <Stack.Screen name='NewOrganization' component={NewOrganization}/>
        <Stack.Screen name="PersonalLogin" component={PersonalLogin}  />
        
      </Stack.Navigator>
    }
      
    </NavigationContainer>
  );
};

export default Navigation;
