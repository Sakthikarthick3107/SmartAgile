// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart, ArcElement, Tooltip } from 'chart.js';

// Chart.register(ArcElement, Tooltip);

// const SDoughnet = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [{
//       label: 'Projects by Status',
//       data: [],
//       backgroundColor: ['#6767FA', '#994C9F', '#D8AD59', '#FF6384', '#36A2EB', '#FFCE56']
//     }]
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/projects/');
//         const projects = await response.json();

//         // Process the data to group projects by status and concatenate project names
//         const statusGroups = projects.reduce((acc, project) => {
//           if (!acc[project.status]) {
//             acc[project.status] = [];
//           }
//           acc[project.status].push(project.proj_name);
//           return acc;
//         }, {});

//         const labels = Object.entries(statusGroups).map(([status, names]) => `${status}: ${names.join(', ')}`);
//         const data = Object.values(statusGroups).map(names => names.length);

//         setChartData({
//           labels: labels,
//           datasets: [{
//             label: 'Projects by Status',
//             data: data,
//             backgroundColor: ['#6767FA', '#994C9F', '#D8AD59', '#FF6384', '#36A2EB', '#FFCE56']
//           }]
//         });
//       } catch (error) {
//         console.error('Error fetching the projects:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div style={{ width: '300px', height: '300px' }}>
//         <Doughnut data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default SDoughnet;
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const SDoughnet = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Projects by Status',
      data: [],
      backgroundColor: ['#6767FA', '#994C9F', '#D8AD59', '#FF6384', '#36A2EB', '#FFCE56']
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/projects/');
        const projects = await response.json();

        // Count the total number of projects
        setTotalProjects(projects.length);

        // Process the data to group projects by status and concatenate project names
        const statusGroups = projects.reduce((acc, project) => {
          if (!acc[project.status]) {
            acc[project.status] = [];
          }
          acc[project.status].push(project.proj_name);
          return acc;
        }, {});

        const labels = Object.entries(statusGroups).map(([status, names]) => `${status}: ${names.join(', ')}`);
        const data = Object.values(statusGroups).map(names => names.length);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Projects by Status',
            data: data,
            backgroundColor: ['#6767FA', '#994C9F', '#D8AD59', '#FF6384', '#36A2EB', '#FFCE56']
          }]
        });
      } catch (error) {
        console.error('Error fetching the projects:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ width: '300px', height: '300px' }}>
        <h2 className='text-2xl text-black font-bold'>Overall Progress</h2>
        <h2 className='text-xl text-black font-semibold'>Total Projects: {totalProjects}</h2>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default SDoughnet;
