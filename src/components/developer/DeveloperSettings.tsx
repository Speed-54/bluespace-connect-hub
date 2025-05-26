
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Smartphone,
  Shield,
  Download
} from 'lucide-react';

const DeveloperSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    projectUpdates: true,
    payments: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showRates: false,
    allowMessages: true,
    showOnlineStatus: true
  });

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" value="UTC-8 (Pacific Time)" />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input id="language" value="English" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" value="USD ($)" />
            </div>
            <div>
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input id="workingHours" value="9:00 AM - 5:00 PM" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive browser push notifications</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, push: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive urgent notifications via SMS</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, sms: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Notification Types</h4>
            
            <div className="flex items-center justify-between">
              <Label>Project Updates</Label>
              <Switch
                checked={notifications.projectUpdates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, projectUpdates: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Payment Notifications</Label>
              <Switch
                checked={notifications.payments}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, payments: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Marketing Communications</Label>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-gray-600">Make your profile visible to clients</p>
              </div>
              <Switch
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Hourly Rates</Label>
                <p className="text-sm text-gray-600">Display your rates on your profile</p>
              </div>
              <Switch
                checked={privacy.showRates}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, showRates: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Direct Messages</Label>
                <p className="text-sm text-gray-600">Let clients message you directly</p>
              </div>
              <Switch
                checked={privacy.allowMessages}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, allowMessages: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Online Status</Label>
                <p className="text-sm text-gray-600">Display when you're online</p>
              </div>
              <Switch
                checked={privacy.showOnlineStatus}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, showOnlineStatus: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Security Actions</h4>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Setup 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              API Access
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-medium text-red-600">Danger Zone</h4>
            <p className="text-sm text-gray-600">
              These actions are permanent and cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                Deactivate Account
              </Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default DeveloperSettings;
