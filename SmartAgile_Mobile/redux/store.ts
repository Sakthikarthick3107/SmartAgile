import { AnyAction, applyMiddleware, legacy_createStore as createStore , Store } from "redux";
import reducers from "./userRedux/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "./userRedux/reducers";
import rootReducer, { RootState } from "./rootReducer";
import { thunk } from "redux-thunk";


const store : Store<RootState> = createStore(rootReducer, applyMiddleware(thunk) );

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


initializeUser()

export default store;