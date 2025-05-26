
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Users,
  Star,
  Target,
  Calendar
} from 'lucide-react';

const DeveloperAnalytics = () => {
  // Mock data for analytics
  const monthlyEarnings = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 5200 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6100 },
    { month: 'May', amount: 5900 }
  ];

  const projectStats = {
    completed: 23,
    active: 4,
    pending: 2,
    totalHours: 1247,
    avgRating: 4.8,
    repeatClients: 12
  };

  const skillsUsage = [
    { skill: 'React', usage: 85 },
    { skill: 'Node.js', usage: 70 },
    { skill: 'TypeScript', usage: 65 },
    { skill: 'Python', usage: 45 },
    { skill: 'AWS', usage: 55 }
  ];

  const recentActivity = [
    { action: 'Completed E-commerce Platform milestone', time: '2 hours ago', type: 'success' },
    { action: 'Client message received from TechCorp', time: '4 hours ago', type: 'info' },
    { action: 'New project proposal submitted', time: '1 day ago', type: 'warning' },
    { action: 'Payment received: $2,500', time: '2 days ago', type: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">$26,500</p>
                <p className="text-sm text-gray-600">This Month</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+12% from last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{projectStats.completed}</p>
                <p className="text-sm text-gray-600">Projects Completed</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-blue-600">+3 this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{projectStats.totalHours}</p>
                <p className="text-sm text-gray-600">Total Hours</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-orange-600">Average: 8h/day</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{projectStats.avgRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-yellow-600">98% satisfaction</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyEarnings.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{month.month}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>${month.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={(month.amount / 7000) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsUsage.map((skill) => (
                <div key={skill.skill} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">{skill.skill}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.usage}%</span>
                    </div>
                    <Progress value={skill.usage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{projectStats.completed}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{projectStats.active}</div>
                <div className="text-sm text-blue-700">Active</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{projectStats.pending}</div>
                <div className="text-sm text-orange-700">Pending</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{projectStats.repeatClients}</div>
                <div className="text-sm text-purple-700">Repeat Clients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'warning' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals and Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Revenue Goal</span>
                <span>$30,000</span>
              </div>
              <Progress value={88} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">$26,500 / $30,000</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Projects Goal</span>
                <span>5 projects</span>
              </div>
              <Progress value={80} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">4 / 5 projects</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Client Satisfaction</span>
                <span>95%</span>
              </div>
              <Progress value={98} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">98% / 95% target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperAnalytics;
