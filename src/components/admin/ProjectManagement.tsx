
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users,
  Calendar,
  DollarSign,
  Clock,
  ChevronDown,
  Minus,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useProjects, useDeleteProject, useUpdateProject } from '@/hooks/useProjects';
import { Project } from '@/services/projectService';
import CreateProjectDialog from './CreateProjectDialog';
import EditProjectDialog from './EditProjectDialog';
import FundAllocationCard from './FundAllocationCard';

const ProjectManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [budgetEditingId, setBudgetEditingId] = useState<string | null>(null);
  const [tempBudget, setTempBudget] = useState<number>(0);
  const [spentEditingId, setSpentEditingId] = useState<string | null>(null);
  const [tempSpent, setTempSpent] = useState<number>(0);
  
  const { data: projects = [], isLoading } = useProjects();
  const deleteProjectMutation = useDeleteProject();
  const updateProjectMutation = useUpdateProject();

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetStatusColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage <= 50) return 'text-green-600';
    if (percentage <= 80) return 'text-yellow-600';
    if (percentage <= 100) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProjectMutation.mutate(projectId);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleStatusChange = (projectId: string, newStatus: string) => {
    updateProjectMutation.mutate({
      id: projectId,
      updateData: { status: newStatus as 'active' | 'completed' | 'on-hold' | 'cancelled' }
    });
  };

  const handleBudgetAdjustment = (projectId: string, adjustment: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newBudget = Math.max(0, project.budget + adjustment);
      updateProjectMutation.mutate({
        id: projectId,
        updateData: { budget: newBudget }
      });
    }
  };

  const handleSpentAdjustment = (projectId: string, adjustment: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const currentSpent = project.spent || 0;
      const newSpent = Math.max(0, currentSpent + adjustment);
      updateProjectMutation.mutate({
        id: projectId,
        updateData: { spent: newSpent }
      });
    }
  };

  const startBudgetEdit = (projectId: string, currentBudget: number) => {
    setBudgetEditingId(projectId);
    setTempBudget(currentBudget);
  };

  const saveBudgetEdit = (projectId: string) => {
    updateProjectMutation.mutate({
      id: projectId,
      updateData: { budget: tempBudget }
    });
    setBudgetEditingId(null);
  };

  const cancelBudgetEdit = () => {
    setBudgetEditingId(null);
    setTempBudget(0);
  };

  const startSpentEdit = (projectId: string, currentSpent: number) => {
    setSpentEditingId(projectId);
    setTempSpent(currentSpent);
  };

  const saveSpentEdit = (projectId: string) => {
    updateProjectMutation.mutate({
      id: projectId,
      updateData: { spent: tempSpent }
    });
    setSpentEditingId(null);
  };

  const cancelSpentEdit = () => {
    setSpentEditingId(null);
    setTempSpent(0);
  };

  // Calculate aggregated stats
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
  const totalRemaining = totalBudget - totalSpent;

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-gray-600">Create and manage client-developer project links</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      {/* Enhanced Stats Cards with Fund Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${totalRemaining.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Teams</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.developers.length > 0).length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table with Fund Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Developers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Fund Usage</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const spent = project.spent || 0;
                const remaining = project.budget - spent;
                const spentPercentage = (spent / project.budget) * 100;
                
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{project.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.client.avatar} />
                          <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{project.client.name}</p>
                          <p className="text-xs text-gray-500">{project.client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.developers.length === 0 ? (
                        <Badge variant="outline">No developers assigned</Badge>
                      ) : (
                        <div className="flex -space-x-2">
                          {project.developers.slice(0, 3).map((dev) => (
                            <Avatar key={dev.id} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={dev.avatar} />
                              <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.developers.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                              +{project.developers.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadgeColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Select
                          value={project.status}
                          onValueChange={(value) => handleStatusChange(project.id, value)}
                        >
                          <SelectTrigger className="w-8 h-8 p-0 border-none shadow-none">
                            <ChevronDown className="h-3 w-3" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      {budgetEditingId === project.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={tempBudget}
                            onChange={(e) => setTempBudget(Number(e.target.value))}
                            className="w-24 h-8"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveBudgetEdit(project.id);
                              if (e.key === 'Escape') cancelBudgetEdit();
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => saveBudgetEdit(project.id)}
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={cancelBudgetEdit}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span 
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                            onClick={() => startBudgetEdit(project.id, project.budget)}
                          >
                            ${project.budget.toLocaleString()}
                          </span>
                          <div className="flex flex-col">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0"
                              onClick={() => handleBudgetAdjustment(project.id, 1000)}
                            >
                              <Plus className="h-2 w-2" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0"
                              onClick={() => handleBudgetAdjustment(project.id, -1000)}
                            >
                              <Minus className="h-2 w-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {spentEditingId === project.id ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={tempSpent}
                            onChange={(e) => setTempSpent(Number(e.target.value))}
                            className="w-24 h-8"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveSpentEdit(project.id);
                              if (e.key === 'Escape') cancelSpentEdit();
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => saveSpentEdit(project.id)}
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={cancelSpentEdit}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span 
                            className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${getBudgetStatusColor(spent, project.budget)}`}
                            onClick={() => startSpentEdit(project.id, spent)}
                          >
                            ${spent.toLocaleString()}
                          </span>
                          <div className="flex flex-col">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0"
                              onClick={() => handleSpentAdjustment(project.id, 500)}
                            >
                              <Plus className="h-2 w-2" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0"
                              onClick={() => handleSpentAdjustment(project.id, -500)}
                              disabled={spent < 500}
                            >
                              <Minus className="h-2 w-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex justify-between text-xs">
                          <span>{spentPercentage.toFixed(0)}%</span>
                          <span className={remaining < 0 ? 'text-red-600' : 'text-green-600'}>
                            ${Math.abs(remaining).toLocaleString()} {remaining < 0 ? 'over' : 'left'}
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(spentPercentage, 100)} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProject(project)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Assign Developers
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Fund Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600"
                            disabled={deleteProjectMutation.isPending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fund Allocation Details */}
      {selectedProject && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundAllocationCard project={selectedProject} />
        </div>
      )}

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectManagement;
