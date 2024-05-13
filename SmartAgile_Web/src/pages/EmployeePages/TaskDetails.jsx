import React from "react";

const SmartAgileDocumentation = () => {
  return (
    <div className="p-4">
      <button className="bg-transparent rounded-md text-blue-500 font-bold py-2 px-4 flex items-center">
        {/* ">" symbol */}
        <span className="mr-2 bg-black rounded-full">&gt;</span>
        Back
      </button>
      <div>
        <h2 className="text-3xl font-bold mb-4 mt-4">
          Documentation - SmartAgile
        </h2>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Enter task description"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Deadline
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="deadline"
          type="date"
          placeholder="Enter deadline"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Assigned by
        </label>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="assignedBy"
          type="text"
          placeholder="Enter assigned by"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Attachments
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="attachment"
          type="file"
        />
      </div>
    </div>
  );
};

export default SmartAgileDocumentation;
