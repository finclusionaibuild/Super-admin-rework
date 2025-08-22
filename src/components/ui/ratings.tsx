import React, { useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { 
  StarIcon, 
  ThumbsUpIcon, 
  ThumbsDownIcon, 
  MessageSquareIcon, 
  CheckCircleIcon, 
  XIcon,
  TrendingUpIcon,
  AwardIcon,
  UsersIcon
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

interface RatingsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Ratings: React.FC<RatingsProps> = ({ isVisible, onClose }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // If not visible, don't render anything
  if (!isVisible) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white">
                <StarIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Rate SureBanker</h2>
                <p className="text-sm text-[#64748B]">Share your experience with us</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <XIcon className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* App Rating Overview */}
          <Card className="mb-8 bg-white card-no-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-[#5B52FF]">{appRating}</div>
                  <div>
                    {renderStars(appRating, false, "w-7 h-7")}
                    <p className="text-[#64748B] mt-2">{totalReviews.toLocaleString()} reviews</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#1E293B] mb-2">Loved by thousands of users</h2>
                <p className="text-[#64748B]">Join the community and share your experience</p>
              </div>

              {/* Rating Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-4">Rate Your Experience</h3>
                  <p className="text-[#64748B] mb-6">How would you rate SureBanker?</p>
                  
                  <div className="flex justify-center mb-6">
                    {renderStars(userRating, true, "w-10 h-10")}
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
              <CardContent className="p-6 text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Thank You!</h3>
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
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#1E293B] mb-4">Recent Reviews</h3>
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
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
      </div>
    </div>
  );
};