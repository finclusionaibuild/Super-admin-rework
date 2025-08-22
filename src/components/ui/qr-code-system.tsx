import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import {
  QrCodeIcon,
  ScanIcon,
  CopyIcon,
  ShareIcon,
  DownloadIcon,
  CameraIcon,
  RefreshCwIcon,
  CheckIcon,
  XIcon,
  WalletIcon,
  ArrowRightIcon,
  UserIcon,
  DollarSignIcon
} from 'lucide-react';

interface QRCodeSystemProps {
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  onTransferComplete?: (data: any) => void;
}

export const QRCodeSystem: React.FC<QRCodeSystemProps> = ({
  accountNumber = "1234567890",
  accountName = "Carchy Atinse", 
  bankName = "SureBanker",
  onTransferComplete
}) => {
  const [activeTab, setActiveTab] = useState<'receive' | 'send'>('receive');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const generateQRData = () => {
    return {
      type: 'surebanker_transfer',
      accountNumber,
      accountName,
      bankName,
      amount: amount || '0',
      description: description || '',
      timestamp: Date.now()
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQRCode = () => {
    // Implementation for downloading QR code as image
    console.log('Downloading QR code...');
  };

  const shareQRCode = () => {
    // Implementation for sharing QR code
    console.log('Sharing QR code...');
  };

  const startScanning = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleScanResult = (data: any) => {
    setScannedData(data);
    stopScanning();
    if (onTransferComplete) {
      onTransferComplete(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('receive')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'receive'
              ? 'bg-white text-[#5B52FF] shadow-sm'
              : 'text-[#64748B] hover:text-[#5B52FF]'
          }`}
        >
          <QrCodeIcon className="w-4 h-4 inline mr-2" />
          Receive Money
        </button>
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'send'
              ? 'bg-white text-[#5B52FF] shadow-sm'
              : 'text-[#64748B] hover:text-[#5B52FF]'
          }`}
        >
          <ScanIcon className="w-4 h-4 inline mr-2" />
          Send Money
        </button>
      </div>

      {/* Receive Money Tab */}
      {activeTab === 'receive' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Receive Money via QR Code</h3>
            <p className="text-[#64748B]">Share your QR code to receive payments instantly</p>
          </div>

          {/* Account Info */}
          <Card className="bg-[#F8F9FF] border-[#5B52FF]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5B52FF] rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E293B]">{accountName}</p>
                  <p className="text-sm text-[#64748B]">{bankName}</p>
                  <p className="text-sm text-[#64748B]">Account: {accountNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount and Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Amount (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">₦</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-12"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Description (Optional)
              </label>
              <Input
                placeholder="What's this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* QR Code Display */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCodeIcon className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              
              <p className="text-sm text-[#64748B] mb-6">
                Scan this QR code with any banking app to send money
              </p>

              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline"
                  onClick={() => copyToClipboard(JSON.stringify(generateQRData()))}
                  className="flex items-center gap-2"
                >
                  <CopyIcon className="w-4 h-4" />
                  Copy
                </Button>
                <Button 
                  variant="outline"
                  onClick={shareQRCode}
                  className="flex items-center gap-2"
                >
                  <ShareIcon className="w-4 h-4" />
                  Share
                </Button>
                <Button 
                  variant="outline"
                  onClick={downloadQRCode}
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Send Money Tab */}
      {activeTab === 'send' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Send Money via QR Code</h3>
            <p className="text-[#64748B]">Scan a QR code to send money instantly</p>
          </div>

          {!isScanning && !scannedData && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 bg-[#F8F9FF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ScanIcon className="w-16 h-16 text-[#5B52FF]" />
                </div>
                <h4 className="text-lg font-semibold text-[#1E293B] mb-2">Scan QR Code</h4>
                <p className="text-[#64748B] mb-6">
                  Point your camera at a SureBanker QR code to send money
                </p>
                <Button 
                  onClick={startScanning}
                  className="bg-[#5B52FF] text-white px-8 py-3"
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </CardContent>
            </Card>
          )}

          {isScanning && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-[#1E293B] mb-2">Scanning QR Code</h4>
                  <p className="text-[#64748B]">Position the QR code within the frame</p>
                </div>
                
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 bg-black rounded-lg"
                  />
                  <div className="absolute inset-0 border-4 border-[#5B52FF] rounded-lg pointer-events-none">
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-[#5B52FF]"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-[#5B52FF]"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-[#5B52FF]"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#5B52FF]"></div>
                  </div>
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  <Button 
                    variant="outline"
                    onClick={stopScanning}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleScanResult({
                      accountName: "John Doe",
                      accountNumber: "0123456789",
                      bankName: "SureBanker",
                      amount: "5000"
                    })}
                    className="bg-[#5B52FF] text-white"
                  >
                    Simulate Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {scannedData && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-900">QR Code Scanned Successfully</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Recipient</span>
                    <span className="font-medium text-[#1E293B]">{scannedData.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Bank</span>
                    <span className="font-medium text-[#1E293B]">{scannedData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Account</span>
                    <span className="font-medium text-[#1E293B]">{scannedData.accountNumber}</span>
                  </div>
                  {scannedData.amount && scannedData.amount !== '0' && (
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Amount</span>
                      <span className="font-bold text-[#5B52FF]">₦{Number(scannedData.amount).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setScannedData(null)}
                    className="flex-1"
                  >
                    Scan Again
                  </Button>
                  <Button 
                    className="flex-1 bg-[#5B52FF] text-white"
                  >
                    <ArrowRightIcon className="w-4 h-4 mr-2" />
                    Continue Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};