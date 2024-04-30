import { createStore , Store } from "redux";
import reducers from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "./reducers";

async function initializeUser(){
    try {
        const user = await AsyncStorage.getItem('user');
        if(user){
            const userData = JSON.parse(user);
            store.dispatch({
                type : 'SET_USER',
                payload : userData
            })
            console.log(user)
        }
    } catch (error) {
        console.error('Cannot get user details')
    }
}

const store : Store<State> = createStore(reducers,initializeUser());

export default store;