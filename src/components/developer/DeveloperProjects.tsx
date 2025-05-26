
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderOpen, 
  Clock, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  Play,
  Calendar
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'completed' | 'on-hold' | 'pending';
  progress: number;
  dueDate: string;
  budget: number;
  paid: number;
  description: string;
  technologies: string[];
  priority: 'low' | 'medium' | 'high';
}

const DeveloperProjects = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      status: 'active',
      progress: 75,
      dueDate: '2024-06-15',
      budget: 15000,
      paid: 10000,
      description: 'Modern e-commerce platform with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Mobile App MVP',
      client: 'StartupXYZ',
      status: 'active',
      progress: 45,
      dueDate: '2024-07-01',
      budget: 8000,
      paid: 3000,
      description: 'Cross-platform mobile application for social networking',
      technologies: ['React Native', 'Firebase', 'Redux'],
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Dashboard Analytics',
      client: 'DataCorp',
      status: 'completed',
      progress: 100,
      dueDate: '2024-05-01',
      budget: 12000,
      paid: 12000,
      description: 'Advanced analytics dashboard with real-time data visualization',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      priority: 'medium'
    },
    {
      id: '4',
      title: 'API Integration',
      client: 'FinanceApp',
      status: 'pending',
      progress: 0,
      dueDate: '2024-08-15',
      budget: 5000,
      paid: 0,
      description: 'Third-party API integration for financial data',
      technologies: ['Node.js', 'Express', 'REST APIs'],
      priority: 'low'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'on-hold':
        return 'destructive';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'on-hold':
        return <AlertCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <FolderOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const filterProjectsByStatus = (status: string) => {
    if (status === 'all') return projects;
    return projects.filter(project => project.status === status);
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{project.client}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityColor(project.priority)}>
              {project.priority}
            </Badge>
            <Badge variant={getStatusColor(project.status)} className="flex items-center gap-1">
              {getStatusIcon(project.status)}
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{project.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Due: {project.dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              ${project.paid.toLocaleString()} / ${project.budget.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {project.status === 'active' && (
            <Button size="sm" className="flex-1">
              Continue Work
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{filterProjectsByStatus('active').length}</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{filterProjectsByStatus('completed').length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  ${projects.reduce((sum, p) => sum + p.paid, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{filterProjectsByStatus('pending').length}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            My Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterProjectsByStatus('active').map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterProjectsByStatus('completed').map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterProjectsByStatus('pending').map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperProjects;
