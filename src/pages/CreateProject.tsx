
import React from 'react';
import ProjectForm from '../components/projects/ProjectForm';

const CreateProject: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm />
    </div>
  );
};

export default CreateProject;
