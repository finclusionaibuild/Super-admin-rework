import React, { useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon, 
  InboxIcon, 
  MailIcon, 
  MessageSquareIcon, 
  AlertCircleIcon, 
  CheckCircleIcon, 
  InfoIcon, 
  GiftIcon, 
  CreditCardIcon, 
  TrendingUpIcon, 
  ShieldIcon, 
  StarIcon, 
  FilterIcon, 
  MoreHorizontalIcon, 
  TrashIcon, 
  ArchiveIcon, 
  BookMarkedIcon as MarkAsUnreadIcon,
  XIcon
} from "lucide-react";

interface Message {
  id: string;
  type: 'notification' | 'promotion' | 'transaction' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  color: string;
}

interface InboxProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Inbox: React.FC<InboxProps> = ({ isVisible, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // If not visible, don't render anything
  if (!isVisible) return null;

  const messages: Message[] = [
    {
      id: "1",
      type: "transaction",
      title: "Transaction Successful",
      message: "Your transfer of ₦50,000 to John Doe has been completed successfully. The transaction was processed instantly and the recipient has been notified. Your new account balance is ₦120,000. Thank you for using SureBanker for your financial needs.",
      timestamp: "2 minutes ago",
      isRead: false,
      priority: "medium",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      id: "2",
      type: "security",
      title: "Security Alert",
      message: "New device login detected from Lagos, Nigeria. If this wasn't you, please secure your account immediately by changing your password and enabling two-factor authentication. Your security is our top priority.",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "high",
      icon: <ShieldIcon className="w-5 h-5" />,
      color: "text-red-600"
    },
    {
      id: "3",
      type: "promotion",
      title: "Cashback Reward Available",
      message: "You've earned ₦500 cashback on your recent transactions. Claim your reward now! This offer is valid for the next 7 days. Continue using SureBanker for all your transactions to earn more rewards.",
      timestamp: "3 hours ago",
      isRead: true,
      priority: "low",
      icon: <GiftIcon className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      id: "4",
      type: "notification",
      title: "KYC Verification Required",
      message: "Complete your Tier 2 KYC verification to unlock higher transaction limits and exclusive features. This will allow you to perform transactions up to ₦1,000,000 daily and access premium services.",
      timestamp: "1 day ago",
      isRead: false,
      priority: "medium",
      icon: <AlertCircleIcon className="w-5 h-5" />,
      color: "text-orange-600"
    },
    {
      id: "5",
      type: "transaction",
      title: "Card Payment Declined",
      message: "Your card payment of ₦25,000 at Amazon was declined due to insufficient funds. Please ensure you have enough balance before attempting the transaction again or use an alternative payment method.",
      timestamp: "2 days ago",
      isRead: true,
      priority: "medium",
      icon: <CreditCardIcon className="w-5 h-5" />,
      color: "text-red-600"
    },
    {
      id: "6",
      type: "system",
      title: "App Update Available",
      message: "A new version of SureBanker is available with improved security and new features. Update your app to enjoy the latest enhancements and ensure your account remains secure with the latest security patches.",
      timestamp: "3 days ago",
      isRead: true,
      priority: "low",
      icon: <InfoIcon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "7",
      type: "promotion",
      title: "Refer & Earn Bonus",
      message: "Invite friends to SureBanker and earn ₦1,000 for each successful referral! Your friends will also receive ₦500 when they sign up using your referral code. It's a win-win situation for everyone.",
      timestamp: "1 week ago",
      isRead: true,
      priority: "low",
      icon: <TrendingUpIcon className="w-5 h-5" />,
      color: "text-green-600"
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesFilter = selectedFilter === "all" || message.type === selectedFilter;
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleMarkAsRead = (messageId: string) => {
    // Implementation for marking message as read
    console.log("Mark as read:", messageId);
  };

  const handleDeleteMessage = (messageId: string) => {
    // Implementation for deleting message
    console.log("Delete message:", messageId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-orange-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transaction": return "bg-blue-100 text-blue-800";
      case "security": return "bg-red-100 text-red-800";
      case "promotion": return "bg-purple-100 text-purple-800";
      case "notification": return "bg-orange-100 text-orange-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white">
              <InboxIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E293B]">Inbox</h2>
              <p className="text-sm text-[#64748B]">{unreadCount} unread messages</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <XIcon className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Message List */}
          <div className={`w-full ${selectedMessage ? 'hidden md:block md:w-1/3' : 'w-full'} border-r border-gray-200 overflow-y-auto`}>
            {/* Filters and Search */}
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button 
                  variant={selectedFilter === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                  className={selectedFilter === "all" ? "bg-[#5B52FF] text-white" : "bg-white"}
                >
                  All
                </Button>
                <Button 
                  variant={selectedFilter === "transaction" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedFilter("transaction")}
                  className={selectedFilter === "transaction" ? "bg-[#5B52FF] text-white" : "bg-white"}
                >
                  Transactions
                </Button>
                <Button 
                  variant={selectedFilter === "security" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedFilter("security")}
                  className={selectedFilter === "security" ? "bg-[#5B52FF] text-white" : "bg-white"}
                >
                  Security
                </Button>
                <Button 
                  variant={selectedFilter === "promotion" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedFilter("promotion")}
                  className={selectedFilter === "promotion" ? "bg-[#5B52FF] text-white" : "bg-white"}
                >
                  Promos
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="divide-y divide-gray-100">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    !message.isRead ? 'bg-blue-50' : ''
                  } ${selectedMessage?.id === message.id ? 'bg-[#F8F9FF] border-l-4 border-l-[#5B52FF]' : ''}`}
                  onClick={() => handleMessageSelect(message)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'transaction' ? 'bg-blue-100' :
                      message.type === 'security' ? 'bg-red-100' :
                      message.type === 'promotion' ? 'bg-purple-100' :
                      message.type === 'notification' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      <div className={message.color}>
                        {message.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-[#1E293B] ${!message.isRead ? 'font-bold' : ''}`}>
                          {message.title}
                        </h3>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-[#64748B] text-sm mb-2 line-clamp-2 ${!message.isRead ? 'font-medium' : ''}`}>
                        {message.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#64748B]">{message.timestamp}</p>
                        <Badge className={`text-xs ${getTypeColor(message.type)}`}>
                          {message.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <InboxIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No messages found</h3>
                  <p className="text-[#64748B]">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          {selectedMessage && (
            <div className={`${selectedMessage ? 'block w-full md:w-2/3' : 'hidden'} overflow-y-auto bg-white`}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    <ArrowLeftIcon className="w-5 h-5 text-[#64748B]" />
                  </button>
                  <h3 className="font-bold text-[#1E293B]">{selectedMessage.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <MarkAsUnreadIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMessage.type === 'transaction' ? 'bg-blue-100' :
                    selectedMessage.type === 'security' ? 'bg-red-100' :
                    selectedMessage.type === 'promotion' ? 'bg-purple-100' :
                    selectedMessage.type === 'notification' ? 'bg-orange-100' :
                    'bg-gray-100'
                  }`}>
                    <div className={selectedMessage.color}>
                      {selectedMessage.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E293B] text-lg">{selectedMessage.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getTypeColor(selectedMessage.type)}`}>
                        {selectedMessage.type}
                      </Badge>
                      <span className="text-sm text-[#64748B]">{selectedMessage.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-[#1E293B] leading-relaxed whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.type === 'transaction' && (
                  <Card className="mt-6 bg-blue-50 border-blue-200 card-no-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Transaction Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Transaction ID</span>
                          <span className="font-medium text-blue-900">#TXN123456789</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Date & Time</span>
                          <span className="font-medium text-blue-900">Aug 30, 2024 14:25:36</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Status</span>
                          <span className="font-medium text-green-600">Successful</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedMessage.type === 'security' && (
                  <Card className="mt-6 bg-red-50 border-red-200 card-no-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Security Recommendations</h4>
                      <ul className="space-y-2 text-sm list-disc pl-4">
                        <li className="text-red-700">Change your password immediately</li>
                        <li className="text-red-700">Enable two-factor authentication</li>
                        <li className="text-red-700">Review recent account activity</li>
                        <li className="text-red-700">Contact support if you suspect fraud</li>
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {selectedMessage.type === 'promotion' && (
                  <Card className="mt-6 bg-purple-50 border-purple-200 card-no-shadow">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">Claim Your Reward</h4>
                        <p className="text-sm text-purple-700">Limited time offer - expires in 7 days</p>
                      </div>
                      <Button className="bg-purple-600 text-white hover:bg-purple-700">
                        Claim Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};