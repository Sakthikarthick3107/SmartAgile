// // import React from 'react';

// // function SProjectCard({ project,onClick }) {
// //     const baseUrl = 'http://127.0.0.1:8000';
// //     console.log(project)
// //     return (
// //         <div  onClick={() => onClick(project)} className="cursor-pointer">
// //         <div className="pt-8 ">
// //           <div className="flex flex-col items-start p-4 bg-white rounded-lg border shadow-xl w-[400px] h-670">
// //             <div className="flex gap-2 items-center">
// //               <img
// //                 src={`${baseUrl}/${project.icon}`}
// //                 alt={`${project.proj_name} icon`}
// //                 className="shrink-0 shadow-sm w-16 h-16 rounded-full"
// //               />
// //               <div className="flex flex-col ml-2">
// //                 <div className="flex gap-2 items-center text-xl text-black font-bold mb-2">
// //                   <div className="grow">{project.proj_name}</div>
// //                 </div>
// //                 <div className="text-md text-black opacity-90">
// //                 {project.proj_desc}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="mt-2 text-xs text-black opacity-75">
// //               {project.proj_desc} 
// //             </div>
// //             <div className="flex gap-32 mt-4 text-sm text-black">
// //               <div>
// //                 <span className="text-black">No of Tasks:</span>
// //                 <br /> {project.num_tasks}
// //               </div>
// //               <div>
// //                 <span className="text-black">Deadline</span>
// //                 <br />
// //                 {project.proj_deadline}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// //   export default SProjectCard;

import React from 'react';
function SProjectCard({ project}) {
  const baseUrl = 'http://127.0.0.1:8000';
  return (
    <div className="cursor-pointer">
      <div className="pt-8">
        <div className="flex flex-col items-start p-4 bg-white rounded-lg border shadow-xl w-[400px] h-670">
          <div className="flex gap-2 items-center">
            <img
              src={`${baseUrl}/${project.icon}`}
              alt={`${project.proj_name} icon`}
              className="shrink-0 shadow-sm w-16 h-16 rounded-full"
            />
            <div className="flex flex-col ml-2">
              <div className="flex gap-2 items-center text-xl text-black font-bold mb-2">
                <div className="grow">{project.proj_name}</div>
              </div>
              <div className="text-md text-black opacity-90">
                {project.proj_desc}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-black opacity-75">
            {project.proj_desc}
          </div>
          <div className="flex gap-32 mt-4 text-sm text-black">
            <div>
              <span className="text-black">No of Tasks:</span>
              <br /> {project.num_tasks}
            </div>
            <div>
              <span className="text-black">Deadline</span>
              <br />
              {project.proj_deadline}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SProjectCard;

