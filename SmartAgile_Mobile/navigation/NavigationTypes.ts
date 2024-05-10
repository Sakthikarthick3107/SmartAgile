import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";


export type RootStackParamList = {
    Welcome : undefined;
    OrganizationLogin : undefined;
    ForgetPassword : undefined;
    NewOrganization : undefined;
    PersonalLogin : undefined;
    SupervisorTabBar : undefined;
    SupervisorProjectScreen : undefined;
    //SupervisorMenu : undefined;
    ProjectView : {projId : number};
    SupervisorSettings:undefined;
    SupervisorProfile  : undefined;
}

export type NavigationType<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList , T>;

export type RouteType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;