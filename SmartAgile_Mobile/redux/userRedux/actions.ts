import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_USER : string = 'SET_USER';

interface UserData{
    username : string;
    email:string;
    organization:number;
    is_owner:boolean;
    is_staff : boolean;
    

}

export const setUser = (userData : UserData) => ({
    type : SET_USER,
    payload : userData
})



// export const initializeUser = () => {
//     return  async(dispatch : any) =>{
//         try {
//             const user = await AsyncStorage.getItem('user');
//             if(user){
//                 const userData = JSON.parse(user);
//                 dispatch(setUser(userData))
//                 console.log(user)
//             }
//         } catch (error) {
//             console.error('Cannot get user details')
//         }
//     }
// }