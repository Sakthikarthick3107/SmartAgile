import React from 'react';
import TaskListCard from './TaskListCard';
import { Task } from '../../screens/Supervisor/SupervisorTaskView';

const TodoPage = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-transparent">
        {tasks
          .filter((item) => item.status === 'Todo')
          .map((task, index) => (
            <TaskListCard task={task} key={index} />
          ))}
      </div>
    </div>
  );
};

export default TodoPage ;
