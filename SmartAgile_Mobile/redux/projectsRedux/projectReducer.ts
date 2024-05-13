import { ProjectType, SET_PROJECT } from "./projectAction";


type State = {
    project : {} | ProjectType
}

const initialState : State ={
    project : {}
}

export const projectReducer = (state = initialState , action  : any)  =>{
    switch(action.type){
        case SET_PROJECT:
            
            return {
                ...state,
                project : action.payload
            }
        default:
            return state
    }
}