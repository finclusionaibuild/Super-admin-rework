import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import {
  ShieldCheckIcon,
  FingerprintIcon,
  SmartphoneIcon,
  KeyIcon,
  LockIcon,
  UnlockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  ScanIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  BellIcon,
  SettingsIcon
} from 'lucide-react';

interface SecurityProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedSecurity: React.FC<SecurityProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pin' | 'biometric' | '2fa'>('overview');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPins, setShowPins] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+234 801 234 5678');
  const [email, setEmail] = useState('carchy@email.com');
  const [isVerifying, setIsVerifying] = useState(false);

  const securityFeatures = [
    {
      id: 'pin',
      title: 'Transaction PIN',
      description: '4-digit PIN for transaction authorization',
      status: 'active',
      icon: <KeyIcon className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      description: 'Fingerprint and face recognition',
      status: biometricEnabled ? 'active' : 'inactive',
      icon: <FingerprintIcon className="w-6 h-6" />,
      color: biometricEnabled ? 'text-green-600' : 'text-gray-400'
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      description: 'SMS and email verification',
      status: twoFactorEnabled ? 'active' : 'inactive',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      color: twoFactorEnabled ? 'text-green-600' : 'text-gray-400'
    },
    {
      id: 'notifications',
      title: 'Security Notifications',
      description: 'Real-time security alerts',
      status: 'active',
      icon: <BellIcon className="w-6 h-6" />,
      color: 'text-green-600'
    }
  ];

  const recentSecurityActivity = [
    {
      id: '1',
      action: 'PIN Changed',
      device: 'iPhone 13 Pro',
      location: 'Lagos, Nigeria',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      action: 'Login Attempt',
      device: 'Chrome Browser',
      location: 'Lagos, Nigeria',
      timestamp: '1 day ago',
      status: 'success'
    },
    {
      id: '3',
      action: 'Failed Login',
      device: 'Unknown Device',
      location: 'Abuja, Nigeria',
      timestamp: '3 days ago',
      status: 'failed'
    }
  ];

  const handlePinChange = () => {
    if (newPin === confirmPin && newPin.length === 4) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        // Show success message
      }, 2000);
    }
  };

  const enableBiometric = async () => {
    setIsVerifying(true);
    try {
      // Simulate biometric setup
      setTimeout(() => {
        setBiometricEnabled(true);
        setIsVerifying(false);
      }, 3000);
    } catch (error) {
      setIsVerifying(false);
    }
  };

  const setup2FA = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setTwoFactorEnabled(true);
      setIsVerifying(false);
    }, 2000);
  };

  // Security Overview
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Security Center</h3>
        <p className="text-[#64748B]">Manage your account security settings</p>
      </div>

      {/* Security Score */}
      <Card className="bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">Security Score</h4>
              <p className="text-white/80">Your account security level</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">85%</div>
              <Badge className="bg-white/20 text-white mt-2">Very Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures.map((feature) => (
          <Card 
            key={feature.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => setActiveTab(feature.id as any)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E293B]">{feature.title}</h4>
                    <p className="text-sm text-[#64748B]">{feature.description}</p>
                  </div>
                </div>
                <Badge className={
                  feature.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }>
                  {feature.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Recent Security Activity</h4>
          <div className="space-y-4">
            {recentSecurityActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">{activity.action}</p>
                    <p className="text-sm text-[#64748B]">{activity.device} • {activity.location}</p>
                  </div>
                </div>
                <span className="text-sm text-[#64748B]">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // PIN Management
  const renderPinManagement = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Transaction PIN</h3>
        <p className="text-[#64748B]">Manage your 4-digit transaction PIN</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Current PIN
              </label>
              <div className="relative">
                <Input
                  type={showPins ? "text" : "password"}
                  placeholder="Enter current PIN"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value.slice(0, 4))}
                  className="h-12 text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPins(!showPins)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPins ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                New PIN
              </label>
              <Input
                type={showPins ? "text" : "password"}
                placeholder="Enter new PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.slice(0, 4))}
                className="h-12 text-center text-2xl tracking-widest"
                maxLength={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Confirm New PIN
              </label>
              <Input
                type={showPins ? "text" : "password"}
                placeholder="Confirm new PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.slice(0, 4))}
                className="h-12 text-center text-2xl tracking-widest"
                maxLength={4}
              />
            </div>

            {newPin && confirmPin && newPin !== confirmPin && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircleIcon className="w-4 h-4" />
                <span className="text-sm">PINs do not match</span>
              </div>
            )}

            <Button 
              onClick={handlePinChange}
              disabled={!currentPin || !newPin || !confirmPin || newPin !== confirmPin || isVerifying}
              className="w-full bg-[#5B52FF] text-white h-12"
            >
              {isVerifying ? (
                <>
                  <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                  Updating PIN...
                </>
              ) : (
                'Update PIN'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">PIN Security Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a unique PIN that's not your birthday or phone number</li>
                <li>• Never share your PIN with anyone</li>
                <li>• Change your PIN regularly for better security</li>
                <li>• Cover your screen when entering your PIN in public</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Biometric Setup
  const renderBiometric = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Biometric Authentication</h3>
        <p className="text-[#64748B]">Use fingerprint or face recognition to secure your account</p>
      </div>

      {!biometricEnabled ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#F8F9FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <FingerprintIcon className="w-10 h-10 text-[#5B52FF]" />
            </div>
            <h4 className="text-lg font-semibold text-[#1E293B] mb-2">Enable Biometric Login</h4>
            <p className="text-[#64748B] mb-6">
              Use your fingerprint or face to quickly and securely access your account
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-left">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm">Faster login experience</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm">Enhanced security</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm">No need to remember passwords</span>
              </div>
            </div>

            <Button 
              onClick={enableBiometric}
              disabled={isVerifying}
              className="bg-[#5B52FF] text-white px-8 py-3"
            >
              {isVerifying ? (
                <>
                  <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  <FingerprintIcon className="w-4 h-4 mr-2" />
                  Enable Biometric
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900">Biometric Authentication Enabled</h4>
                <p className="text-sm text-green-700">Your fingerprint and face recognition are active</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setBiometricEnabled(false)}
                className="border-green-300 text-green-700"
              >
                Disable
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Device Requirements</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Your device must support fingerprint or face recognition</li>
                <li>• Biometric data is stored securely on your device only</li>
                <li>• You can still use your PIN as a backup method</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // 2FA Setup
  const render2FA = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Two-Factor Authentication</h3>
        <p className="text-[#64748B]">Add an extra layer of security to your account</p>
      </div>

      {/* SMS 2FA */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PhoneIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1E293B]">SMS Authentication</h4>
                <p className="text-sm text-[#64748B]">Receive verification codes via SMS</p>
                <p className="text-sm text-[#64748B]">{phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">Active</Badge>
              <Button variant="outline" size="sm">
                Change Number
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email 2FA */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MailIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1E293B]">Email Authentication</h4>
                <p className="text-sm text-[#64748B]">Receive verification codes via email</p>
                <p className="text-sm text-[#64748B]">{email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">Active</Badge>
              <Button variant="outline" size="sm">
                Change Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authenticator App */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <SmartphoneIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1E293B]">Authenticator App</h4>
                <p className="text-sm text-[#64748B]">Use Google Authenticator or similar apps</p>
                <p className="text-sm text-[#64748B]">More secure than SMS</p>
              </div>
            </div>
            <Button 
              onClick={setup2FA}
              disabled={isVerifying}
              className="bg-[#5B52FF] text-white"
            >
              {isVerifying ? 'Setting up...' : 'Setup'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Why Use 2FA?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Protects your account even if your password is compromised</li>
                <li>• Required for high-value transactions</li>
                <li>• Meets international banking security standards</li>
                <li>• Can prevent 99.9% of automated attacks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1E293B]">Security Settings</h2>
            <Button variant="ghost" onClick={onClose}>
              <XCircleIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {[
              { id: 'overview', name: 'Overview', icon: <ShieldCheckIcon className="w-4 h-4" /> },
              { id: 'pin', name: 'PIN', icon: <KeyIcon className="w-4 h-4" /> },
              { id: 'biometric', name: 'Biometric', icon: <FingerprintIcon className="w-4 h-4" /> },
              { id: '2fa', name: '2FA', icon: <SmartphoneIcon className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#5B52FF] shadow-sm'
                    : 'text-[#64748B] hover:text-[#5B52FF]'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'pin' && renderPinManagement()}
          {activeTab === 'biometric' && renderBiometric()}
          {activeTab === '2fa' && render2FA()}
        </div>
      </div>
    </div>
  );
};