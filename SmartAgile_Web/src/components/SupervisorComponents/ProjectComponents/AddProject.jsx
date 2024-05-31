import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const AddProject = () => {
 
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/sprojects')
  }


  return (
    <div>
      <div className="main-container w-[888px] h-[827px] text-[0px] relative mx-auto my-0">
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
      </div>
    </div>
  );
};

export default AddProject;