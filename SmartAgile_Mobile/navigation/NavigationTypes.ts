import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";


export type RootStackParamList = {
    Welcome : undefined;
    SupervisorLogin : undefined;
    EmployeeLogin : undefined;
    SupervisorDashboard : undefined
}

export type NavigationType<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList , T>;

export type RouteType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;