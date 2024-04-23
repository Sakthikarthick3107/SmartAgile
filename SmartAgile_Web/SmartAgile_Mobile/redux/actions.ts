export const SET_USER : string = 'SET_USER';

interface UserData{
    username : string;
    email:string;
    is_staff : boolean
}

export const setUser = (userData : UserData) => ({
    type : SET_USER,
    payload : userData
})