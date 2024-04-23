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