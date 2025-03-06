
import React from 'react';

const Clients: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground mt-1">Manage your client relationships</p>
      </div>
      
      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg p-8 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Client Management</h3>
          <p className="text-muted-foreground">
            This page will contain the client management functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
