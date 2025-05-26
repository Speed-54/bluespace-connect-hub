
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building, 
  Code, 
  Shield, 
  Check, 
  Star, 
  Globe, 
  Users, 
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Linkedin,
  Github,
  Award
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'developer' | 'admin';
  company?: string;
  position?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  budget?: string;
  projectType?: string;
  timeline?: string;
  teamSize?: string;
  agreedToTerms: boolean;
  agreedToNewsletter: boolean;
}

const skills = [
  'React', 'Node.js', 'TypeScript', 'Python', 'JavaScript', 'Vue.js', 
  'Angular', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL',
  'Next.js', 'Express', 'Django', 'Flask', 'React Native', 'Flutter',
  'Kubernetes', 'Firebase', 'Supabase', 'Tailwind CSS', 'Material-UI'
];

const experienceLevels = [
  '0-1 years (Junior)',
  '2-4 years (Mid-level)',
  '5-7 years (Senior)',
  '8+ years (Expert/Lead)'
];

const budgetRanges = [
  '$1,000 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
];

const projectTypes = [
  'Web Application',
  'Mobile App',
  'E-commerce Platform',
  'SaaS Product',
  'Enterprise Solution',
  'API Development',
  'UI/UX Design',
  'Consulting'
];

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'developer',
    company: '',
    position: '',
    location: '',
    skills: [],
    experience: '',
    portfolio: '',
    linkedin: '',
    github: '',
    budget: '',
    projectType: '',
    timeline: '',
    teamSize: '',
    agreedToTerms: false,
    agreedToNewsletter: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = formData.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    updateFormData('skills', updatedSkills);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    if (step === 1) {
      if (!formData.name.trim()) newErrors.push('Name is required');
      if (!formData.email.trim()) newErrors.push('Email is required');
      if (!formData.password) newErrors.push('Password is required');
      if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
      if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
    }

    if (step === 2) {
      if (formData.role === 'developer') {
        if (!formData.experience) newErrors.push('Experience level is required');
        if (!formData.skills?.length) newErrors.push('At least one skill is required');
      }
      if (formData.role === 'client') {
        if (!formData.company?.trim()) newErrors.push('Company name is required');
        if (!formData.projectType) newErrors.push('Project type is required');
      }
    }

    if (step === 3) {
      if (!formData.agreedToTerms) newErrors.push('You must agree to the terms and conditions');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      company: formData.company,
      skills: formData.skills,
      bio: formData.role === 'developer' 
        ? `${formData.experience} developer with expertise in ${formData.skills?.slice(0, 3).join(', ')}`
        : `${formData.position} at ${formData.company}`
    });

    if (success) {
      toast({
        title: 'Welcome to Bluespace!',
        description: 'Your account has been created successfully.',
      });

      // Redirect based on role
      switch (formData.role) {
        case 'client':
          navigate('/client-portal');
          break;
        case 'developer':
          navigate('/developer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } else {
      setErrors(['Registration failed. Please try again.']);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
            ${currentStep >= step ? 'bg-bluespace-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {currentStep > step ? <Check className="h-5 w-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-bluespace-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Join thousands of professionals on Bluespace</p>
      </div>

      <Tabs value={formData.role} onValueChange={(value) => updateFormData('role', value)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="developer" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Developer
          </TabsTrigger>
          <TabsTrigger value="client" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Client
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="developer" className="mt-0">
          <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <strong>Developer Benefits:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Access to premium projects</li>
                  <li>• Skill verification and badges</li>
                  <li>• Direct client communication</li>
                  <li>• Learning resources and mentorship</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="client" className="mt-0">
          <div className="text-sm text-gray-600 bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <strong>Client Benefits:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Vetted developer network</li>
                  <li>• Project management tools</li>
                  <li>• Secure payment processing</li>
                  <li>• 24/7 support and guarantees</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Create a strong password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            placeholder="City, Country"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );

  const renderRoleSpecificInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {formData.role === 'developer' ? 'Developer Profile' : 'Company Information'}
        </h2>
        <p className="text-gray-600">
          {formData.role === 'developer' 
            ? 'Showcase your skills and experience' 
            : 'Tell us about your project needs'
          }
        </p>
      </div>

      {formData.role === 'developer' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Experience Level *</Label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => updateFormData('portfolio', e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => updateFormData('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => updateFormData('github', e.target.value)}
                  placeholder="https://github.com/username"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Technical Skills * 
              <span className="text-gray-500 font-normal ml-2">
                (Select {formData.skills?.length || 0} skills)
              </span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {skills.map(skill => (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`cursor-pointer p-2 rounded-md border text-sm text-center transition-colors
                    ${formData.skills?.includes(skill)
                      ? 'bg-bluespace-600 text-white border-bluespace-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-bluespace-300'
                    }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {formData.role === 'client' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Your company name"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="position">Your Position</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="position"
                  type="text"
                  value={formData.position}
                  onChange={(e) => updateFormData('position', e.target.value)}
                  placeholder="e.g., CTO, Product Manager"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectType">Primary Project Type *</Label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => updateFormData('projectType', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select project type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="budget">Project Budget Range</Label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Expected Timeline</Label>
              <Input
                id="timeline"
                type="text"
                value={formData.timeline}
                onChange={(e) => updateFormData('timeline', e.target.value)}
                placeholder="e.g., 3 months, 6 weeks"
              />
            </div>
            <div>
              <Label htmlFor="teamSize">Current Team Size</Label>
              <Input
                id="teamSize"
                type="text"
                value={formData.teamSize}
                onChange={(e) => updateFormData('teamSize', e.target.value)}
                placeholder="e.g., 5 people, Just me"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
        <p className="text-gray-600">Review your information and complete your registration</p>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Account Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <Badge variant="outline" className="capitalize">{formData.role}</Badge>
            </div>
            {formData.role === 'developer' && formData.skills?.length && (
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Skills:</span>
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {formData.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                  {formData.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">+{formData.skills.length - 3} more</Badge>
                  )}
                </div>
              </div>
            )}
            {formData.role === 'client' && formData.company && (
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{formData.company}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => updateFormData('agreedToTerms', checked)}
          />
          <div className="text-sm">
            <Label htmlFor="terms" className="cursor-pointer">
              I agree to the{' '}
              <Link to="/terms" className="text-bluespace-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-bluespace-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="newsletter"
            checked={formData.agreedToNewsletter}
            onCheckedChange={(checked) => updateFormData('agreedToNewsletter', checked)}
          />
          <div className="text-sm">
            <Label htmlFor="newsletter" className="cursor-pointer">
              Send me updates about new features, projects, and platform news
            </Label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Star className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <strong className="text-blue-900">Welcome bonus!</strong>
            <p className="text-blue-700 mt-1">
              {formData.role === 'developer' 
                ? 'Complete your profile to unlock premium project visibility and get a skill verification badge.'
                : 'Get a free consultation call to discuss your project requirements with our experts.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-bluespace-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-2xl font-bold text-bluespace-900">Bluespace</span>
          </Link>
        </div>

        <Card>
          <CardContent className="p-8">
            {renderStepIndicator()}

            {errors.length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {currentStep === 1 && renderBasicInfo()}
            {currentStep === 2 && renderRoleSpecificInfo()}
            {currentStep === 3 && renderFinalStep()}

            <div className="flex justify-between pt-6 mt-6 border-t">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button onClick={nextStep} className="bg-bluespace-600 hover:bg-bluespace-700">
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="bg-bluespace-600 hover:bg-bluespace-700"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-sm text-bluespace-600 hover:underline font-medium">
            Sign in here
          </Link>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>10,000+ Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Verified Talent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
