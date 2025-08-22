import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  SendIcon,
  HeartIcon,
  SmileIcon,
  TrendingUpIcon,
  AwardIcon,
  UsersIcon,
  CheckCircleIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  ChevronDownIcon,
  UserIcon
} from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  avatar: string;
  verified: boolean;
}

export const Ratings = (): JSX.Element => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const appRating = 4.8;
  const totalReviews = 12847;
  const ratingDistribution = [
    { stars: 5, count: 8934, percentage: 69.5 },
    { stars: 4, count: 2567, percentage: 20.0 },
    { stars: 3, count: 892, percentage: 6.9 },
    { stars: 2, count: 267, percentage: 2.1 },
    { stars: 1, count: 187, percentage: 1.5 }
  ];

  const recentReviews: Review[] = [
    {
      id: "1",
      userName: "John Doe",
      rating: 5,
      comment: "Excellent app! The interface is clean and transactions are super fast. Love the savings features.",
      timestamp: "2 days ago",
      avatar: "JD",
      verified: true
    },
    {
      id: "2",
      userName: "Sarah Wilson",
      rating: 5,
      comment: "Best banking app I've used. The customer support is amazing and the security features give me peace of mind.",
      timestamp: "1 week ago",
      avatar: "SW",
      verified: true
    },
    {
      id: "3",
      userName: "Mike Johnson",
      rating: 4,
      comment: "Great app overall. Would love to see more investment options in future updates.",
      timestamp: "2 weeks ago",
      avatar: "MJ",
      verified: false
    },
    {
      id: "4",
      userName: "Emma Davis",
      rating: 5,
      comment: "The bill payment feature is a game changer. I can pay all my bills in one place. Highly recommended!",
      timestamp: "3 weeks ago",
      avatar: "ED",
      verified: true
    },
    {
      id: "5",
      userName: "David Brown",
      rating: 4,
      comment: "Solid banking app with good features. The transfer process is smooth and reliable.",
      timestamp: "1 month ago",
      avatar: "DB",
      verified: true
    }
  ];

  // Navigation items
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <HomeIcon className="w-5 h-5" />, 
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
      onClick: () => navigate("/inbox")
    },
    { 
      name: "Rate Us", 
      icon: <StarIcon className="w-5 h-5" />,
      active: true,
      onClick: () => navigate("/ratings")
    },
  ];

  // Mobile Navigation Items
  const mobileNavItems = [
    { 
      name: "Home", 
      icon: <HomeIcon className="w-6 h-6" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Rate", 
      icon: <StarIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/ratings")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-6 h-6" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "Profile", 
      icon: <UserIcon className="w-6 h-6" />,
      onClick: () => navigate("/profile")
    },
  ];

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      setHasSubmitted(true);
      // Here you would typically send the rating to your backend
      console.log("Rating submitted:", { rating: userRating, comment: userComment });
    }
  };

  const renderStars = (rating: number, interactive = false, size = "w-6 h-6") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoverRating || userRating) : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={interactive ? () => setUserRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 p-4 overflow-hidden">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                    <StarIcon className="w-6 h-6 text-[#5B52FF]" />
                    Rate SureBanker
                  </h1>
                  <p className="text-sm text-[#64748B]">Share your experience with us</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="p-2"
                   onClick={() => navigate("/notifications")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Carchy Atinse</div>
                  </div>
                  <Avatar className="w-8 h-8" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>
                    <AvatarFallback className="bg-[#5B52FF] text-white">CA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* App Rating Overview */}
              <Card className="mb-8 bg-white card-no-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-6xl font-bold text-[#5B52FF]">{appRating}</div>
                      <div>
                        {renderStars(appRating, false, "w-8 h-8")}
                        <p className="text-[#64748B] mt-2">{totalReviews.toLocaleString()} reviews</p>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Loved by thousands of users</h2>
                    <p className="text-[#64748B]">Join the community and share your experience</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Rating Distribution</h3>
                      <div className="space-y-3">
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-12">
                              <span className="text-sm font-medium">{item.stars}</span>
                              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-[#64748B] w-16">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">App Highlights</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUpIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Fast Transactions</p>
                            <p className="text-sm text-[#64748B]">Lightning-fast money transfers</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <AwardIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Award Winning</p>
                            <p className="text-sm text-[#64748B]">Best fintech app 2024</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Trusted by Millions</p>
                            <p className="text-sm text-[#64748B]">Over 2M active users</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Rating Section */}
              {!hasSubmitted ? (
                <Card className="mb-8 bg-white card-no-shadow">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#1E293B] mb-4">Rate Your Experience</h3>
                      <p className="text-[#64748B] mb-8">How would you rate SureBanker?</p>
                      
                      <div className="flex justify-center mb-8">
                        {renderStars(userRating, true, "w-12 h-12")}
                      </div>

                      {userRating > 0 && (
                        <div className="max-w-md mx-auto mb-6">
                          <textarea
                            placeholder="Tell us about your experience (optional)"
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg resize-none h-24 bg-white"
                          />
                        </div>
                      )}

                      <Button 
                        onClick={handleRatingSubmit}
                        disabled={userRating === 0}
                        className="bg-[#5B52FF] text-white px-8 py-3 btn-primary"
                      >
                        Submit Rating
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-8 bg-green-50 border-green-200 card-no-shadow">
                  <CardContent className="p-8 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                    <p className="text-green-700 mb-4">Your rating has been submitted successfully.</p>
                    <Button 
                      onClick={() => setHasSubmitted(false)}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Rate Again
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Recent Reviews */}
              <Card className="bg-white card-no-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-6">Recent Reviews</h3>
                  <div className="space-y-6">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#5B52FF] text-white">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-[#1E293B]">{review.userName}</h4>
                              {review.verified && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  Verified
                                </Badge>
                              )}
                              <span className="text-sm text-[#64748B]">• {review.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {renderStars(review.rating, false, "w-4 h-4")}
                            </div>
                            <p className="text-[#64748B] leading-relaxed">{review.comment}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#5B52FF]">
                                <ThumbsUpIcon className="w-4 h-4 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#5B52FF]">
                                <MessageSquareIcon className="w-4 h-4 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-white">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Rate Us</h1>
              <p className="text-xs text-[#64748B]">Share your experience</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {/* App Rating Overview */}
          <Card className="mb-6 bg-white card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#5B52FF] mb-2">{appRating}</div>
              {renderStars(appRating, false, "w-6 h-6")}
              <p className="text-[#64748B] mt-2">{totalReviews.toLocaleString()} reviews</p>
            </CardContent>
          </Card>

          {/* User Rating */}
          {!hasSubmitted ? (
            <Card className="mb-6 bg-white card-no-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Rate Your Experience</h3>
                <div className="flex justify-center mb-6">
                  {renderStars(userRating, true, "w-10 h-10")}
                </div>
                {userRating > 0 && (
                  <div className="mb-6">
                    <textarea
                      placeholder="Tell us about your experience"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg resize-none h-20 bg-white"
                    />
                  </div>
                )}
                <Button 
                  onClick={handleRatingSubmit}
                  disabled={userRating === 0}
                  className="w-full bg-[#5B52FF] text-white btn-primary"
                >
                  Submit Rating
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 bg-green-50 border-green-200 card-no-shadow">
              <CardContent className="p-6 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700 text-sm">Your rating has been submitted.</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B]">Recent Reviews</h3>
            {recentReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="bg-white card-no-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#5B52FF] text-white text-sm">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#1E293B] text-sm">{review.userName}</h4>
                        {review.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating, false, "w-3 h-3")}
                        <span className="text-xs text-[#64748B]">{review.timestamp}</span>
                      </div>
                      <p className="text-[#64748B] text-sm">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
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
    </div>
  );
};