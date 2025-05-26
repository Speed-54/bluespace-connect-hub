
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare,
  Search,
  Star,
  DollarSign
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatar?: string;
  projectsCount: number;
  totalPaid: number;
  rating: number;
  status: 'active' | 'inactive';
  lastContact: string;
}

const ClientInformation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      projectsCount: 3,
      totalPaid: 25000,
      rating: 5,
      status: 'active',
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'michael@startupxyz.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      projectsCount: 1,
      totalPaid: 8000,
      rating: 4,
      status: 'active',
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      company: 'DataCorp',
      email: 'emily@datacorp.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      projectsCount: 2,
      totalPaid: 18000,
      rating: 5,
      status: 'inactive',
      lastContact: '3 weeks ago'
    },
    {
      id: '4',
      name: 'David Kim',
      company: 'FinanceApp',
      email: 'david@financeapp.com',
      phone: '+1 (555) 321-0987',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      projectsCount: 1,
      totalPaid: 5000,
      rating: 4,
      status: 'active',
      lastContact: '5 days ago'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ClientCard = ({ client }: { client: Client }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={client.avatar} />
            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {client.company}
                </p>
              </div>
              <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                {client.status}
              </Badge>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-3 w-3" />
                <a href={`mailto:${client.email}`} className="hover:text-blue-600">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-3 w-3" />
                <a href={`tel:${client.phone}`} className="hover:text-blue-600">
                  {client.phone}
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Projects</p>
                <p className="font-medium">{client.projectsCount}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Paid</p>
                <p className="font-medium">${client.totalPaid.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="font-medium">{client.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">Last contact: {client.lastContact}</span>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalPaid, 0);
  const averageRating = clients.reduce((sum, c) => sum + c.rating, 0) / clients.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalClients}</p>
                <p className="text-sm text-gray-600">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{activeClients}</p>
                <p className="text-sm text-gray-600">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Directory
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No clients found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInformation;
