
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Play,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

const LearningDevelopment = () => {
  const courses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      provider: 'TechAcademy',
      progress: 75,
      duration: '8 hours',
      rating: 4.8,
      enrolled: true,
      category: 'Frontend'
    },
    {
      id: '2',
      title: 'AWS Serverless Architecture',
      provider: 'CloudMaster',
      progress: 0,
      duration: '12 hours',
      rating: 4.9,
      enrolled: false,
      category: 'Cloud'
    },
    {
      id: '3',
      title: 'GraphQL Complete Guide',
      provider: 'DevCourse',
      progress: 100,
      duration: '6 hours',
      rating: 4.7,
      enrolled: true,
      category: 'Backend'
    }
  ];

  const achievements = [
    { name: 'React Expert', icon: '⚛️', earned: true, date: '2024-03-15' },
    { name: 'AWS Certified', icon: '☁️', earned: true, date: '2024-02-20' },
    { name: 'TypeScript Master', icon: '📝', earned: false, progress: 80 },
    { name: 'Full Stack Hero', icon: '🚀', earned: false, progress: 60 }
  ];

  const learningGoals = [
    { skill: 'Machine Learning', target: 90, current: 45 },
    { skill: 'DevOps', target: 80, current: 65 },
    { skill: 'Mobile Development', target: 70, current: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Courses Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Hours Learned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-gray-600">Skill Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.provider}</p>
                    </div>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  {course.enrolled ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <Button size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-1" />
                        {course.progress === 100 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full">
                      Enroll Now
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.name}</h4>
                    {achievement.earned ? (
                      <p className="text-sm text-green-600">
                        Earned on {achievement.date}
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Progress: {achievement.progress}%
                        </p>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary">Earned</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{goal.skill}</span>
                  <span className="text-sm text-gray-600">
                    {goal.current}% / {goal.target}%
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current: {goal.current}%</span>
                  <span>Target: {goal.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningDevelopment;
