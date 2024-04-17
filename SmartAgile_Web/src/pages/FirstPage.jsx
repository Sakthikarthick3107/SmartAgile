import React from 'react'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';



const FirstPage = () => {
    const navigate = useNavigate(); 

    const handleOrganizationClick = () => {
        // Navigate to the Register page
        navigate('/Login');
    };
  return (
    <div className='bg-bgfirst w-[100vw] h-[100vh] pt-[60px] flex' >
        <div className=''>

        </div>
        <div className='w-[40%] m-auto bg-white h-[80vh] rounded-3xl basis-35 '>

            <div className="flex justify-center mt-6">
                        <img src={logo} alt="Logo" className="w-80" />
            </div>
            <div>
                <h1 className='text-6xl mt-10 text-center'>Smart Agile</h1>
            </div>
            <div className='flex flex-col w-[50%] gap-5  mt-32 ml-[25%] text-white text-xl'>
                <button onClick={handleOrganizationClick} className=' bg-bgfirst py-4'>Organization</button>
                <button  className=' bg-bgfirst py-4'>Personal</button>
            </div>

            
        </div>
      
    </div>
  )
}

export default FirstPage;
