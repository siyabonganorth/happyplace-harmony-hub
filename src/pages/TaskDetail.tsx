
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tasksApi } from '../services/api';
import { Task, Comment } from '../types';
import { Loader2, Trash2, Edit, ArrowLeft, Calendar, FileText, MessageSquare, Link2, PaperclipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Sample data for task details view
const sampleComments: Comment[] = [
  {
    id: "comment1",
    content: "I've started working on this task. Should be completed by tomorrow.",
    authorId: "user1",
    taskId: "task1",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    id: "comment2",
    content: "Looks good! Let me know if you need any help with the implementation.",
    authorId: "user2",
    taskId: "task1",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    id: "comment3",
    content: "I've uploaded the reference materials in the attachments section.",
    authorId: "user3",
    taskId: "task1",
    createdAt: new Date(), // now
    updatedAt: new Date()
  }
];

const sampleAttachments = [
  { id: "att1", name: "project_brief.pdf", url: "#", type: "application/pdf", size: 2500000, uploadedBy: "user1", taskId: "task1", createdAt: new Date(Date.now() - 86400000 * 3) },
  { id: "att2", name: "reference_design.jpg", url: "#", type: "image/jpeg", size: 1800000, uploadedBy: "user3", taskId: "task1", createdAt: new Date(Date.now() - 86400000) },
  { id: "att3", name: "meeting_notes.docx", url: "#", type: "application/docx", size: 150000, uploadedBy: "user2", taskId: "task1", createdAt: new Date() },
];

const sampleDependencies = [
  { id: "dep1", parentTaskId: "parent1", dependentTaskId: "task1", createdAt: new Date() },
  { id: "dep2", parentTaskId: "parent2", dependentTaskId: "task1", createdAt: new Date() }
];

const sampleTeam = [
  { id: "user1", name: "Mntungwa", role: "Task Owner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mntungwa" },
  { id: "user2", name: "Neo", role: "Reviewer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neo" },
  { id: "user3", name: "Lungile", role: "Contributor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lungile" }
];

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

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

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    // This would typically be handled by an API call
    console.log('Adding comment:', commentText);
    setCommentText('');
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
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/tasks')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/tasks/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDeleteTask}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="attachments" className="flex items-center gap-2">
            <PaperclipIcon className="h-4 w-4" />
            Attachments
          </TabsTrigger>
          <TabsTrigger value="dependencies" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Dependencies
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Details</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={
                        task.status === 'completed' ? "default" : 
                        task.status === 'in-progress' ? "secondary" : 
                        task.status === 'review' ? "outline" : "destructive"
                      }>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <Badge variant={
                        task.priority === 'low' ? "outline" : 
                        task.priority === 'medium' ? "secondary" : 
                        task.priority === 'high' ? "default" : "destructive"
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span>{task.department}</span>
                    </div>
                    {task.dueDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{format(new Date(task.createdAt), 'PPP')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{format(new Date(task.updatedAt), 'PPP')}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">{task.description || 'No description provided.'}</p>
                </div>
              </div>

              {task.assigneeId && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Assigned To</h2>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assigneeId}`} />
                      <AvatarFallback>{task.assigneeId.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{task.assigneeId}</p>
                      <p className="text-sm text-muted-foreground">Assigned on {format(new Date(task.updatedAt), 'PPP')}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discussion about this task</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {sampleComments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorId}`} />
                        <AvatarFallback>{comment.authorId.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-secondary p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{comment.authorId}</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), 'PPP p')}</p>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`} />
                <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea 
                  placeholder="Add a comment..." 
                  className="min-h-10"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button onClick={handleAddComment}>Post</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>Files related to this task</CardDescription>
              </div>
              <Button size="sm">Upload File</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleAttachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy} on {format(new Date(attachment.createdAt), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Dependencies</CardTitle>
              <CardDescription>This task depends on the following tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {sampleDependencies.length > 0 ? (
                <div className="space-y-2">
                  {sampleDependencies.map(dependency => (
                    <div key={dependency.id} className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Task #{dependency.parentTaskId}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/tasks/${dependency.parentTaskId}`)}>
                          View Task
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Added on {format(new Date(dependency.createdAt), 'PPP')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No dependencies for this task.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Add Dependency</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>People working on this task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleTeam.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Add Team Member</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskDetail;
