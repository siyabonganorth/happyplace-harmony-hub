
import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">Manage all your creative projects</p>
      </div>
      
      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg p-8 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Project Management</h3>
          <p className="text-muted-foreground">
            This page will contain the full project management functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
