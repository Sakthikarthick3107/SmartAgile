import { baseUrl } from "../../env";

export const SET_PROJECT = 'SET_PROJECT';


export type ProjectType = {
    proj_id: string,
    icon: string,
    proj_name: string,
    proj_deadline: string,
    proj_desc: string,
    status: string,
    organization: number
  }

export const setProjectData = (project : ProjectType) =>({
    type : SET_PROJECT,
    payload : project
})


export const fetchProjectData = (projectId : number) =>{
    return async(dispatch : any) =>{
        try {
            const fetchProject = await fetch(`${baseUrl}/projects/${projectId}`);
            const projectResponse = await fetchProject.json();
            console.log(projectResponse);
            
            dispatch(setProjectData(projectResponse));
        } catch (error) {
            console.log('Failed to fetch');
            
        }
    }
}