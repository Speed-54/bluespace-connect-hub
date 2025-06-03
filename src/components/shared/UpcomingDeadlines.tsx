
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

interface DeadlineItem {
  id: string;
  projectTitle: string;
  title: string;
  dueDate: string;
  type: 'milestone' | 'project';
  status: 'upcoming' | 'due-soon' | 'overdue';
}

const UpcomingDeadlines = () => {
  const { data: projects = [] } = useProjects();

  // Generate deadline items from projects and their milestones
  const getDeadlineItems = (): DeadlineItem[] => {
    const items: DeadlineItem[] = [];
    const today = new Date();

    projects.forEach(project => {
      // Add project deadline
      const projectDueDate = new Date(project.deadline);
      const daysDiff = Math.ceil((projectDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      let status: 'upcoming' | 'due-soon' | 'overdue' = 'upcoming';
      if (daysDiff < 0) status = 'overdue';
      else if (daysDiff <= 7) status = 'due-soon';

      items.push({
        id: `project-${project.id}`,
        projectTitle: project.title,
        title: 'Project Deadline',
        dueDate: project.deadline,
        type: 'project',
        status
      });

      // Add milestone deadlines (using tasks as milestones)
      project.tasks?.forEach(task => {
        if (!task.completed) {
          // For demo, generate due dates for tasks
          const taskDueDate = new Date();
          taskDueDate.setDate(taskDueDate.getDate() + Math.floor(Math.random() * 30));
          
          const taskDaysDiff = Math.ceil((taskDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          let taskStatus: 'upcoming' | 'due-soon' | 'overdue' = 'upcoming';
          if (taskDaysDiff < 0) taskStatus = 'overdue';
          else if (taskDaysDiff <= 3) taskStatus = 'due-soon';

          items.push({
            id: `task-${task.id}`,
            projectTitle: project.title,
            title: task.title,
            dueDate: taskDueDate.toISOString().split('T')[0],
            type: 'milestone',
            status: taskStatus
          });
        }
      });
    });

    // Sort by due date (ascending)
    return items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  const deadlineItems = getDeadlineItems();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'due-soon':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'due-soon':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        {deadlineItems.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming deadlines</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deadlineItems.slice(0, 10).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.projectTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getStatusColor(item.status)}`}
                  >
                    {getDaysUntilDue(item.dueDate)}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
