
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tasksApi } from '../services/api';
import { Task } from '../types';
import { Loader2 } from 'lucide-react';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Use the correct API method to fetch a task by ID
        const taskData = await tasksApi.getById(id);
        setTask(taskData);
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDeleteTask = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setLoading(true);
      // Use the correct API method to delete a task
      await tasksApi.delete(id);
      navigate('/tasks');
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {error || 'Task not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p className="text-gray-600 mb-1">Status: {task.status}</p>
            <p className="text-gray-600 mb-1">Priority: {task.priority}</p>
            <p className="text-gray-600 mb-1">Department: {task.department}</p>
            {task.dueDate && (
              <p className="text-gray-600 mb-1">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{task.description || 'No description provided.'}</p>
          </div>
        </div>

        {task.assigneeId && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Assigned To</h2>
            <p className="text-gray-600">{task.assigneeId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
