import React, { useEffect, useState } from 'react';
import {TextField, Select, MenuItem, IconButton} from '@mui/material';
import { styled } from '@mui/system';
import '../../../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const  AddTaskTeamMembers = ({ projectId, projectName, assignedTo, assignedId }) => {
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskAttachments, setTaskAttachments] = useState(null);

  const userId = JSON.parse(localStorage.getItem('user_id'));

  useEffect(() => {
    const fetchTaskAssignee = async () => {
      try{
        const response = await fetch(`http://127.0.0.1:8000/users/employee/profile/user-details/${userId}/`);
        const data = await response.json();
        setTaskAssignee(data.id);
        setFormData(prevFormData => ({
          ...prevFormData,
          assigned_by: data.id,
        }));
        // if(Array.isArray(data) && data.length > 0){
        //   const TaskAssigneeData = data[0];
        //   const TaskAssigneeId = TaskAssigneeData.profile;
        //   setTaskAssignee(TaskAssigneeId);
        //   setFormData(prevFormData => ({
        //     ...prevFormData,
        //     assigned_by: TaskAssigneeId,
        //   }));
        // }else{
        //   console.log('Error getting Task Assignee Id');
        // }
      }catch (error) {
        console.error('Error fetching Task Assignee');
      }
    }
    fetchTaskAssignee();
  }, [userId,projectId]);

  const [formData, setFormData] = useState({
    task_name: '',
    task_deadline: '',
    task_priority: '',
    task_desc: '',
    status: '',
    assigned_to:assignedId,
    project: parseInt(projectId),
    assigned_by: taskAssignee
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const {files} = e.target;
    const name = files[0];
    if(name){
      setTaskAttachments(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setTaskAttachments(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('task_name', formData.task_name);
      formDataToSend.append('task_deadline', formData.task_deadline);
      formDataToSend.append('task_priority', formData.task_priority);
      formDataToSend.append('task_desc', formData.task_desc);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('assigned_to', formData.assigned_to);
      formDataToSend.append('project', formData.project);
      formDataToSend.append('assigned_by', formData.assigned_by);
      if(taskAttachments){
        formDataToSend.append('attachments', taskAttachments);
      }

      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        body: formDataToSend,
      });

      console.log((response.json()))

      if (response.ok) {
        console.log('Task created successfully!');    
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root':{
      '& input':{
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
    },
  });

  const handleFileClick = (file) => {
    const fileURL  = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };
  
  return (
    <div className="w-[100%] border mt-1 p-5">
      <div>
        <h1 className="text-2xl text-black font-bold mb-4">Add New Task - {projectName}</h1>
      </div>
      <form onSubmit={handleSubmit}>

        <table className='table-auto'>
          <tbody>
            <tr>
              <td className='text-black'>Task Name<span className="text-red-500">*</span></td>
              <td className='text-black'>:</td>
              <td><TextField variant='outlined' id='taskName' value={formData.task_name} onChange={handleInputChange} name='task_name' multiline rows={2} placeholder='Enter your Task Name' fullWidth InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2)', backgroundColor: 'rgba(0,0,0,0.2)'}}}/></td>
              {/* <td><CustomTextField variant='outlined' id='taskName' value={formData.task_name} onChange={handleInputChange} name='task_name' placeholder='Enter your Task Name' fullWidth InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}}/></td> */}
            </tr>

            <tr>
              <td className='text-black'><div className='row-content'>Deadline<span className="text-red-500">*</span></div></td>
              <td className='text-black'><div className='row-content colon'>:</div></td>
              <td className='w-[87%]'><div className='row-content'><CustomTextField type='date' variant='outlined' id='taskDeadline' value={formData.task_deadline} onChange={handleInputChange} name='task_deadline' fullWidth InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}}/></div></td>
            </tr>

            <tr>
              <td className='text-black'>Assign To</td>
              <td className='text-black'>:</td>
              <td><CustomTextField variant='outlined' id='assignedTo' fullWidth value={assignedTo} disabled InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}}/></td>
            </tr>

            <tr>
              <td className='text-black'><div className='row-content'>Priority<span className="text-red-500">*</span></div></td>
              <td className='text-black'><div className='row-content'>:</div></td>
              <td>
                <div className='row-content'>
                  <Select fullWidth defaultValue={'LOW'} id='taskPriority' value={formData.task_priority} onChange={handleInputChange} name='task_priority' sx={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}>
                    <MenuItem value='LOW'>Low</MenuItem>
                    <MenuItem value='MED'>Medium</MenuItem>
                    <MenuItem value='HIGH'>High</MenuItem>
                  </Select>
                </div>
              </td>
            </tr>

            <tr>
              <td className='text-black'><div className='mb-[10px]'>Status<span className="text-red-500">*</span></div></td>
              <td className='text-black'><div className='mb-[10px]'>:</div></td>
              <td>
                <div className='row-content'>
                  <Select fullWidth defaultValue={'Todo'} id='status' value={formData.status} onChange={handleInputChange} name='status'  sx={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}>
                    <MenuItem value='Todo'>To-do</MenuItem>
                    <MenuItem value='Progress'>Inprogress</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                  </Select>
                </div>
              </td>
              {/* <td><div className='mb-[10px]'><CustomTextField variant='outlined' fullWidth InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}}/></div></td> */}
            </tr>

            <tr>
              <td className='text-black'>Description<span className="text-red-500">*</span></td>
              <td className='text-black'>:</td>
              <td><TextField variant='outlined' value={formData.task_desc} onChange={handleInputChange} name='task_desc' fullWidth multiline rows={3} placeholder='Write detailed information about the task' InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2)', backgroundColor: 'rgba(0,0,0,0.2)'}}}/></td>
            </tr>

            <tr>
                <td className="text-black text-xl"><div className='row-content'>Attachments</div></td>
                <td className="text-black text-xl"><div className='row-content colon'>:</div></td>
                <td>
                  {taskAttachments ? (
                    <div className="flex items-center space-x-2">
                      <p className="text-black bg-red-400 rounded-md p-2 cursor-pointer" onClick={() => handleFileClick(taskAttachments)}>{taskAttachments.name}</p>
                      <IconButton onClick={() => handleRemoveFile()}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </IconButton>
                    </div>
                  ) : (
                    <label htmlFor="task-attachments">
                      <div className="row-content bg-white rounded-md drop-shadow-2xl flex justify-center items-center h-[10vh] cursor-pointer">                 
                        <FontAwesomeIcon className="text-7xl text-black bg-red" icon={faCloudUploadAlt}/>
                        <p className="text-black text-3xl font-semibold ml-4">Upload Files</p>
                        <input type="file" id="task-attachments" onChange={handleFileChange} style={{display:'none'}} />
                      </div>
                    </label>
                  )}
                </td>
              </tr>
          </tbody>
        </table>
     

        
        <div className="text-center mt-7">
          <input className="bg-[#4D989D] text-white px-5 py-3 rounded-md" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default AddTaskTeamMembers;
