
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Project } from '@/services/projectService';
import { useUpdateProject } from '@/hooks/useProjects';

interface AssignDeveloperDialogProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const AssignDeveloperDialog = ({ project, isOpen, onClose }: AssignDeveloperDialogProps) => {
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>(
    project.developers.map(dev => dev.id)
  );
  const updateProjectMutation = useUpdateProject();

  // Mock developers - in real app, fetch from API
  const availableDevelopers = [
    {
      id: '2',
      name: 'Jane Developer',
      email: 'jane@dev.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      skills: ['React', 'Node.js', 'TypeScript']
    },
    {
      id: '3',
      name: 'Mike Smith',
      email: 'mike@dev.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      skills: ['Python', 'Django', 'PostgreSQL']
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@dev.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      skills: ['React Native', 'Flutter', 'Firebase']
    }
  ];

  const handleDeveloperToggle = (developerId: string) => {
    setSelectedDevelopers(prev =>
      prev.includes(developerId)
        ? prev.filter(id => id !== developerId)
        : [...prev, developerId]
    );
  };

  const handleSave = () => {
    const assignedDevelopers = availableDevelopers.filter(dev =>
      selectedDevelopers.includes(dev.id)
    );

    updateProjectMutation.mutate({
      id: project.id,
      updateData: { developers: assignedDevelopers }
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Developers to {project.title}</DialogTitle>
          <DialogDescription>
            Select developers to assign to this project. They will receive notifications and see the project in their dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {availableDevelopers.map((developer) => (
            <div
              key={developer.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <Checkbox
                checked={selectedDevelopers.includes(developer.id)}
                onCheckedChange={() => handleDeveloperToggle(developer.id)}
              />
              <Avatar>
                <AvatarImage src={developer.avatar} />
                <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{developer.name}</p>
                <p className="text-sm text-gray-500">{developer.email}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {developer.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateProjectMutation.isPending}>
            {updateProjectMutation.isPending ? 'Assigning...' : 'Assign Developers'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeveloperDialog;
