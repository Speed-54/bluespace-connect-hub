
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  Video,
  Phone,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const DeveloperCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: '1',
      title: 'Client Meeting - TechCorp',
      time: '10:00 AM',
      date: '2024-05-28',
      type: 'meeting',
      duration: '1 hour',
      participants: ['Sarah Johnson'],
      location: 'Video Call'
    },
    {
      id: '2',
      title: 'Sprint Planning',
      time: '2:00 PM',
      date: '2024-05-28',
      type: 'planning',
      duration: '2 hours',
      participants: ['Development Team'],
      location: 'Conference Room'
    },
    {
      id: '3',
      title: 'Code Review - E-commerce',
      time: '9:00 AM',
      date: '2024-05-29',
      type: 'review',
      duration: '30 minutes',
      participants: ['Michael Chen'],
      location: 'Online'
    },
    {
      id: '4',
      title: 'Project Demo',
      time: '3:00 PM',
      date: '2024-05-30',
      type: 'demo',
      duration: '1 hour',
      participants: ['Emily Rodriguez', 'Client Team'],
      location: 'Video Call'
    }
  ];

  const todayEvents = events.filter(event => 
    event.date === new Date().toISOString().split('T')[0]
  );

  const upcomingEvents = events.filter(event => 
    new Date(event.date) > new Date()
  ).slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      case 'review':
        return 'bg-orange-100 text-orange-800';
      case 'demo':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'planning':
        return <Calendar className="h-4 w-4" />;
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'demo':
        return <Video className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  // Simple calendar view (would be replaced with a proper calendar component)
  const renderMiniCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate();
      const hasEvent = events.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === today.getMonth() &&
               eventDate.getFullYear() === today.getFullYear();
      });
      
      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center text-sm rounded cursor-pointer hover:bg-gray-100 ${
            isToday ? 'bg-blue-500 text-white' : ''
          } ${hasEvent ? 'font-bold' : ''}`}
        >
          {day}
          {hasEvent && <div className="absolute w-1 h-1 bg-blue-500 rounded-full mt-6"></div>}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{todayEvents.length}</p>
                <p className="text-sm text-gray-600">Today's Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">May 2024</CardTitle>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 relative">
              {renderMiniCalendar()}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time} ({event.duration})
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants.join(', ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Video className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No events scheduled for today</p>
                  <Button variant="outline" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule Meeting
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{event.date} at {event.time}</span>
                    <span>({event.duration})</span>
                  </div>
                </div>
                <Badge variant="outline">{event.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperCalendar;
