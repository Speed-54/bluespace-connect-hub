
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password, selectedRole);
    
    if (success) {
      toast({
        title: 'Login successful!',
        description: 'Welcome back to Bluespace.',
      });
      
      // Redirect based on role
      switch (selectedRole) {
        case 'client':
          navigate('/client-portal');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'developer':
          navigate('/developer');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-bluespace-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-2xl font-bold text-bluespace-900">Bluespace</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Sign in to your account</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please select your role and sign in.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole} onValueChange={setSelectedRole}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="developer">Developer</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <TabsContent value="client" className="mt-0">
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <strong>Client Portal:</strong> Manage your projects, track progress, and communicate with developers.
                  </div>
                </TabsContent>

                <TabsContent value="developer" className="mt-0">
                  <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                    <strong>Developer Dashboard:</strong> Find projects, showcase your skills, and manage your work.
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="mt-0">
                  <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                    <strong>Admin Panel:</strong> Manage users, projects, and platform settings.
                  </div>
                </TabsContent>

                <Button 
                  type="submit" 
                  className="w-full bg-bluespace-600 hover:bg-bluespace-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/forgot-password" className="text-sm text-bluespace-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link to="/register" className="text-sm text-bluespace-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Email: demo@bluespace.tech | Password: demo123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
