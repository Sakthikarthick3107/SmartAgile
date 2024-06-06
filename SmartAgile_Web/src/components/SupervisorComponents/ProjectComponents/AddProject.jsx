import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {TextField, IconButton, Select, MenuItem, Avatar, Button} from '@mui/material';
import { styled } from '@mui/system';
import '../../../App.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {faCloudUploadAlt, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
// import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddProject = () => {
 
  const navigate = useNavigate();
  const baseURL = 'http://127.0.0.1:8000';

  // const handleClick = ()=>{
  //   navigate('/sprojects');
  // }

  const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root':{
      '& input':{
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.2)'
      },
    },
  });

  const [formData, setFormData] = useState({
    projectName: '',
    deadline: '',
    status: '',
    description: '',
  });

  const [teamMembers, setTeamMembers] = useState([{profile: '', role_within_project: ''}]);
  const [prdFile, setPrdFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [organizationMembers, setOrganizationMembers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleTeamMemberChange = (index,e) => {
    const { name, value } = e.target;
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][name] = value;
    setTeamMembers(newTeamMembers);
  };

  const addTeamMemberRow = () => {
    setTeamMembers([...teamMembers, {profile: '', role_within_project: ''}]);
  };

  const handleFileChange = (e) => {
    const {files} = e.target;
    const name = files[0];
    if(name.name.endsWith('.pdf')){
      setPrdFile(files[0]);
    }else if(name.name.endsWith('.png') || name.name.endsWith('.jpg') ||name.name.endsWith('.jpeg')){
      setIconFile(files[0]);
    }
  };

  const handleRemoveFile = (fileType) => {
    if(fileType === 'prdFile'){
      setPrdFile(null);
    }else if(fileType === 'iconFile'){
      setIconFile(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('projectName', formData.projectName);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('teamMembers', JSON.stringify(teamMembers));
    if(prdFile){
      formDataToSend.append('prdFile', prdFile);
    }
    if(iconFile){
      formDataToSend.append('iconFile', iconFile);
    }

    console.log(formDataToSend);

    const form = {
      proj_name : formData.projectName,
      proj_deadline: formData.deadline,
      proj_status: formData.status,
      proj_desc: formData.description,
      icon: iconFile,
      prd: prdFile
    }
    
    console.log(JSON.stringify(teamMembers));

    console.log(form)

    // try{
    //   const response = await fetch(`${baseURL}/projects/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   })
    // } catch (error) {}
  };

  const OrganizationId = JSON.parse(localStorage.getItem('org_id'));

  useEffect(() => {
    const fetchOrganizationMembers = async () => {
      try{
        const response = await fetch(`${baseURL}/users/employee/profile/${OrganizationId}/`);
        const data = await response.json();
        setOrganizationMembers(data);
      } catch(error) {
        console.log('Error fetching Organization Members', error);
      }
    }
    fetchOrganizationMembers();
  }, [OrganizationId]);

  const handleFileClick = (file) => {
    const fileURL  = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };


  return (
    <div className="bg-white py-6 px-6 w-[100%] h-[100%]">
      <button onClick={() => navigate(-1)} className="text-md mb-4 px-4 py-0 bg-[#4D989D]">Back</button>
      <h1 className="text-3xl text-black">Create New Project</h1>

      <div className="mx-20 mt-8">
        <form onSubmit={handleSubmit}>
          <table>

            <tbody>

              <tr>
                <td className="text-black text-xl">Project Name</td>
                <td className="text-black text-xl">:</td>
                <td><TextField variant="outlined" fullWidth name="projectName" value={formData.projectName} onChange={handleInputChange} placeholder="Enter your Project Name" InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2)', backgroundColor: 'rgba(0,0,0,0.2)'}}}/></td>
              </tr>

              <tr>
                <td className="text-black text-xl w-[20%]"><div className='row-content'>Deadline</div></td>
                <td className="text-black text-xl"><div className='row-content colon'>:</div></td>
                <td className="w-[88%]"><div className="row-content"><CustomTextField type="date" variant="outlined" name="deadline" value={formData.deadline} onChange={handleInputChange} fullWidth InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2)'}}}/></div></td>
              </tr>

              <tr>
                <td className="text-black text-xl">Status</td>
                <td className="text-black text-xl">:</td>
                <td>
                  <Select fullWidth name="status" value={formData.status} onChange={handleInputChange} sx={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2'}}>
                    <MenuItem value='PL'>Planned</MenuItem>
                    <MenuItem value='IP'>InProgress</MenuItem>
                    <MenuItem value='OH'>On Hold</MenuItem>
                  </Select>
                </td>
              </tr>

              <tr>
                <td className="text-black text-xl"><div className="row-content">Team Members & Role</div></td>
                <td className="text-black text-xl"><div className="row-content">:</div></td>
                <td>
                  <div className="row-content">
                    <table>
                      <thead>
                        <tr className="bg-gray-600">
                          <th>Team Members</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((teamMember, index) => (
                          <tr key={index}>
                            <td>
                              <Select 
                                id="outlined" 
                                name="profile" 
                                fullWidth 
                                value={teamMember.profile} 
                                onChange={(e) => {
                                  handleTeamMemberChange(index,e);
                                }} 
                                sx={{backgroundColor: 'rgba(209,213,219)', outline: "none", width: '30vw', height: '50px', overflow: 'hidden'}}
                              >
                                  {organizationMembers.map((members) => (
                                    <MenuItem key={members.id} value={members.id}>
                                      <div className="flex flex-nowrap items-center">
                                        <Avatar src={`${baseURL}/media/${members.image}`} alt="Profile" 
                                        // sx={{width: '30px', height: '30px'}}
                                        />
                                        <p className="ml-3">{members.username}</p>
                                      </div>
                                    </MenuItem>
                                  ))}
                              </Select>
                            </td>
                            <td>
                              <TextField variant="outlined" name="role_within_project" value={teamMember.role_within_project} onChange={(e) => handleTeamMemberChange(index,e)} InputProps={{style:{backgroundColor: 'rgba(209,213,219)', width: '30vw', height: '50px'}}}/>
                              {/* <input type="text" name="role" value={teamMember.role} onChange={(e) => handleTeamMemberChange(index,e)} className="focus:outline-none p-1 w-[30vw] text-black bg-gray-300 border-2 border-gray-300" /> */}
                            </td>
                          </tr>
                        ))}
                        {/* <tr>
                          <td><input type="text" className="focus:outline-none p-1 w-[30vw] text-black bg-gray-300"/></td>
                          <td><input type="text" className="focus:outline-none p-1 w-[30vw] text-black bg-gray-300"/></td>
                        </tr>
                        <tr>
                          <td><input type="text" className="focus:outline-none p-1 w-[30vw] text-black bg-gray-300"/></td>
                          <td><input type="text" className="focus:outline-none p-1 w-[30vw] text-black bg-gray-300"/></td>
                        </tr> */}
                      </tbody>
                    </table>
                    <div className="flex justify-end">
                      <IconButton onClick={addTeamMemberRow}>
                        <FontAwesomeIcon icon={faPlus} className="text-md"/>
                      </IconButton>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="text-black text-xl"><div className="row-content">Description</div></td>
                <td className="text-black text-xl"><div className="row-content">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" name="description" value={formData.description} onChange={handleInputChange} fullWidth multiline rows={4} placeholder="Write a detailed description about your project" InputProps={{style:{borderRadius: '5px', border: '1px solid rgba(192,192,192,0.2)', backgroundColor: 'rgba(0,0,0,0.2)'}}}/></div></td>
              </tr>

              <tr>
                <td className="text-black text-xl"><div className='row-content'>Add PRD</div></td>
                <td className="text-black text-xl"><div className='row-content colon'>:</div></td>
                <td>
                  {prdFile ? (
                    <div className="flex items-center space-x-2">
                      <p className="text-black bg-red-400 rounded-md p-2 cursor-pointer" onClick={() => handleFileClick(prdFile)}>{prdFile.name}</p>
                      <IconButton onClick={() => handleRemoveFile('prdFile')}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </IconButton>
                    </div>
                  ) : (
                    <label htmlFor="prdFile">
                      <div className="row-content bg-white rounded-md drop-shadow-2xl flex justify-center items-center h-[17vh] cursor-pointer">                 
                        <FontAwesomeIcon className="text-7xl text-black bg-red" icon={faCloudUploadAlt}/>
                        <input type="file" id="prdFile" onChange={handleFileChange} style={{display:'none'}} accept=".pdf, .doc, .docx" />
                      </div>
                    </label>
                  )}
                </td>
              </tr>

              <tr>
                <td className="text-black text-xl"><div className='row-content'>Icon</div></td>
                <td className="text-black text-xl"><div className='row-content colon'>:</div></td>
                <td>
                  {iconFile ? (
                    <div className="flex items-center space-x-2">
                      <img src={URL.createObjectURL(iconFile)} alt="Selected Icon" className="h-[80px]" />
                      <IconButton onClick={() => handleRemoveFile('iconFile')}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </IconButton>
                    </div>
                  ) : (
                    <div className="row-content bg-white rounded-md drop-shadow-2xl flex justify-center items-center h-[8vh] w-[6vw]">
                      <label htmlFor="iconFile">                   
                        <AddPhotoAlternateIcon sx={{color: 'black', textAlign: 'center', cursor: 'pointer'}}/>
                        <input type="file" id="iconFile" onChange={handleFileChange} style={{display:'none'}} accept=".png, .jpg, .jpeg" /> 
                      </label>               
                    </div>  
                  )}             
                </td>
              </tr>

            </tbody>

          </table>

          <div className="text-center mt-7">
            <input className="bg-[#4D989D] cursor-pointer text-white px-5 py-3 text-3xl rounded-md" type="submit" value="Create" />
          </div>

        </form>
      </div>
      
      
      
      
      
      
      
      
      
      {/* <div className="main-container w-[888px] h-[827px] text-[0px] relative mx-auto my-0">
      <div className="w-[96px] h-[32px] bg-transparent rounded-[50px] border-solid border-2 border-[#4c989d] relative z-[45] mt-[0px] mr-0 mb-0 ml-[-250px]">
          <div className="w-[31.25%] h-[93.75%]  absolute top-[-3.13%] left-[-2.08%] z-[43]" />
          <span 
          onClick={handleClick}
          className="flex h-[27px] cursor-pointer justify-start items-start font-['Poppins'] text-[18px] font-normal leading-[27px] text-black absolute top-[1px] left-[4px]  text-left whitespace-nowrap z-[44]">
          <span 
          onClick={handleClick}
          className="m-[1px] cursor-pointer text-black mr-1">
              <ArrowCircleLeftOutlinedIcon />
            </span>
            Back
          </span>
        </div>
        <span className="flex w-[387px] h-[90px] justify-start items-start font-['Poppins'] text-[32px] font-medium leading-[48px] text-[#000] relative text-left z-[1] mt-[29px] mr-0 mb-0 ml-[-249px]">
          Create New Project
        </span>
        <div className="ml-[-220px]">
        <div className="w-[863px] h-[42px] relative z-[11] mt-[6px] mr-0 mb-0 ml-[24px]">
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-0 left-0 text-left whitespace-nowrap z-[2]">
            Project Name
          </span>
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-0 left-[289px] text-left whitespace-nowrap z-[8]">
            :
          </span>
          <div className="w-[863.006px] h-[6.051px] bg-[url(../assets/images/22548e53-655c-406a-a7db-0f75dd131a9d.png)] bg-cover bg-no-repeat absolute top-[30px] left-[-0.01px] z-[11]" />
        </div>
        <div className="w-[863px] h-[45px] relative z-[39] mt-[12px] mr-0 mb-0 ml-[24px]">
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-0 left-[289px] text-left whitespace-nowrap z-[9]">
            :
          </span>
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-[3px] left-0 text-left whitespace-nowrap z-[4]">
            Deadline
          </span>
          <span className="flex h-[25px] justify-start items-start font-['Poppins'] text-[22px] font-light leading-[20px] text-[rgba(0,0,0,0.5)] absolute top-[14px] left-[307px] text-left whitespace-nowrap z-[39]">
            DD\MM\YY
          </span>
          <div className="w-[863.006px] h-[6.051px] bg-[url(../assets/images/a3253612-3b29-41a9-9c80-9ceb489f3b40.png)] bg-cover bg-no-repeat absolute top-[36px] left-[-0.01px] z-[12]" />
        </div>
        <div className="w-[864px] h-[127px] relative z-[16] mt-[9px] mr-0 mb-0 ml-[24px]">
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-0 left-[289px] text-left whitespace-nowrap z-[13]">
            :
          </span>
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-[3px] left-0 text-left whitespace-nowrap z-[7]">
            Team Members 
          </span>
          <div className="w-[560px] h-[120px] bg-[#fff] absolute top-[7px] left-[304px] z-[16]">
            <div className="w-[560px] h-[40px] relative z-[23] mt-0 mr-0 mb-0 ml-0">
              <div className="w-[280px] h-[40px] bg-[#fff] absolute top-0 left-0 z-[17]">
                <div className="w-[280px] h-[40px] bg-[#e4e4e4] rounded-tl-[4px] rounded-tr-none rounded-br-none rounded-bl-none border-solid border border-[#818181] absolute top-0 left-0 z-[18]">
                  <div className="w-[18.75px] h-[18.75px] bg-[url(../assets/images/66e74712-cfe0-4960-9cc0-3c71dd6d7e10.png)] bg-[length:100%_100%] bg-no-repeat relative z-20 mt-[11px] mr-0 mb-0 ml-[253px]" />
                </div>
              </div>
              <button className="w-[280px] h-[40px] bg-[#fff] border-none absolute top-0 left-[280px] z-[21] pointer">
                <div className="w-[280px] h-[40px] bg-[#e4e4e4] rounded-tl-none rounded-tr-[4px] rounded-br-none rounded-bl-none border-solid border border-[#818181] absolute top-0 left-0 z-[22]" />
              </button>
              <span className="flex h-[18px] justify-start items-center font-['Inter'] text-[20px] font-normal leading-[18px] text-[#000] absolute top-[10px] left-[56px] text-left whitespace-nowrap z-[19]">
                Team Members
              </span>
              <span className="flex w-[260px] h-[18px] justify-end items-center font-['Inter'] text-[20px] font-normal leading-[18px] text-[#000] absolute top-[10px] left-[165px] text-right whitespace-nowrap z-[23]">
                Role
              </span>
            </div>
            <div className="w-[560px] h-[40px] relative z-[26] mt-0 mr-0 mb-0 ml-0">
              <div className="w-[280px] h-[40px] bg-[#fff] absolute top-0 left-0 z-[24]">
                <div className="w-[280px] h-[40px] bg-[#fff] border-solid border border-[#818181] absolute top-0 left-0 z-[25]" />
              </div>
              <div className="w-[280px] h-[40px] bg-[#fff] absolute top-0 left-[280px] z-[26]">
                <div className="w-[280px] h-[40px] bg-[#fff] border-solid border border-[#818181] absolute top-0 left-0 z-[27]" />
              </div>
            </div>
            <div className="w-[560px] h-[40px] relative z-30 mt-0 mr-0 mb-0 ml-0">
              <div className="w-[280px] h-[40px] bg-[#fff] absolute top-0 left-0 z-[28]">
                <div className="w-[280px] h-[40px] bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-[4px] border-solid border border-[#818181] absolute top-0 left-0 z-[29]" />
              </div>
              <div className="w-[280px] h-[40px] bg-[#fff] absolute top-0 left-[280px] z-30">
                <div className="w-[280px] h-[40px] bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[4px] rounded-bl-none border-solid border border-[#818181] absolute top-0 left-0 z-[31]" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[371px] h-[54px] relative z-[32] mt-[27px] mr-0 mb-0 ml-[24px]">
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-0 left-0 text-left whitespace-nowrap z-[5]">
            Icon
          </span>
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-0 left-[289px] text-left whitespace-nowrap z-[14]">
            :
          </span>
          <div className="w-[64px] h-[54px] bg-[#d9d9d9] absolute top-0 left-[307px] z-[32]" />
        </div>
        <div className="w-[858px] h-[171px] relative z-[33] mt-[26px] mr-0 mb-0 ml-[24px]">
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-0 left-[289px] text-left whitespace-nowrap z-[15]">
            :
          </span>
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-[5px] left-0 text-left whitespace-nowrap z-[3]">
            Description
          </span>
          <div className="w-[551px] h-[153px] bg-[#f8f8ff] rounded-[10px] border-solid border-[0.5px] border-[#000] absolute top-[18px] left-[307px] z-[33]">
            <span className="flex w-[283px] h-[45px] justify-start items-start font-['Poppins'] text-[15px] font-light leading-[22.5px] text-[#000] absolute top-[0.5px] left-[7.5px] text-left z-[34]">
              Write your Project Description
            </span>
          </div>
        </div>
        <div className="w-[582px] h-[103px] relative z-[35] mt-[42px] mr-0 mb-0 ml-[24px]">
          <div className="w-[266px] h-[103px] bg-[#f8f8ff] rounded-[10px] border-solid border-[0.5px] border-[#000] absolute top-0 left-[314px] box-content">
            <div className="w-[49px] h-[44px] bg-[url(../assets/images/a99ba72e-b314-407a-8c07-83312696500c.png)] bg-cover bg-no-repeat relative overflow-hidden z-[36] mt-[21px] mr-0 mb-0 ml-[24px]" />
          </div>
          <span className="flex h-[42px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[42px] text-[#000] absolute top-[6px] left-0 text-left whitespace-nowrap z-[6]">
            Add PRD
          </span>
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[28px] font-normal leading-[36px] text-[#000] absolute top-[9px] left-[283px] text-left whitespace-nowrap z-10">
            :
          </span>
          <span className="flex h-[26px] justify-start items-start font-['Poppins'] text-[24px] font-light leading-[20px] text-[#000] absolute top-[27px] left-[397px] text-left whitespace-nowrap z-[35]">
            Upload Files
          </span>
        </div>
        </div>
        <button className="w-[151px] h-[45px] bg-[#4c989d] rounded-[15px] border-none relative z-[38] pointer mt-[28px] mr-0 mb-0 ml-[292px]">
          <span className="flex h-[31px] justify-start items-start font-['Inter'] text-[24px] font-normal leading-[29.045px] text-[#fff] absolute top-[7px] left-[33px] text-left whitespace-nowrap z-[38]">
            Create
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default AddProject;