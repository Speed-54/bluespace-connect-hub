
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Project } from '@/services/projectService';
import { useUpdateProject } from '@/hooks/useProjects';

interface MilestoneManagerProps {
  project: Project;
  canEdit?: boolean;
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  description?: string;
}

const MilestoneManager = ({ project, canEdit = false }: MilestoneManagerProps) => {
  const [milestones, setMilestones] = useState<Milestone[]>(
    project.tasks?.map(task => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      dueDate: new Date().toISOString().split('T')[0], // Default to today
      description: ''
    })) || [
      { id: '1', title: 'Project Setup', completed: true, dueDate: '2024-06-01' },
      { id: '2', title: 'Design Phase', completed: true, dueDate: '2024-06-15' },
      { id: '3', title: 'Development Phase', completed: false, dueDate: '2024-07-01' },
      { id: '4', title: 'Testing Phase', completed: false, dueDate: '2024-07-15' },
      { id: '5', title: 'Deployment', completed: false, dueDate: '2024-07-30' }
    ]
  );
  
  const [newMilestone, setNewMilestone] = useState({ title: '', dueDate: '' });
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const updateProjectMutation = useUpdateProject();

  const getMilestoneIcon = (milestone: Milestone, index: number) => {
    if (milestone.completed) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    const nextIncomplete = milestones.findIndex(m => !m.completed);
    if (index === nextIncomplete) {
      return <Clock className="h-4 w-4 text-blue-500" />;
    }
    
    if (index === milestones.length - 1 && !milestone.completed) {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
    
    return <Clock className="h-4 w-4 text-gray-400" />;
  };

  const getMilestoneStatus = (milestone: Milestone, index: number) => {
    if (milestone.completed) return 'Completed';
    
    const nextIncomplete = milestones.findIndex(m => !m.completed);
    if (index === nextIncomplete) return 'In Progress';
    if (index === milestones.length - 1) return 'Final';
    
    return 'Pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Final':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMilestoneToggle = (milestoneId: string) => {
    if (!canEdit) return;
    
    const updatedMilestones = milestones.map(milestone =>
      milestone.id === milestoneId
        ? { ...milestone, completed: !milestone.completed }
        : milestone
    );
    
    setMilestones(updatedMilestones);
    
    // Update project tasks
    const tasks = updatedMilestones.map(m => ({
      id: m.id,
      title: m.title,
      completed: m.completed,
      assignedTo: project.developers[0]?.id
    }));
    
    updateProjectMutation.mutate({
      id: project.id,
      updates: { tasks }
    });
  };

  const handleAddMilestone = () => {
    if (!newMilestone.title.trim() || !newMilestone.dueDate) return;
    
    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title,
      completed: false,
      dueDate: newMilestone.dueDate
    };
    
    setMilestones([...milestones, milestone]);
    setNewMilestone({ title: '', dueDate: '' });
    setIsAddingMilestone(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Project Milestones
          </CardTitle>
          {canEdit && (
            <Button
              size="sm"
              onClick={() => setIsAddingMilestone(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Milestone
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            {canEdit ? (
              <Checkbox
                checked={milestone.completed}
                onCheckedChange={() => handleMilestoneToggle(milestone.id)}
              />
            ) : (
              getMilestoneIcon(milestone, index)
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                  {milestone.title}
                </h4>
                <Badge
                  variant="secondary"
                  className={getStatusColor(getMilestoneStatus(milestone, index))}
                >
                  {getMilestoneStatus(milestone, index)}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(milestone.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        {isAddingMilestone && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
            <Input
              placeholder="Milestone title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
            />
            <Input
              type="date"
              value={newMilestone.dueDate}
              onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddMilestone}>
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsAddingMilestone(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneManager;
