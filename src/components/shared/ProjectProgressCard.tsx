
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Edit, Check, X } from 'lucide-react';
import { Project } from '@/services/projectService';
import { useUpdateProject } from '@/hooks/useProjects';

interface ProjectProgressCardProps {
  project: Project;
  canEdit?: boolean;
}

const ProjectProgressCard = ({ project, canEdit = false }: ProjectProgressCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProgress, setTempProgress] = useState(project.progress || 0);
  const updateProjectMutation = useUpdateProject();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSave = () => {
    const clampedProgress = Math.max(0, Math.min(100, tempProgress));
    updateProjectMutation.mutate({
      id: project.id,
      updates: { progress: clampedProgress }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProgress(project.progress || 0);
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Project Progress
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            {canEdit && !isEditing && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={tempProgress}
                  onChange={(e) => setTempProgress(Number(e.target.value))}
                  className="w-16 h-6 text-xs"
                />
                <span className="text-xs">%</span>
                <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={handleSave}>
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={handleCancel}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <span className={`font-bold text-xl ${getProgressColor(project.progress || 0)}`}>
                {project.progress || 0}%
              </span>
            )}
          </div>
          
          <Progress 
            value={isEditing ? tempProgress : (project.progress || 0)} 
            className="h-3"
          />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-medium">${project.budget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectProgressCard;
