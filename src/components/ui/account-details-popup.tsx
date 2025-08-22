import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { XIcon, CopyIcon, ShareIcon } from 'lucide-react';

interface AccountDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: {
    status: string;
    accountTier: string;
    walletId: string;
    bankAccountNumber: string;
    bankName: string;
    accountName: string;
  };
}

export const AccountDetailsPopup: React.FC<AccountDetailsPopupProps> = ({
  isOpen,
  onClose,
  accountData
}) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareDetails = () => {
    const details = `
Account Details:
Bank Account Number: ${accountData.bankAccountNumber}
Bank Name: ${accountData.bankName}
Account Name: ${accountData.accountName}
Wallet ID: ${accountData.walletId}
    `.trim();
    
    if (navigator.share) {
      navigator.share({
        title: 'SureBanker Account Details',
        text: details
      });
    } else {
      copyToClipboard(details);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#1E293B]">Account Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XIcon className="w-5 h-5 text-[#64748B]" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Account Information */}
              <div>
                <h3 className="text-sm font-semibold text-[#1E293B] mb-4">Account Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#64748B] font-medium">Status</label>
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {accountData.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#64748B] font-medium">Account Tier</label>
                    <div className="mt-1">
                      <Badge className="bg-[#5B52FF] text-white px-3 py-1 rounded-full">
                        {accountData.accountTier}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#64748B] font-medium">SureBanker Wallet ID "SURETAG"</label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-sm text-[#1E293B] bg-gray-50 px-3 py-2 rounded-lg">
                        {accountData.walletId}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(accountData.walletId)}
                        className="p-2"
                      >
                        <CopyIcon className="w-4 h-4 text-[#64748B]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Account Details */}
              <div>
                <h3 className="text-sm font-semibold text-[#1E293B] mb-4">Account Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#64748B] font-medium">BANK ACCOUNT NUMBER</label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-sm text-[#1E293B]">{accountData.bankAccountNumber}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(accountData.bankAccountNumber)}
                        className="p-1"
                      >
                        <CopyIcon className="w-3 h-3 text-[#64748B]" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#64748B] font-medium">BANK NAME</label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[#1E293B]">{accountData.bankName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(accountData.bankName)}
                        className="p-1"
                      >
                        <CopyIcon className="w-3 h-3 text-[#64748B]" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#64748B] font-medium">ACCOUNT NAME</label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[#1E293B]">{accountData.accountName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(accountData.accountName)}
                        className="p-1"
                      >
                        <CopyIcon className="w-3 h-3 text-[#64748B]" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(`${accountData.bankAccountNumber} - ${accountData.bankName} - ${accountData.accountName}`)}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <CopyIcon className="w-4 h-4" />
                Copy Details
              </Button>
              <Button
                variant="outline"
                onClick={shareDetails}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShareIcon className="w-4 h-4" />
                Share Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};