
import React from 'react';
import TaskForm from '../components/tasks/TaskForm';

const CreateTask: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
      <TaskForm />
    </div>
  );
};

export default CreateTask;
