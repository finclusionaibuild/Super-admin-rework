import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { AlertTriangleIcon, CheckCircleIcon, XIcon } from 'lucide-react';
import { PosNotification } from '../../../../types/pos';

interface PosNotificationsProps {
  notifications: PosNotification[];
  onMarkAsRead: () => void;
  onDismiss: (id: string) => void;
}

export const PosNotifications: React.FC<PosNotificationsProps> = ({
  notifications,
  onMarkAsRead,
  onDismiss
}) => {
  const unreadNotifications = notifications.filter(n => !n.isRead);

  if (notifications.length === 0) return null;

  return (
    <div className="mb-6">
      {unreadNotifications.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-900">POS Notifications</h3>
                <Badge className="bg-orange-100 text-orange-800">
                  {unreadNotifications.length} new
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAsRead}
                className="text-orange-700 hover:text-orange-900"
              >
                Mark all as read
              </Button>
            </div>
            
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.priority === 'high' ? 'bg-red-500' :
                    notification.priority === 'medium' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-[#1E293B]">{notification.title}</h4>
                      <Badge className={`text-xs ${
                        notification.type === 'pos_request' ? 'bg-blue-100 text-blue-800' :
                        notification.type === 'pos_activation' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-[#64748B] mb-2">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#64748B]">{notification.timestamp}</span>
                      {notification.businessName && (
                        <span className="text-xs text-[#64748B]">
                          {notification.businessName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
