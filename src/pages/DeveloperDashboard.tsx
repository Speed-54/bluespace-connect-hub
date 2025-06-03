
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  Bell,
  User,
  FolderOpen,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Settings
} from 'lucide-react';
import Header from '@/components/layout/Header';
import DeveloperNotifications from '@/components/developer/DeveloperNotifications';
import DeveloperProfile from '@/components/developer/DeveloperProfile';
import DeveloperProjects from '@/components/developer/DeveloperProjects';
import ClientInformation from '@/components/developer/ClientInformation';
import DeveloperAnalytics from '@/components/developer/DeveloperAnalytics';
import CommunicationHub from '@/components/developer/CommunicationHub';
import LearningDevelopment from '@/components/developer/LearningDevelopment';
import DeveloperCalendar from '@/components/developer/DeveloperCalendar';
import DeveloperSettings from '@/components/developer/DeveloperSettings';
import MilestoneManager from '@/components/developer/MilestoneManager';
import ProjectProgressCard from '@/components/shared/ProjectProgressCard';
import { useProjects } from '@/hooks/useProjects';

const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: projects = [] } = useProjects();

  // Get projects assigned to current developer (mock developer ID: '2')
  const assignedProjects = projects.filter(project => 
    project.developers.some(dev => dev.id === '2')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your projects, clients, and professional development</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clients</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DeveloperAnalytics />
              </div>
              <div className="space-y-6">
                {assignedProjects.map(project => (
                  <ProjectProgressCard key={project.id} project={project} canEdit />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <DeveloperNotifications />
          </TabsContent>

          <TabsContent value="profile">
            <DeveloperProfile />
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <DeveloperProjects />
              {assignedProjects.map(project => (
                <MilestoneManager key={project.id} project={project} canEdit />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <ClientInformation />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>

          <TabsContent value="learning">
            <LearningDevelopment />
          </TabsContent>

          <TabsContent value="calendar">
            <DeveloperCalendar />
          </TabsContent>

          <TabsContent value="settings">
            <DeveloperSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
