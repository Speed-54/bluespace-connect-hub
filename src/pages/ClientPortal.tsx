import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, AlertTriangle, MessageSquare, FileText, Calendar, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import QuickProjectDialog from '@/components/client/QuickProjectDialog';
import ProjectProgressCard from '@/components/shared/ProjectProgressCard';
import UpcomingDeadlines from '@/components/shared/UpcomingDeadlines';
import FundAllocationCard from '@/components/admin/FundAllocationCard';
import { useProjects } from '@/hooks/useProjects';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isQuickProjectOpen, setIsQuickProjectOpen] = useState(false);
  const { data: projects = [] } = useProjects();

  // Mock data
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'Modern React-based e-commerce platform with payment integration',
      progress: 75,
      status: 'in-progress',
      deadline: '2024-02-15',
      budget: '$5,000',
      developer: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        skills: ['React', 'Node.js', 'MongoDB']
      },
      milestones: [
        { id: 1, title: 'Project Setup', status: 'completed', date: '2024-01-01' },
        { id: 2, title: 'Frontend Development', status: 'completed', date: '2024-01-15' },
        { id: 3, title: 'Backend API', status: 'in-progress', date: '2024-02-01' },
        { id: 4, title: 'Payment Integration', status: 'pending', date: '2024-02-10' },
        { id: 5, title: 'Testing & Deployment', status: 'pending', date: '2024-02-15' }
      ]
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile app using React Native',
      progress: 30,
      status: 'in-progress',
      deadline: '2024-03-20',
      budget: '$8,000',
      developer: {
        name: 'David Ochieng',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        skills: ['React Native', 'Firebase', 'TypeScript']
      },
      milestones: [
        { id: 1, title: 'App Architecture', status: 'completed', date: '2024-01-10' },
        { id: 2, title: 'UI/UX Design', status: 'in-progress', date: '2024-01-25' },
        { id: 3, title: 'Core Features', status: 'pending', date: '2024-02-15' },
        { id: 4, title: 'Testing', status: 'pending', date: '2024-03-10' },
        { id: 5, title: 'App Store Deployment', status: 'pending', date: '2024-03-20' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
          <p className="text-gray-600 mt-2">Track your projects and communicate with developers</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Summary Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* ... keep existing code (summary cards) */}

                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{project.title}</h3>
                              <p className="text-sm text-gray-600">{project.description}</p>
                            </div>
                            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            {project.developers[0] && (
                              <>
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={project.developers[0].avatar} />
                                  <AvatarFallback>{project.developers[0].name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">{project.developers[0].name}</span>
                              </>
                            )}
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-600">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress || 0}%</span>
                            </div>
                            <Progress value={project.progress || 0} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsQuickProjectOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Start New Project
                    </Button>
                    <Button variant="outline" className="w-full">
                      Find Developers
                    </Button>
                    <Button variant="outline" className="w-full">
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>

                <UpcomingDeadlines />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{project.title}</CardTitle>
                            <p className="text-gray-600 mt-1">{project.description}</p>
                          </div>
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Project Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Budget:</span>
                                <span className="font-medium">{project.budget}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Deadline:</span>
                                <span className="font-medium">{project.deadline}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Progress:</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                            </div>
                            <Progress value={project.progress} className="mt-3" />
                            
                            <div className="mt-4">
                              <h5 className="font-semibold mb-2">Developer</h5>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={project.developer.avatar} />
                                  <AvatarFallback>{project.developer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{project.developer.name}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {project.developer.skills.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Milestones</h4>
                            <div className="space-y-3">
                              {project.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center space-x-3">
                                  {getStatusIcon(milestone.status)}
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{milestone.title}</p>
                                    <p className="text-xs text-gray-500">{milestone.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex space-x-3">
                          <Button size="sm" className="bg-bluespace-600 hover:bg-bluespace-700">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message Developer
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <ProjectProgressCard project={project} />
                    <FundAllocationCard project={project} />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">Start a conversation with your developers</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                  <p className="text-gray-600">Project documents will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <QuickProjectDialog
          isOpen={isQuickProjectOpen}
          onClose={() => setIsQuickProjectOpen(false)}
          onSuccess={() => {
            // Optionally redirect to projects tab
            setActiveTab('projects');
          }}
        />
      </div>
    </div>
  );
};

export default ClientPortal;
