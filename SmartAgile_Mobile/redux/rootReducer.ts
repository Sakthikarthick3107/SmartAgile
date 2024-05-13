import { combineReducers } from "redux";
import  {projectReducer}  from "./projectsRedux/projectReducer";
import reducers from "./userRedux/reducers";

const rootReducer = combineReducers({
    project : projectReducer,
    user : reducers
})


export default rootReducer;


export type RootState = ReturnType<typeof rootReducer>
