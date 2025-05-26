
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Code, 
  Star, 
  Edit, 
  Plus,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';

const DeveloperProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    skills: user?.skills || ['React', 'Node.js', 'TypeScript', 'AWS', 'Python'],
    hourlyRate: '$75',
    location: 'San Francisco, CA',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev',
    yearsExperience: 5,
    projectsCompleted: 23,
    clientSatisfaction: 98
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : <><Edit className="h-4 w-4 mr-1" />Edit</>}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0) || 'D'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Full Name"
                    />
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {profileData.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{profileData.bio}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button size="sm" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Hourly Rate</label>
                {isEditing ? (
                  <Input
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.hourlyRate}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
                {isEditing ? (
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.location}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Social Links</label>
              <div className="space-y-2">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <Input
                        value={profileData.github}
                        onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                        placeholder="GitHub URL"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      <Input
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <Input
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="Website URL"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Professional Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Years of Experience</span>
                <span className="font-medium">{profileData.yearsExperience}</span>
              </div>
              <Progress value={(profileData.yearsExperience / 10) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Projects Completed</span>
                <span className="font-medium">{profileData.projectsCompleted}</span>
              </div>
              <Progress value={Math.min((profileData.projectsCompleted / 50) * 100, 100)} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Client Satisfaction</span>
                <span className="font-medium">{profileData.clientSatisfaction}%</span>
              </div>
              <Progress value={profileData.clientSatisfaction} className="h-2" />
            </div>

            <Separator />

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= 4.9 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeveloperProfile;
