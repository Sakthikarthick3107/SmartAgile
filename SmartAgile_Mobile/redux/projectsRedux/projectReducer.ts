import { Project, SET_PROJECT } from "./projectAction";


type State = {
    project : {} | Project
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