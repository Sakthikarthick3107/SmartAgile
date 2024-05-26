import React from 'react';

const Employee = ({ users }) => {
  return (
    <div className="overflow-x-auto ml-4">
      <table className="w-full sm:max-w-4xl md:max-w-6xl lg:max-w-full xl:max-w-8xl bg-white shadow-lg border-collapse">
        <thead>
          <tr className="w-full bg-[#4d989d] text-white text-left border-b-2 border-gray-300">
            <th className="py-2 px-3 font-semibold text-sm">Employee ID</th>
            <th className="py-2 px-3 font-semibold text-sm">Name</th>
            <th className="py-2 px-3 font-semibold text-sm">Designation</th>
            <th className="py-2 px-3 font-semibold text-sm">Employee Profile</th>
            <th className="py-2 px-3 font-semibold text-sm">Project</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-1 px-3">{user.id}</td>
              <td className="py-1 px-3">{user.username}</td>
              <td className="py-1 px-3">{user.role_within_project}</td>
              <td className="py-1 px-3">
                <img
                  src={`http://127.0.0.1:8000/users/employees/${user.image}`}
                  alt={user.username}
                  className="w-16 h-16 rounded-full"
                />
              </td>
              <td className="py-1 px-3">{user.project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
