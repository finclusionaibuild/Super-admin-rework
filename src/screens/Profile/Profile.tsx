import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { useAccountNavigation } from "../../hooks/useAccountData";
import { AccountSwitcher } from "../../components/ui/account-switcher";
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
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  EditIcon,
  ChevronRightIcon,
  HomeIcon,
  ReceiptIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
  CameraIcon,
  UploadIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  KeyIcon,
  SmartphoneIcon,
  BellRingIcon,
  LanguagesIcon,
  PaletteIcon,
  DownloadIcon,
  ShareIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  FileTextIcon,
  AlertCircleIcon,
  InfoIcon,
  TrendingUpIcon,
  DollarSignIcon,
  WalletIcon,
  CopyIcon,
  RefreshCwIcon,
  PlusIcon,
  MinusIcon,
  ScanIcon,
  QrCodeIcon,
  FingerprintIcon,
  ShieldCheckIcon
} from "lucide-react";

export const Profile = (): JSX.Element => {
  const { currentAccount, isBusinessAccount, updateAccountData } = useAccount();
  const { navigationItems } = useAccountNavigation();
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: currentAccount?.name?.split(' ')[0] || "User",
    lastName: currentAccount?.name?.split(' ')[1] || "",
    email: currentAccount?.email || "user@email.com",
    phone: isBusinessAccount ? "+234 801 234 5678" : "+234 801 234 5678",
    address: isBusinessAccount ? "Victoria Island, Lagos" : "Lagos, Nigeria",
    dateOfBirth: "1990-05-15",
    kycLevel: isBusinessAccount ? "Verified" : "Tier 2",
    accountType: isBusinessAccount ? "Business" : "Individual",
    profileImage: null,
    bvn: "22345678901",
    nin: "12345678901"
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: false,
    smsNotifications: true,
    emailNotifications: true,
    transactionPin: "****"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    transactionAlerts: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const [appSettings, setAppSettings] = useState({
    language: "English",
    currency: "NGN",
    theme: "Light",
    biometricLogin: false,
    autoLogout: "15 minutes"
  });

  const profileMenuItems = [
    { 
      id: "personal", 
      icon: <UserIcon className="w-5 h-5" />, 
      title: "Personal Information", 
      description: "Update your personal details",
      action: () => setCurrentView("personal")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security Settings", 
      description: "Password, PIN, and 2FA",
      action: () => setCurrentView("security")
    },
    { 
      id: "cards", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      title: "Cards & Accounts", 
      description: "Manage cards and bank accounts",
      action: () => setCurrentView("cards")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Notifications", 
      description: "Email and push preferences",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "kyc", 
      icon: <FileTextIcon className="w-5 h-5" />, 
      title: "KYC Verification", 
      description: "Identity verification status",
      action: () => setCurrentView("kyc")
    },
    { 
      id: "settings", 
      icon: <SettingsIcon className="w-5 h-5" />, 
      title: "App Settings", 
      description: "Language, theme, and preferences",
      action: () => setCurrentView("settings")
    },
    { 
      id: "support", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Help & Support", 
      description: "FAQs and contact support",
      action: () => setCurrentView("support")
    },
  ];

  const accountStats = [
    { label: "Account Balance", value: "₦120,000.00", color: "text-[#5B52FF]", icon: <WalletIcon className="w-5 h-5" /> },
    { label: "Total Transactions", value: "1,247", color: "text-green-600", icon: <TrendingUpIcon className="w-5 h-5" /> },
    { label: "Cards Active", value: "3", color: "text-blue-600", icon: <CreditCardIcon className="w-5 h-5" /> },
    { label: "KYC Status", value: "Verified", color: "text-green-600", icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  // Navigation items with navigation functions
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <HomeIcon className="w-5  h-5" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Payments", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      hasDropdown: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "Transactions", 
      icon: <ReceiptIcon className="w-5 h-5" />,
      onClick: () => navigate("/transactions")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-5 h-5" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "SureSavings", 
      icon: <PiggyBankIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "SureBudget", 
      icon: <BarChart3Icon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "SureEscrow", 
      icon: <HandshakeIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Inbox", 
      icon: <InboxIcon className="w-5 h-5" />, 
      notifications: 99,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Rate Us", 
      icon: <StarIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
  ];

  // Mobile Navigation Items with navigation functions
  const mobileNavItems = [
    { 
      name: "Home", 
      icon: <HomeIcon className="w-6 h-6" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Transfer", 
      icon: <ArrowRightIcon className="w-6 h-6" />,
      onClick: () => navigate("/transfer")
    },
    { 
      name: "Goals", 
      icon: <StarIcon className="w-6 h-6" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-6 h-6" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "Profile", 
      icon: <UserIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/profile")
    },
  ];

  const handleSavePersonalInfo = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handlePasswordChange = () => {
    if (securitySettings.newPassword === securitySettings.confirmPassword) {
      // Handle password change
      setSecuritySettings({
        ...securitySettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Profile Overview Component
  const ProfileOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-[#5B52FF] hover:bg-gray-100"
              >
                <CameraIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <p className="text-white/80 mb-3">{userInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {userInfo.kycLevel} Verified
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  {userInfo.accountType}
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

      {/* Account Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {accountStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#5B52FF] text-white">
              <CreditCardIcon className="w-5 h-5" />
              <span className="text-sm">Add Card</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <ShieldIcon className="w-5 h-5" />
              <span className="text-sm">Upgrade KYC</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <DownloadIcon className="w-5 h-5" />
              <span className="text-sm">Download Statement</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              <span className="text-sm">Contact Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Profile Settings</h3>
          <div className="space-y-3">
            {profileMenuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-[#F8F9FF] rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#5B52FF]">
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

  // Personal Information Component
  const PersonalInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Personal Information</h2>
          <p className="text-[#64748B]">Manage your personal details and contact information</p>
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
            <h3 className="text-lg font-semibold text-[#1E293B]">Basic Information</h3>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">First Name</label>
                <Input
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Last Name</label>
                <Input
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Email</label>
                <Input
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone</label>
                <Input
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Address</label>
                <Input
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Date of Birth</label>
                <Input
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2 flex gap-4">
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={handleSavePersonalInfo}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Full Name</p>
                  <p className="font-medium text-[#1E293B]">{userInfo.firstName} {userInfo.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Email</p>
                  <p className="font-medium text-[#1E293B]">{userInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Phone</p>
                  <p className="font-medium text-[#1E293B]">{userInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Address</p>
                  <p className="font-medium text-[#1E293B]">{userInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Date of Birth</p>
                  <p className="font-medium text-[#1E293B]">{userInfo.dateOfBirth}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Identity Verification */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Identity Verification</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <FileTextIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">BVN</p>
                <p className="font-medium text-[#1E293B]">•••••••••{userInfo.bvn.slice(-2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileTextIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">NIN</p>
                <p className="font-medium text-[#1E293B]">•••••••••{userInfo.nin.slice(-2)}</p>
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
          <h2 className="text-2xl font-bold text-[#1E293B]">Security Settings</h2>
          <p className="text-[#64748B]">Manage your account security and authentication</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Password Change */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showCurrentPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">New Password</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showNewPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Confirm New Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button 
              onClick={handlePasswordChange}
              disabled={!securitySettings.currentPassword || !securitySettings.newPassword || securitySettings.newPassword !== securitySettings.confirmPassword}
              className="bg-[#5B52FF] text-white"
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">SMS Authentication</p>
                  <p className="text-sm text-[#64748B]">Receive codes via SMS</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                <Button variant="outline" size="sm">
                  Disable
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <SmartphoneIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Authenticator App</p>
                  <p className="text-sm text-[#64748B]">Use Google Authenticator or similar</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Setup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biometric Settings */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Biometric Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FingerprintIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Fingerprint Login</p>
                  <p className="text-sm text-[#64748B]">Use fingerprint to login</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction PIN */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Transaction PIN</h3>
          <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
            <div className="flex items-center gap-3">
              <KeyIcon className="w-5 h-5 text-[#5B52FF]" />
              <div>
                <p className="font-medium text-[#1E293B]">4-Digit PIN</p>
                <p className="text-sm text-[#64748B]">Used for transaction authorization</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change PIN
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notifications Component
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Notification Settings</h2>
          <p className="text-[#64748B]">Manage how you receive notifications</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "pushNotifications", label: "Push Notifications", description: "Receive notifications on your device" },
              { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
              { key: "smsNotifications", label: "SMS Notifications", description: "Receive notifications via SMS" },
              { key: "transactionAlerts", label: "Transaction Alerts", description: "Get notified of all transactions" },
              { key: "securityAlerts", label: "Security Alerts", description: "Important security notifications" },
              { key: "marketingEmails", label: "Marketing Emails", description: "Promotional offers and updates" },
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // App Settings Component
  const AppSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">App Settings</h2>
          <p className="text-[#64748B]">Customize your app experience</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">General Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Language</label>
              <select 
                value={appSettings.language}
                onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="English">English</option>
                <option value="Yoruba">Yoruba</option>
                <option value="Hausa">Hausa</option>
                <option value="Igbo">Igbo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Currency</label>
              <select 
                value={appSettings.currency}
                onChange={(e) => setAppSettings({...appSettings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Theme</label>
              <select 
                value={appSettings.theme}
                onChange={(e) => setAppSettings({...appSettings, theme: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Auto Logout</label>
              <select 
                value={appSettings.autoLogout}
                onChange={(e) => setAppSettings({...appSettings, autoLogout: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="5 minutes">5 minutes</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // KYC Verification Component
  const KYCVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYC Verification</h2>
          <p className="text-[#64748B]">Complete your identity verification</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Current KYC Status */}
      <Card className="border-green-200 bg-green-50 card-no-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">Tier 2 Verified</h3>
              <p className="text-green-700">Your account is verified for transactions up to ₦1,000,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Levels */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Verification Levels</h3>
          <div className="space-y-4">
            {[
              {
                tier: "Tier 1",
                status: "completed",
                limit: "₦50,000",
                requirements: ["Phone Number", "Email Address"],
                description: "Basic verification for small transactions"
              },
              {
                tier: "Tier 2",
                status: "completed",
                limit: "₦1,000,000",
                requirements: ["BVN", "Government ID", "Selfie"],
                description: "Enhanced verification for higher limits"
              },
              {
                tier: "Tier 3",
                status: "available",
                limit: "₦5,000,000",
                requirements: ["Utility Bill", "Bank Statement", "Income Proof"],
                description: "Premium verification for maximum limits"
              }
            ].map((level, index) => (
              <div key={index} className={`p-4 border rounded-lg ${
                level.status === "completed" ? "border-green-200 bg-green-50" :
                level.status === "pending" ? "border-yellow-200 bg-yellow-50" :
               level.status === "available" ? "border-blue-200 bg-blue-50" :
                "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      level.status === "completed" ? "bg-green-500" :
                      level.status === "pending" ? "bg-yellow-500" :
                     level.status === "available" ? "bg-blue-500" :
                      "bg-gray-400"
                    }`}>
                      {level.status === "completed" ? (
                        <CheckIcon className="w-4 h-4 text-white" />
                      ) : level.status === "available" ? (
                        <span className="text-white text-sm font-bold">!</span>
                      ) : (
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E293B]">{level.tier}</h4>
                      <p className="text-sm text-[#64748B]">{level.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1E293B]">{level.limit}</p>
                    <p className="text-sm text-[#64748B]">Daily Limit</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {level.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} className={
                        level.status === "completed" ? "bg-green-100 text-green-800" :
                       level.status === "available" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {req}
                      </Badge>
                    ))}
                  </div>
                  {level.status === "available" && (
                    <Button size="sm" className="bg-[#5B52FF] text-white">
                      {index + 1 === 3 ? 'Upgrade to Tier 3' : 'Upgrade Now'}
                    </Button>
                  )}
                  {level.status === "locked" && (
                    <Badge className="bg-gray-100 text-gray-600">
                      Complete Tier {index} First
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Component
  const SupportCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Help & Support</h2>
          <p className="text-[#64748B]">Get help and contact our support team</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Live Chat</h3>
            <p className="text-sm text-[#64748B]">Chat with our support team</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Call Support</h3>
            <p className="text-sm text-[#64748B]">+234 700 SURE BANK</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Email Support</h3>
            <p className="text-sm text-[#64748B]">support@surebanker.com</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              "How do I reset my transaction PIN?",
              "What are the transaction limits?",
              "How do I upgrade my KYC level?",
              "How do I link a new bank account?",
              "What should I do if my card is lost?"
            ].map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-[#F8F9FF]">
                <p className="text-[#1E293B]">{question}</p>
                <ChevronRightIcon className="w-5 h-5 text-[#64748B]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "personal":
        return <PersonalInformation />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "settings":
        return <AppSettings />;
      case "kyc":
        return <KYCVerification />;
      case "support":
        return <SupportCenter />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar - Static */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gradient-to-r hover:from-[#F8F9FF] hover:to-[#F0F4FF] hover:text-[#5B52FF]"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  )}
                  {item.notifications && (
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-[#1E293B] text-white card-no-shadow">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-3">
                  Gain full access to rewards and bonuses when you get your friends to use{" "}
                  <span className="font-bold">SureBanker</span>
                </p>
                <Button className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white btn-primary">
                  Refer & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                    <UserIcon className="w-6 h-6 text-[#5B52FF]" />
                    Profile Settings
                  </h1>
                </div>
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
                   onClick={() => navigate("/inbox")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'User'}</div>
                  </div>
                  <AccountSwitcher />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            {renderCurrentView()}
          </main>
        </div>

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Profile</h1>
              <p className="text-xs text-[#64748B]">{isBusinessAccount ? 'Business account' : 'Manage your account'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>NGN</span>
              <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Content - Standardized Layout */}
        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        {/* Mobile Bottom Navigation - Consistent with Dashboard */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
                <div className={`${item.active ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
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
          onClick={() => navigate("/")}
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};