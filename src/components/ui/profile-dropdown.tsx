import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Avatar, AvatarFallback } from './avatar';
import { UserIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface ProfileDropdownProps {
  userName: string;
  userRole: string;
  avatar: string;
  profileRoute: string;
  logoutRoute?: string;
  accountType?: 'individual' | 'business' | 'admin' | 'super-admin' | 'support' | 'developer';
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName,
  userRole,
  avatar,
  profileRoute,
  logoutRoute = "/",
  accountType = 'individual'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    setIsOpen(false);
    navigate(profileRoute);
  };

  const { logout } = useAuthStore();

  const handleLogout = () => {
    setIsOpen(false);
    // Clear any demo-related stored data
    localStorage.removeItem('demoUser');
    localStorage.removeItem('accountType');
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('businessOnboardingComplete');
    localStorage.removeItem('individualOnboardingComplete');
    
    // Use Zustand auth store logout which handles auth data properly
    logout();
    
    // Navigate to logout route (typically sign in page)
    navigate(logoutRoute);
  };

  const getAvatarColor = () => {
    switch (accountType) {
      case 'business':
        return 'bg-[#5B52FF]';
      case 'admin':
        return 'bg-green-500';
      case 'super-admin':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'support':
        return 'bg-orange-500';
      case 'developer':
        return 'bg-indigo-500';
      default:
        return 'bg-[#5B52FF]';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <div 
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-right">
          <div className="text-sm font-medium text-[#1E293B]">{userName}</div>
          <div className="text-xs text-[#64748B]">{userRole}</div>
        </div>
        <div className="flex items-center gap-1">
          <Avatar className="w-8 h-8">
            <AvatarFallback className={`${getAvatarColor()} text-white`}>
              {avatar}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon className={`w-4 h-4 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={`${getAvatarColor()} text-white text-lg`}>
                  {avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-[#1E293B]">{userName}</p>
                <p className="text-sm text-[#64748B]">{userRole}</p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-3 text-left hover:bg-gray-50"
              onClick={handleViewProfile}
            >
              <UserIcon className="w-4 h-4 mr-3" />
              View Profile
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-3 text-left hover:bg-red-50 text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOutIcon className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};