import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../App.css';

const AddCandidate = () => {
  const [value, setValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const handleEmployeePageClick = ()=>{
    navigate("/ViewEmployeeList");
  };
  
  return (
    <div>

      <button type="submit" className="bg-transparent border-2 border-[#4c989d] rounded-full px-6 py-1 cursor-pointer" onClick={handleEmployeePageClick}>Back</button>

      <div className="flex justify-center items-center">
        <hr className="border border-[#4c989d] w-[38%]" />
        <span className="mx-12 text-[#4c989d] font-semibold text-3xl">Add Candidate</span>
        <hr className="border border-[#4c989d] w-[38%]" />
      </div>

      <form className="text-center">

        <div className="grid grid-cols-2 mx-28 my-10 gap-x-16 text-start">

          <table>
            <tbody>

              <tr>
                <td>Employee Name <span className="text-red-500">*</span></td>
                <td>:</td>
                <td><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><PersonIcon/></InputAdornment>)}} /></td>
              </tr>

              <tr>
                <td><div className="row-content">Employee Id <span className="text-red-500">*</span></div></td>
                <td><div className="row-content colon">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><BadgeIcon/></InputAdornment>)}} /></div></td>
              </tr>

              <tr>
                <td>Designation <span className="text-red-500">*</span></td>
                <td>:</td>
                <td><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><BadgeIcon/></InputAdornment>)}} /></td>
              </tr>

              <tr>
                <td><div className="row-content">Department <span className="text-red-500">*</span></div></td>
                <td><div className="row-content colon">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><BadgeIcon/></InputAdornment>)}} /></div></td>
              </tr>

              <tr>
                <td>Joined Date <span className="text-red-500">*</span></td>
                <td>:</td>
                <td><TextField type="date" variant="outlined" fullWidth /></td>
              </tr>

              <tr>
                <td><div className="row-content">Email <span className="text-red-500">*</span></div></td>
                <td><div className="row-content colon">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>)}} /></div></td>
              </tr>

            </tbody>
          </table>

          <table>
            <tbody>

            <tr>
                <td>Photo <span className="text-red-500">*</span></td>
                <td>:</td>
                <td>
                  <label htmlFor="image">
                    <div className="bg-gray-950 bg-opacity-15 flex justify-center items-center h-[15vh] w-[8vw]">                 
                      <FontAwesomeIcon className="" icon={faCloudUploadAlt}/>
                      <p className="font-semibold ml-4">Upload Image</p>
                      <input type="file" id="image" style={{display:'none'}} accept=".png, .jpg, .jpeg" />
                    </div>
                  </label>
                </td>
              </tr>

              <tr>
                <td><div className="row-content">Contact Number <span className="text-red-500">*</span></div></td>
                <td><div className="row-content colon">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><CallIcon/></InputAdornment>)}} /></div></td>
              </tr>

              <tr>
                <td>Date of Birth <span className="text-red-500">*</span></td>
                <td>:</td>
                <td><TextField type="date" variant="outlined" fullWidth /></td>
              </tr>

              <tr>
                <td><div className="row-content">Address <span className="text-red-500">*</span></div></td>
                <td><div className="row-content colon">:</div></td>
                <td><div className="row-content"><TextField variant="outlined" multiline rows={4} fullWidth InputProps={{startAdornment:(<InputAdornment position="start"><LocationOnIcon/></InputAdornment>)}} /></div></td>
              </tr>

            </tbody>
          </table>

        </div>

        <button type="submit" className="bg-[#4c989d] text-white rounded-full text-xl px-6 py-2">Save</button>

      </form>


      {/* <div className="main-container w-[1038px] h-[854px] ">
        <div className="w-[151px] h-[45px] bg-[#4c989d] rounded-[15px] relative z-[2] mr-0 mt-[729px] ml-[750px]">
          <span className="flex h-[31px] justify-start items-start font-['Poppins'] text-[24px] font-normal leading-[29.045px] text-white absolute top-[7px] left-[45px] text-left whitespace-nowrap z-[2]">
            Save
          </span>
        </div>
        <div className="w-[432px] h-[643px] absolute top-0 left-0 z-[45]">
          <div className="w-[96px] h-[32px] bg-transparent rounded-[50px] border-solid border-2 border-[#4c989d] relative z-[45] mt-[120px] mr-0 mb-0 ml-[374px]">
            <div className="w-[31.25%] h-[93.75%]  absolute top-[-3.13%] left-[-2.08%] z-[43]" />
            <span className="flex h-[27px] justify-start cursor-pointer items-start font-['Poppins'] text-[18px] font-normal leading-[27px] text-black absolute top-[1px] left-[34px]  text-left whitespace-nowrap z-[44]"
            onClick={handleEmployeePageClick}
            >
              Back
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[5]  mr-0 mt-[60px] ml-[445px]">
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[6]">
              Employee Name
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[23] mt-[56px] mr-0 mb-0 ml-[445px]">
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[24]">
              Employee ID
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[13] mt-[55px] mr-0 mb-0 ml-[445px]">
            <input className="w-full h-full bg-transparent border-none absolute top-0 left-0 z-[14]" />
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[24]">
              Designation
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[19] mt-[56px] mr-0 mb-0 ml-[445px]">
            <input className="w-full h-full bg-transparent border-none absolute top-0 left-0 z-[21]" />
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[24]">
              Department
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[16] mt-[56px] mr-0 mb-0 ml-[445px]">
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[17]">
              Joined Date
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[16] mt-[56px] mr-0 mb-0 ml-[445px]">
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[17]">
              E-mail id
            </span>
          </div>
        </div>
        <div className="w-[1038px] h-[720px] absolute top-[46px] left-0 z-[39]">
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[35] mt-[311px] ml-[1353px] mt-[387px] ">
            <div className="w-[35px] h-[25px] bg-[url('../assets/images/dbaaaa865bbb1c06da45daa8762b2d0f777de125.png')] bg-contain bg-no-repeat absolute top-[16px] left-[16px] z-[36]" />
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[37]">
              Contact Number
            </span>
          </div>
          <div className="w-[361px] h-[56px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[26] mt-[58px] mr-0 mb-0 ml-[1353px]">
            <div className="w-[35px] h-[25px] bg-[url('../assets/images/1e46b19fec18f706eae3fa7fe32c6bc0f4b6b0de.png')] bg-contain bg-no-repeat absolute top-[16px] left-[15px] z-[27]" />
            <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[20px] left-[65px] text-left whitespace-nowrap z-[28]">
              Birthday Date
            </span>
          </div>
          <div className="w-[361px] h-[183px] bg-[rgba(76,152,157,0.38)] rounded-[10px] relative shadow-md z-[32] mt-[56px] mr-0 mb-0 ml-[1353px]">
            <div className="w-[35px] h-[25px] bg-[url('../assets/images/0d893ea56cd3f3f5210976bd0d2fb1fca255adba.png')] bg-contain bg-no-repeat absolute top-[16px] left-[16px] z-[31]" />
            <div className="w-[267px] h-[132px] text-0 absolute top-[20px] left-[65px] z-[33]">
              <span className="block h-[16px] font-['Karla'] text-[14px] font-normal leading-[16px] text-black relative text-left whitespace-nowrap z-30 mt-0 mr-0 mb-0 ml-0">
                Address
              </span>
              <span className="flex w-[267px] h-[120px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black relative text-left whitespace-pre-wrap z-[33] mt-[15px] mr-0 mb-0 ml-0">
                401,4th Floor, #14, 15th Cross, 2nd Phase, J P Nagar, Bengaluru,
                Karnataka 560078
              </span>
            </div>
          </div>
          <div className="relative">
            <hr className="border-[#4c989d] border-t-2 w-[680px] absolute top-[-663px] ml-[280px]" />
            <hr className="border-[#4c989d] border-t-2 w-[680px] absolute top-[-663px] ml-[1200px]" />
            <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[24px] font-semibold leading-[36px] text-[#4c989d] absolute top-[-680px] ml-[990px] text-center whitespace-nowrap z-[7]">
              Add Candidate
            </span>
          </div>
          <span className="flex h-[36px] justify-start items-start font-['Poppins'] text-[24px] font-semibold leading-[36px] text-[#4c989d] absolute top-[166px] ml-[890px] text-center whitespace-nowrap z-[7]">
                Add Candidate
              </span>
          <div className="flex w-[1038px] h-0 justify-between items-center flex-nowrap absolute top-[18px] left-0 z-[8]">
            <div className="w-[381.403px] h-[3.403px] shrink-0 bg-[url('../assets/images/9b3b7457-7646-4902-b20c-50a59261ff9d.png')] bg-cover bg-no-repeat relative z-[9]" />
            <div className="w-[379.403px] h-[3.403px] shrink-0 bg-[url('../assets/images/f1cf841d-8ad2-4b30-b87d-fd2d76158596.png')] bg-cover bg-no-repeat relative z-10" />
          </div>
          <div className="w-[163px] h-[166px] bg-[rgba(76,152,157,0.38)] rounded-[10px] absolute top-[160px] ml-[1453px] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] z-[38]" />
          <span className="flex h-[16px] justify-start items-start font-['Karla'] text-[14px] font-normal leading-[16px] text-black absolute top-[240px] left-[1490px] text-left whitespace-nowrap z-[39]">
            Upload Image
          </span>
        </div>
      </div> */}


    </div>
  );
};

export default AddCandidate;