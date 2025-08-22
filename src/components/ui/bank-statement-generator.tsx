import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { 
  XIcon, 
  DownloadIcon, 
  CalendarIcon, 
  FileTextIcon, 
  CheckIcon,
  ClockIcon,
  AlertCircleIcon,
  InfoIcon
} from 'lucide-react';

interface BankStatementGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  accountType: 'individual' | 'business';
  accountData: any;
}

export const BankStatementGenerator: React.FC<BankStatementGeneratorProps> = ({
  isOpen,
  onClose,
  accountType,
  accountData
}) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [format, setFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setTimeout(() => {
        setIsGenerated(false);
        onClose();
      }, 2000);
    }, 3000);
  };

  const quickDateRanges = [
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 3 Months', days: 90 },
    { label: 'Last 6 Months', days: 180 },
    { label: 'Last Year', days: 365 }
  ];

  const setQuickDate = (days: number) => {
    const today = new Date();
    const fromDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
    setDateFrom(fromDate.toISOString().split('T')[0]);
    setDateTo(today.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1E293B]">Generate Bank Statement</h2>
              <p className="text-sm text-[#64748B]">
                {accountType === 'business' ? 'Business Account' : 'Individual Account'} Statement
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XIcon className="w-4 h-4" />
            </Button>
          </div>

          {isGenerating ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#5B52FF] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Generating Statement</h3>
              <p className="text-[#64748B]">Please wait while we prepare your bank statement...</p>
            </div>
          ) : isGenerated ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Statement Generated!</h3>
              <p className="text-[#64748B]">Your bank statement has been downloaded successfully.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Account Info */}
              <Card className="bg-[#F8F9FF] border-[#5B52FF]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                      <FileTextIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E293B]">
                        {accountData?.name || (accountType === 'business' ? 'Business Account' : 'Individual Account')}
                      </h3>
                      <p className="text-sm text-[#64748B]">
                        {accountType === 'business' ? 'Business Banking Statement' : 'Personal Banking Statement'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Date Ranges */}
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-3">Quick Date Ranges</label>
                <div className="grid grid-cols-2 gap-3">
                  {quickDateRanges.map((range) => (
                    <Button
                      key={range.days}
                      variant="outline"
                      onClick={() => setQuickDate(range.days)}
                      className="h-12"
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">From Date</label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">To Date</label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-3">Statement Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'pdf', label: 'PDF', description: 'Printable format' },
                    { value: 'excel', label: 'Excel', description: 'Spreadsheet format' },
                    { value: 'csv', label: 'CSV', description: 'Data format' }
                  ].map((formatOption) => (
                    <Card 
                      key={formatOption.value}
                      className={`cursor-pointer transition-all ${
                        format === formatOption.value ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormat(formatOption.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="font-medium text-[#1E293B] mb-1">{formatOption.label}</div>
                        <div className="text-xs text-[#64748B]">{formatOption.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Statement Options */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Statement Information</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Includes all transactions within selected date range</li>
                        <li>• Shows opening and closing balances</li>
                        <li>• Contains transaction details and descriptions</li>
                        <li>• Suitable for official and regulatory purposes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!dateFrom || !dateTo}
                  className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA]"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Generate Statement
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};