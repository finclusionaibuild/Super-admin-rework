import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import {
  ShareIcon,
  CopyIcon,
  TrophyIcon,
  GiftIcon,
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
  StarIcon,
  CrownIcon,
  MedalIcon,
  AwardIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  MessageSquareIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon
} from 'lucide-react';

interface ReferralData {
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  currentRank: string;
  nextRank: string;
  referralsToNextRank: number;
  referralCode: string;
  referralLink: string;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'verified' | 'active';
  dateReferred: string;
  earnings: number;
  avatar: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  referrals: number;
  earnings: number;
  avatar: string;
  badge?: string;
}

export const ReferralSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invite' | 'leaderboard'>('overview');
  const [inviteMethod, setInviteMethod] = useState<'link' | 'email' | 'sms' | 'social'>('link');
  const [emailList, setEmailList] = useState('');
  const [phoneList, setPhoneList] = useState('');

  const referralData: ReferralData = {
    totalReferrals: 12,
    totalEarnings: 24000,
    pendingEarnings: 6000,
    currentRank: 'Silver Ambassador',
    nextRank: 'Gold Ambassador',
    referralsToNextRank: 8,
    referralCode: 'CARCHY2024',
    referralLink: 'https://surebanker.com/ref/CARCHY2024'
  };

  const myReferrals: Referral[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@email.com',
      status: 'active',
      dateReferred: '2024-08-15',
      earnings: 2000,
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@email.com',
      status: 'verified',
      dateReferred: '2024-08-20',
      earnings: 1000,
      avatar: 'JS'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@email.com',
      status: 'pending',
      dateReferred: '2024-08-25',
      earnings: 0,
      avatar: 'MJ'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Sarah Wilson', referrals: 156, earnings: 312000, avatar: 'SW', badge: 'crown' },
    { rank: 2, name: 'David Brown', referrals: 134, earnings: 268000, avatar: 'DB', badge: 'gold' },
    { rank: 3, name: 'Emma Davis', referrals: 98, earnings: 196000, avatar: 'ED', badge: 'silver' },
    { rank: 4, name: 'Tom Wilson', referrals: 87, earnings: 174000, avatar: 'TW' },
    { rank: 5, name: 'Lisa Garcia', referrals: 76, earnings: 152000, avatar: 'LG' },
    { rank: 6, name: 'Carchy Atinse', referrals: 12, earnings: 24000, avatar: 'CA' }
  ];

  const ranks = [
    { name: 'Bronze Ambassador', minReferrals: 0, bonus: 1000, color: 'bg-orange-500' },
    { name: 'Silver Ambassador', minReferrals: 5, bonus: 2000, color: 'bg-gray-400' },
    { name: 'Gold Ambassador', minReferrals: 20, bonus: 5000, color: 'bg-yellow-500' },
    { name: 'Platinum Ambassador', minReferrals: 50, bonus: 10000, color: 'bg-purple-500' },
    { name: 'Diamond Ambassador', minReferrals: 100, bonus: 25000, color: 'bg-blue-500' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareViaEmail = () => {
    const subject = "Join SureBanker and get ₦1,000 bonus!";
    const body = `Hi! I'm using SureBanker for all my banking needs and I think you'd love it too. Sign up with my referral link and we both get ₦1,000 bonus: ${referralData.referralLink}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaSMS = () => {
    const message = `Join SureBanker with my referral code ${referralData.referralCode} and get ₦1,000 bonus! ${referralData.referralLink}`;
    window.open(`sms:?body=${encodeURIComponent(message)}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankBadge = (badge?: string) => {
    switch (badge) {
      case 'crown':
        return <CrownIcon className="w-5 h-5 text-yellow-500" />;
      case 'gold':
        return <TrophyIcon className="w-5 h-5 text-yellow-600" />;
      case 'silver':
        return <MedalIcon className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  // Overview Tab
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <UsersIcon className="w-8 h-8" />
              <div>
                <p className="text-white/80 text-sm">Total Referrals</p>
                <p className="text-2xl font-bold">{referralData.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSignIcon className="w-8 h-8" />
              <div>
                <p className="text-white/80 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold">₦{referralData.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-8 h-8" />
              <div>
                <p className="text-white/80 text-sm">Pending Earnings</p>
                <p className="text-2xl font-bold">₦{referralData.pendingEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrophyIcon className="w-8 h-8" />
              <div>
                <p className="text-white/80 text-sm">Current Rank</p>
                <p className="text-lg font-bold">{referralData.currentRank}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rank Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1E293B]">Rank Progress</h3>
            <Badge className="bg-purple-100 text-purple-800">
              {referralData.currentRank}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Progress to {referralData.nextRank}</span>
              <span className="font-medium">{referralData.referralsToNextRank} more referrals needed</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#5B52FF] h-3 rounded-full" 
                style={{ width: `${(referralData.totalReferrals / (referralData.totalReferrals + referralData.referralsToNextRank)) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-[#64748B]">
              <span>{referralData.totalReferrals} referrals</span>
              <span>{referralData.totalReferrals + referralData.referralsToNextRank} needed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent Referrals</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab('invite')}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              Invite More
            </Button>
          </div>
          
          <div className="space-y-4">
            {myReferrals.slice(0, 3).map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#5B52FF] text-white">
                      {referral.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#1E293B]">{referral.name}</p>
                    <p className="text-sm text-[#64748B]">{referral.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(referral.status)}>
                    {referral.status}
                  </Badge>
                  <p className="text-sm font-medium text-[#1E293B] mt-1">
                    ₦{referral.earnings.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Invite Tab
  const renderInvite = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Invite Friends & Earn</h3>
        <p className="text-[#64748B]">Earn ₦1,000 for each friend who signs up and completes KYC</p>
      </div>

      {/* Referral Code */}
      <Card className="bg-[#F8F9FF] border-[#5B52FF]/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h4 className="font-semibold text-[#1E293B] mb-4">Your Referral Code</h4>
            <div className="bg-white border-2 border-dashed border-[#5B52FF] rounded-lg p-6 mb-4">
              <p className="text-3xl font-bold text-[#5B52FF] tracking-wider">{referralData.referralCode}</p>
            </div>
            <div className="flex justify-center gap-3">
              <Button 
                variant="outline"
                onClick={() => copyToClipboard(referralData.referralCode)}
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
              <Button 
                variant="outline"
                onClick={() => copyToClipboard(referralData.referralLink)}
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite Methods */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'link', name: 'Share Link', icon: <ShareIcon className="w-6 h-6" /> },
          { id: 'email', name: 'Email', icon: <MailIcon className="w-6 h-6" /> },
          { id: 'sms', name: 'SMS', icon: <PhoneIcon className="w-6 h-6" /> },
          { id: 'social', name: 'Social Media', icon: <MessageSquareIcon className="w-6 h-6" /> }
        ].map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all ${
              inviteMethod === method.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
            }`}
            onClick={() => setInviteMethod(method.id as any)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-[#5B52FF] mb-3 flex justify-center">
                {method.icon}
              </div>
              <p className="font-medium text-[#1E293B]">{method.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Form */}
      <Card>
        <CardContent className="p-6">
          {inviteMethod === 'email' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E293B]">Invite via Email</h4>
              <textarea
                placeholder="Enter email addresses (one per line)"
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
              />
              <Button 
                onClick={shareViaEmail}
                className="w-full bg-[#5B52FF] text-white"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                Send Email Invites
              </Button>
            </div>
          )}

          {inviteMethod === 'sms' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E293B]">Invite via SMS</h4>
              <textarea
                placeholder="Enter phone numbers (one per line)"
                value={phoneList}
                onChange={(e) => setPhoneList(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
              />
              <Button 
                onClick={shareViaSMS}
                className="w-full bg-[#5B52FF] text-white"
              >
                <PhoneIcon className="w-4 h-4 mr-2" />
                Send SMS Invites
              </Button>
            </div>
          )}

          {inviteMethod === 'social' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E293B]">Share on Social Media</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                  <FacebookIcon className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="h-12">
                  <TwitterIcon className="w-5 h-5 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" className="h-12">
                  <InstagramIcon className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
                <Button variant="outline" className="h-12">
                  <LinkedinIcon className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          )}

          {inviteMethod === 'link' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E293B]">Share Referral Link</h4>
              <div className="flex gap-2">
                <Input
                  value={referralData.referralLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  onClick={() => copyToClipboard(referralData.referralLink)}
                >
                  <CopyIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={shareViaEmail}
                  variant="outline"
                >
                  <MailIcon className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button 
                  onClick={shareViaSMS}
                  variant="outline"
                >
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  SMS
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Leaderboard Tab
  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Referral Leaderboard</h3>
        <p className="text-[#64748B]">See how you rank against other SureBanker ambassadors</p>
      </div>

      {/* Rank Tiers */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Ambassador Ranks</h4>
          <div className="space-y-3">
            {ranks.map((rank, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${rank.color} rounded`}></div>
                  <span className="font-medium text-[#1E293B]">{rank.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#64748B]">{rank.minReferrals}+ referrals</p>
                  <p className="text-sm font-medium text-[#5B52FF]">₦{rank.bonus.toLocaleString()} bonus</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-6">Top Ambassadors</h4>
          <div className="space-y-4">
            {leaderboard.map((entry) => (
              <div 
                key={entry.rank} 
                className={`flex items-center justify-between p-4 rounded-lg ${
                  entry.name === 'Carchy Atinse' ? 'bg-[#F8F9FF] border-2 border-[#5B52FF]' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      entry.rank === 1 ? 'text-yellow-600' :
                      entry.rank === 2 ? 'text-gray-500' :
                      entry.rank === 3 ? 'text-orange-600' :
                      'text-[#64748B]'
                    }`}>
                      #{entry.rank}
                    </span>
                    {getRankBadge(entry.badge)}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#5B52FF] text-white">
                      {entry.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#1E293B]">{entry.name}</p>
                    <p className="text-sm text-[#64748B]">{entry.referrals} referrals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1E293B]">₦{entry.earnings.toLocaleString()}</p>
                  <p className="text-sm text-[#64748B]">Total earned</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-[#5B52FF] shadow-sm'
              : 'text-[#64748B] hover:text-[#5B52FF]'
          }`}
        >
          <TrophyIcon className="w-4 h-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('invite')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'invite'
              ? 'bg-white text-[#5B52FF] shadow-sm'
              : 'text-[#64748B] hover:text-[#5B52FF]'
          }`}
        >
          <ShareIcon className="w-4 h-4 inline mr-2" />
          Invite Friends
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-white text-[#5B52FF] shadow-sm'
              : 'text-[#64748B] hover:text-[#5B52FF]'
          }`}
        >
          <CrownIcon className="w-4 h-4 inline mr-2" />
          Leaderboard
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'invite' && renderInvite()}
      {activeTab === 'leaderboard' && renderLeaderboard()}
    </div>
  );
};