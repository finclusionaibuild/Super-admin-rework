import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  HelpCircleIcon,
  LogOutIcon,
  EditIcon,
  ChevronRightIcon,
  HomeIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  BellRingIcon,
  CameraIcon,
  CheckCircleIcon,
  UsersIcon,
  ActivityIcon,
  BarChart3Icon,
  CrownIcon,
  ServerIcon,
  CodeIcon,
  ToggleRightIcon,
  MonitorIcon,
  ShieldCheckIcon,
  FingerprintIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  FileTextIcon
} from "lucide-react";

export const SuperAdminProfile = (): JSX.Element => {
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { user, getUserDisplayName, getUserInitials } = useAuth();

  const [superAdminInfo, setSuperAdminInfo] = useState({
    firstName: user?.firstName || "Admin",
    lastName: user?.lastName || "User",
    email: user?.email || "admin@surebanker.com",
    phone: user?.phone || "+234 801 234 5678",
    address: "Lagos, Nigeria",
    employeeId: user?.shortId || "SA001",
    department: "Platform Operations",
    role: "Super Administrator",
    dateJoined: "2022-06-01",
    lastLogin: "Today, 1:15 PM",
    profileImage: null,
    clearanceLevel: "Level 5 - Maximum",
    permissions: ["Platform Control", "Feature Flags", "API Management", "System Health", "Security Center", "Global Settings"]
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: true,
    smsNotifications: true,
    emailNotifications: true,
    superAdminPin: "****"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    systemCriticalAlerts: true,
    platformHealthAlerts: true,
    securityBreachAlerts: true,
    performanceAlerts: true,
    apiStatusAlerts: true,
    featureFlagAlerts: true,
    globalSystemAlerts: true
  });

  const [platformSettings, setPlatformSettings] = useState({
    language: "English",
    timezone: "UTC",
    theme: "Dark",
    autoLogout: "60 minutes",
    auditLogging: true,
    sessionTimeout: "4 hours",
    debugMode: false,
    maintenanceMode: false
  });

  const superAdminMenuItems = [
    { 
      id: "super-admin-info", 
      icon: <CrownIcon className="w-5 h-5" />, 
      title: "Super Admin Information", 
      description: "Update super admin profile and clearance details",
      action: () => setCurrentView("super-admin-info")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security Settings", 
      description: "Maximum security controls and authentication",
      action: () => setCurrentView("security")
    },
    { 
      id: "permissions", 
      icon: <KeyIcon className="w-5 h-5" />, 
      title: "Super Admin Permissions", 
      description: "View and manage platform-wide access",
      action: () => setCurrentView("permissions")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Platform Notifications", 
      description: "Critical system and platform alerts",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "platform", 
      icon: <ServerIcon className="w-5 h-5" />, 
      title: "Platform Controls", 
      description: "Global platform settings and controls",
      action: () => setCurrentView("platform")
    },
    { 
      id: "audit", 
      icon: <ActivityIcon className="w-5 h-5" />, 
      title: "Audit & Monitoring", 
      description: "Platform-wide audit logs and monitoring",
      action: () => setCurrentView("audit")
    },
    { 
      id: "support", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Super Admin Support", 
      description: "Executive support and platform resources",
      action: () => setCurrentView("support")
    },
  ];

  const superAdminStats = [
    { label: "Platform Users", value: "2.1M", color: "text-[#7C3AED]", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "System Health", value: "99.99%", color: "text-green-600", icon: <MonitorIcon className="w-5 h-5" /> },
    { label: "Active Features", value: "247", color: "text-blue-600", icon: <ToggleRightIcon className="w-5 h-5" /> },
    { label: "Security Status", value: "Maximum", color: "text-green-600", icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const recentSuperAdminActivity = [
    { action: "Feature Flag Updated", details: "Enabled new payment gateway for all users", timestamp: "1 hour ago", type: "feature" },
    { action: "Security Patch Applied", details: "Applied critical security update to platform", timestamp: "3 hours ago", type: "security" },
    { action: "API Rate Limit Adjusted", details: "Increased rate limits for business accounts", timestamp: "5 hours ago", type: "api" },
    { action: "Platform Maintenance", details: "Scheduled maintenance window completed", timestamp: "1 day ago", type: "maintenance" }
  ];

  const handleSaveSuperAdminInfo = () => {
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (securitySettings.newPassword === securitySettings.confirmPassword) {
      setSecuritySettings({
        ...securitySettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  // Super Admin Profile Overview Component
  const SuperAdminProfileOverview = () => (
    <div className="space-y-6">
      {/* Super Admin Header */}
      <Card className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  SS
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-[#7C3AED] hover:bg-gray-100"
              >
                <CameraIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {superAdminInfo.firstName} {superAdminInfo.lastName}
              </h2>
              <p className="text-white/80 mb-3">{superAdminInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {superAdminInfo.role}
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                  {superAdminInfo.clearanceLevel}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                  ID: {superAdminInfo.employeeId}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Super Admin Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {superAdminStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('600', '100')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm text-[#64748B] mb-1">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Super Admin Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Platform Controls</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#7C3AED] text-white">
              <ToggleRightIcon className="w-5 h-5" />
              <span className="text-sm">Feature Flags</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <ServerIcon className="w-5 h-5" />
              <span className="text-sm">Platform Health</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <CodeIcon className="w-5 h-5" />
              <span className="text-sm">API Management</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <ShieldIcon className="w-5 h-5" />
              <span className="text-sm">Security Center</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Super Admin Activity */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Platform Activity</h3>
          <div className="space-y-4">
            {recentSuperAdminActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'feature' ? 'bg-purple-100' :
                  activity.type === 'security' ? 'bg-red-100' :
                  activity.type === 'api' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  {activity.type === 'feature' && <ToggleRightIcon className="w-5 h-5 text-purple-600" />}
                  {activity.type === 'security' && <ShieldIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'api' && <CodeIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'maintenance' && <ServerIcon className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B]">{activity.action}</p>
                  <p className="text-sm text-[#64748B]">{activity.details}</p>
                </div>
                <p className="text-sm text-[#64748B]">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Super Admin Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Super Admin Settings</h3>
          <div className="space-y-3">
            {superAdminMenuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-[#F8F9FF] rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#7C3AED]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">{item.title}</p>
                    <p className="text-sm text-[#64748B]">{item.description}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-[#64748B]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Super Admin Information Component
  const SuperAdminInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Super Admin Information</h2>
          <p className="text-[#64748B]">Manage your super admin profile and clearance details</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Super Admin Details</h3>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <CrownIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Full Name</p>
                <p className="font-medium text-[#1E293B]">{superAdminInfo.firstName} {superAdminInfo.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Email</p>
                <p className="font-medium text-[#1E293B]">{superAdminInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Phone</p>
                <p className="font-medium text-[#1E293B]">{superAdminInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Clearance Level</p>
                <p className="font-medium text-[#1E293B]">{superAdminInfo.clearanceLevel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Security Settings Component
  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Maximum Security Settings</h2>
          <p className="text-[#64748B]">Super admin security controls and authentication</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Multi-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">SMS + Email Authentication</p>
                  <p className="text-sm text-[#64748B]">Dual-channel verification for super admin</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <FingerprintIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">Biometric Authentication</p>
                  <p className="text-sm text-[#64748B]">Fingerprint and face recognition</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Super Admin Permissions Component
  const SuperAdminPermissions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Super Admin Permissions</h2>
          <p className="text-[#64748B]">Maximum platform access and control permissions</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Platform-Wide Permissions</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {superAdminInfo.permissions.map((permission, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">{permission}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Platform Controls Component
  const PlatformControls = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Platform Controls</h2>
          <p className="text-[#64748B]">Manage global platform settings and controls</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Global Platform Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <ServerIcon className="w-5 h-5 text-[#7C3AED]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Maintenance Mode</p>
                  <p className="text-sm text-[#64748B]">Enable platform-wide maintenance mode</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformSettings.maintenanceMode}
                  onChange={(e) => setPlatformSettings({...platformSettings, maintenanceMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CodeIcon className="w-5 h-5 text-[#7C3AED]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Debug Mode</p>
                  <p className="text-sm text-[#64748B]">Enable platform-wide debug logging</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={platformSettings.debugMode}
                  onChange={(e) => setPlatformSettings({...platformSettings, debugMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notification Settings Component
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Platform Notification Settings</h2>
          <p className="text-[#64748B]">Critical platform alerts and notifications</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Critical Alert Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "systemCriticalAlerts", label: "System Critical Alerts", description: "Platform-wide critical system failures" },
              { key: "platformHealthAlerts", label: "Platform Health Alerts", description: "Performance and availability monitoring" },
              { key: "securityBreachAlerts", label: "Security Breach Alerts", description: "Immediate security incident notifications" },
              { key: "performanceAlerts", label: "Performance Alerts", description: "Platform performance degradation alerts" },
              { key: "apiStatusAlerts", label: "API Status Alerts", description: "API service status and outage notifications" },
              { key: "featureFlagAlerts", label: "Feature Flag Alerts", description: "Feature deployment and rollback notifications" },
              { key: "globalSystemAlerts", label: "Global System Alerts", description: "Platform-wide system notifications" },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <BellRingIcon className="w-5 h-5 text-[#64748B]" />
                  <div>
                    <p className="font-medium text-[#1E293B]">{setting.label}</p>
                    <p className="text-sm text-[#64748B]">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [setting.key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Audit & Monitoring Component
  const AuditMonitoring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Platform Audit & Monitoring</h2>
          <p className="text-[#64748B]">Platform-wide audit logs and system monitoring</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Platform Activity</h3>
          <div className="space-y-4">
            {recentSuperAdminActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'feature' ? 'bg-purple-100' :
                  activity.type === 'security' ? 'bg-red-100' :
                  activity.type === 'api' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  {activity.type === 'feature' && <ToggleRightIcon className="w-5 h-5 text-purple-600" />}
                  {activity.type === 'security' && <ShieldIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'api' && <CodeIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'maintenance' && <ServerIcon className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B]">{activity.action}</p>
                  <p className="text-sm text-[#64748B]">{activity.details}</p>
                </div>
                <p className="text-sm text-[#64748B]">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Super Admin Support Center Component
  const SuperAdminSupportCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Super Admin Support</h2>
          <p className="text-[#64748B]">Executive support and platform resources</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="w-12 h-12 text-[#7C3AED] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Executive Support</h3>
            <p className="text-sm text-[#64748B]">Direct line to platform architects</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-[#7C3AED] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Emergency Hotline</h3>
            <p className="text-sm text-[#64748B]">+234 700 EMERGENCY</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#7C3AED] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Executive Email</h3>
            <p className="text-sm text-[#64748B]">exec@surebanker.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "super-admin-info":
        return <SuperAdminInformation />;
      case "security":
        return <SecuritySettings />;
      case "permissions":
        return <SuperAdminPermissions />;
      case "notifications":
        return <NotificationSettings />;
      case "platform":
        return <PlatformControls />;
      case "audit":
        return <AuditMonitoring />;
      case "support":
        return <SuperAdminSupportCenter />;
      default:
        return <SuperAdminProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Super Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
              <Badge className="bg-purple-100 text-purple-800 text-xs">SUPER ADMIN</Badge>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                SUPER ADMIN MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
                  onClick: () => navigate("/super-admin")
                },
                { 
                  name: "Platform Overview", 
                  icon: <ServerIcon className="w-5 h-5" />,
                  onClick: () => navigate("/super-admin")
                },
                { 
                  name: "Feature Flags", 
                  icon: <ToggleRightIcon className="w-5 h-5" />,
                  onClick: () => navigate("/super-admin")
                },
                { 
                  name: "API Management", 
                  icon: <CodeIcon className="w-5 h-5" />,
                  onClick: () => navigate("/super-admin")
                },
                { 
                  name: "Security Center", 
                  icon: <ShieldIcon className="w-5 h-5" />,
                  onClick: () => navigate("/super-admin")
                },
                { 
                  name: "Profile", 
                  icon: <UserIcon className="w-5 h-5" />,
                  active: true,
                  onClick: () => navigate("/super-admin-profile")
                }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    item.active
                      ? "bg-[#7C3AED] text-white shadow-lg"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#7C3AED]"
                  }`}
                >
                  <div className={`${item.active ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#7C3AED] text-white overflow-hidden relative card-no-shadow">
              <CardContent className="p-4 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#F59E0B] rounded-full flex items-center justify-center">
                    <CrownIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Super Admin</p>
                    <p className="text-sm text-gray-300">Maximum Access</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#EC4899] to-[#F59E0B] hover:from-[#DB2777] hover:to-[#F97316] text-white shadow-lg btn-primary">
                  Platform Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                  <CrownIcon className="w-6 h-6 text-[#7C3AED]" />
                  Super Admin Profile
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-[#F8F9FF]">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 hover:bg-[#F8F9FF]"
                    onClick={() => navigate("/super-admin")}
                  >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    5
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{getUserDisplayName()}</div>
                    <div className="text-xs text-[#64748B]">Super Administrator</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#7C3AED] text-white">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#7C3AED] text-white">SS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Super Admin</h1>
              <p className="text-xs text-[#64748B]">Platform Controller</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                5
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Dashboard", icon: <ServerIcon className="w-6 h-6" />, onClick: () => navigate("/super-admin") },
              { name: "Features", icon: <ToggleRightIcon className="w-6 h-6" />, onClick: () => navigate("/super-admin") },
              { name: "Security", icon: <ShieldIcon className="w-6 h-6" />, onClick: () => navigate("/super-admin") },
              { name: "Profile", icon: <CrownIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/super-admin-profile") }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
                <div className={`${item.active ? 'text-[#7C3AED]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#7C3AED] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-20 right-6 lg:bottom-6">
        <Button 
          variant="outline" 
          className="bg-white text-red-600 border-red-200 hover:bg-red-50 shadow-lg"
          onClick={() => {
            logout();
            navigate("/signIn");
          }}
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};