import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { UploadIcon, DownloadIcon, CalendarIcon, ClockIcon, FileTextIcon, CheckIcon, XIcon, AlertTriangleIcon, InfoIcon, UsersIcon, DollarSignIcon, RefreshCwIcon, PlayIcon, PauseIcon, HopIcon as StopIcon, EditIcon, TrashIcon, CopyIcon, ShareIcon } from 'lucide-react';

interface BulkTransferProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TransferRecord {
  id: string;
  recipientName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  description: string;
  status: 'pending' | 'validated' | 'error' | 'scheduled' | 'completed';
  error?: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

interface ScheduledTransfer {
  id: string;
  name: string;
  totalRecipients: number;
  totalAmount: number;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  status: 'active' | 'paused' | 'completed';
  created: string;
}

export const BulkScheduleTransfer: React.FC<BulkTransferProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bulk' | 'schedule' | 'templates'>('bulk');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [transferRecords, setTransferRecords] = useState<TransferRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'daily' | 'weekly' | 'monthly'>('once');

  const sampleRecords: TransferRecord[] = [
    {
      id: '1',
      recipientName: 'John Doe',
      accountNumber: '0123456789',
      bankName: 'GTBank',
      amount: 50000,
      description: 'Salary Payment',
      status: 'validated'
    },
    {
      id: '2',
      recipientName: 'Jane Smith',
      accountNumber: '0987654321',
      bankName: 'Access Bank',
      amount: 75000,
      description: 'Contractor Fee',
      status: 'validated'
    },
    {
      id: '3',
      recipientName: 'Invalid Account',
      accountNumber: '0000000000',
      bankName: 'UBA',
      amount: 25000,
      description: 'Service Payment',
      status: 'error',
      error: 'Invalid account number'
    }
  ];

  const scheduledTransfers: ScheduledTransfer[] = [
    {
      id: '1',
      name: 'Monthly Salary Payments',
      totalRecipients: 25,
      totalAmount: 1250000,
      frequency: 'monthly',
      nextRun: '2024-09-01 09:00',
      status: 'active',
      created: '2024-08-01'
    },
    {
      id: '2',
      name: 'Weekly Vendor Payments',
      totalRecipients: 8,
      totalAmount: 400000,
      frequency: 'weekly',
      nextRun: '2024-08-30 14:00',
      status: 'active',
      created: '2024-08-15'
    },
    {
      id: '3',
      name: 'Quarterly Bonuses',
      totalRecipients: 15,
      totalAmount: 750000,
      frequency: 'once',
      nextRun: '2024-12-01 10:00',
      status: 'paused',
      created: '2024-08-20'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setTransferRecords(sampleRecords);
      }, 1000);
    }
  };

  const handleProcessTransfers = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTransferRecords(prev => 
        prev.map(record => 
          record.status === 'validated' 
            ? { ...record, status: 'completed' as const }
            : record
        )
      );
    }, 3000);
  };

  const handleScheduleTransfers = () => {
    if (scheduleDate && scheduleTime) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setTransferRecords(prev => 
          prev.map(record => 
            record.status === 'validated' 
              ? { 
                  ...record, 
                  status: 'scheduled' as const,
                  scheduledDate: scheduleDate,
                  scheduledTime: scheduleTime
                }
              : record
          )
        );
      }, 2000);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "Recipient Name,Account Number,Bank Name,Amount,Description\nJohn Doe,0123456789,GTBank,50000,Salary Payment\nJane Smith,0987654321,Access Bank,75000,Contractor Fee";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_transfer_template.csv';
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'once': return 'bg-blue-100 text-blue-800';
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-yellow-100 text-yellow-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Bulk Transfer Tab
  const renderBulkTransfer = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Bulk Transfer</h3>
        <p className="text-[#64748B]">Upload a CSV file to process multiple transfers</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#5B52FF] transition-colors">
              <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-[#1E293B] mb-2">Upload CSV File</h4>
              <p className="text-[#64748B] mb-4">
                Select a CSV file containing recipient details for bulk transfer
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button className="bg-[#5B52FF] text-white cursor-pointer">
                  Choose File
                </Button>
              </label>
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {uploadedFile.name} uploaded successfully
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Download */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Need a template?</h4>
                <p className="text-sm text-blue-700">Download our CSV template to get started</p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={downloadTemplate}
              className="border-blue-300 text-blue-700"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Records */}
      {transferRecords.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-[#1E293B]">Transfer Records</h4>
              <div className="flex gap-3">
                <Button
                  onClick={handleProcessTransfers}
                  disabled={isProcessing || transferRecords.filter(r => r.status === 'validated').length === 0}
                  className="bg-[#5B52FF] text-white"
                >
                  {isProcessing ? 'Processing...' : 'Process Now'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('schedule')}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RECIPIENT</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACCOUNT</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BANK</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {transferRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                        {record.recipientName}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#64748B]">{record.accountNumber}</td>
                      <td className="py-3 px-4 text-sm text-[#64748B]">{record.bankName}</td>
                      <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                        ₦{record.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        {record.error && (
                          <p className="text-xs text-red-600 mt-1">{record.error}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Schedule Transfer Tab
  const renderScheduleTransfer = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Schedule Transfers</h3>
        <p className="text-[#64748B]">Set up recurring or future-dated transfers</p>
      </div>

      {/* Schedule Settings */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Schedule Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Schedule Date
              </label>
              <Input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="h-12"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Schedule Time
              </label>
              <Input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              Frequency
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'once', name: 'One Time' },
                { id: 'daily', name: 'Daily' },
                { id: 'weekly', name: 'Weekly' },
                { id: 'monthly', name: 'Monthly' }
              ].map((freq) => (
                <Card 
                  key={freq.id}
                  className={`cursor-pointer transition-all ${
                    frequency === freq.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                  }`}
                  onClick={() => setFrequency(freq.id as any)}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-medium text-[#1E293B]">{freq.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleScheduleTransfers}
            disabled={!scheduleDate || !scheduleTime || isProcessing}
            className="w-full mt-6 bg-[#5B52FF] text-white h-12"
          >
            {isProcessing ? 'Scheduling...' : 'Schedule Transfers'}
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Transfers List */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-[#1E293B]">Scheduled Transfers</h4>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              New Schedule
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledTransfers.map((transfer) => (
              <Card key={transfer.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F8F9FF] rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-[#5B52FF]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#1E293B]">{transfer.name}</h5>
                        <p className="text-sm text-[#64748B]">
                          {transfer.totalRecipients} recipients • ₦{transfer.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-[#64748B]">Next run: {transfer.nextRun}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getFrequencyColor(transfer.frequency)}>
                        {transfer.frequency}
                      </Badge>
                      <Badge className={
                        transfer.status === 'active' ? 'bg-green-100 text-green-800' :
                        transfer.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {transfer.status}
                      </Badge>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="p-2">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          {transfer.status === 'active' ? (
                            <PauseIcon className="w-4 h-4" />
                          ) : (
                            <PlayIcon className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1E293B]">Bulk & Scheduled Transfers</h2>
            <Button variant="ghost" onClick={onClose}>
              <XIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {[
              { id: 'bulk', name: 'Bulk Transfer', icon: <UsersIcon className="w-4 h-4" /> },
              { id: 'schedule', name: 'Schedule Transfer', icon: <CalendarIcon className="w-4 h-4" /> },
              { id: 'templates', name: 'Templates', icon: <FileTextIcon className="w-4 h-4" /> }
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
          {activeTab === 'bulk' && renderBulkTransfer()}
          {activeTab === 'schedule' && renderScheduleTransfer()}
        </div>
      </div>
    </div>
  );
};