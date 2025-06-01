
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
import { Project } from '@/services/projectService';
import { useUpdateProject } from '@/hooks/useProjects';

interface FundAllocationCardProps {
  project: Project;
}

const FundAllocationCard = ({ project }: FundAllocationCardProps) => {
  const [isEditingSpent, setIsEditingSpent] = useState(false);
  const [tempSpent, setTempSpent] = useState(project.spent || 0);
  const updateProjectMutation = useUpdateProject();

  const spent = project.spent || 0;
  const remaining = project.budget - spent;
  const spentPercentage = (spent / project.budget) * 100;

  const getBudgetStatus = () => {
    if (spentPercentage <= 50) return { color: 'text-green-600', icon: TrendingUp, status: 'On Track' };
    if (spentPercentage <= 80) return { color: 'text-yellow-600', icon: TrendingUp, status: 'Monitor' };
    if (spentPercentage <= 100) return { color: 'text-orange-600', icon: TrendingDown, status: 'High Usage' };
    return { color: 'text-red-600', icon: TrendingDown, status: 'Over Budget' };
  };

  const { color, icon: StatusIcon, status } = getBudgetStatus();

  const handleSpentAdjustment = (adjustment: number) => {
    const newSpent = Math.max(0, spent + adjustment);
    updateProjectMutation.mutate({
      id: project.id,
      updates: { spent: newSpent }
    });
  };

  const saveSpentEdit = () => {
    updateProjectMutation.mutate({
      id: project.id,
      updates: { spent: tempSpent }
    });
    setIsEditingSpent(false);
  };

  const cancelSpentEdit = () => {
    setIsEditingSpent(false);
    setTempSpent(spent);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Fund Allocation
          </CardTitle>
          <Badge variant="outline" className={color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Budget Overview */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Total Budget</p>
            <p className="text-xl font-bold">${project.budget.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Spent</p>
            <div className="flex items-center justify-center gap-1">
              {isEditingSpent ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={tempSpent}
                    onChange={(e) => setTempSpent(Number(e.target.value))}
                    className="w-20 h-6 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveSpentEdit();
                      if (e.key === 'Escape') cancelSpentEdit();
                    }}
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={saveSpentEdit}>
                    ✓
                  </Button>
                  <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={cancelSpentEdit}>
                    ✕
                  </Button>
                </div>
              ) : (
                <>
                  <p 
                    className="text-xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => setIsEditingSpent(true)}
                  >
                    ${spent.toLocaleString()}
                  </p>
                  <div className="flex flex-col">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-3 w-3 p-0"
                      onClick={() => handleSpentAdjustment(500)}
                    >
                      <Plus className="h-2 w-2" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-3 w-3 p-0"
                      onClick={() => handleSpentAdjustment(-500)}
                    >
                      <Minus className="h-2 w-2" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Remaining</p>
            <p className={`text-xl font-bold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Usage</span>
            <span className={color}>{spentPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={Math.min(spentPercentage, 100)} 
            className="h-3"
          />
          {spentPercentage > 100 && (
            <p className="text-xs text-red-600 font-medium">
              Over budget by ${(spent - project.budget).toLocaleString()}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSpentAdjustment(1000)}
            className="flex-1 text-xs"
          >
            +$1k
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSpentAdjustment(2500)}
            className="flex-1 text-xs"
          >
            +$2.5k
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSpentAdjustment(-1000)}
            className="flex-1 text-xs"
            disabled={spent < 1000}
          >
            -$1k
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundAllocationCard;
