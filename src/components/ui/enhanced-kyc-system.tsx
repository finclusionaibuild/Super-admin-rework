import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import confetti from 'canvas-confetti';
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  CameraIcon,
  UploadIcon,
  MapPinIcon,
  FileTextIcon,
  UserIcon,
  IdCardIcon,
  CreditCardIcon,
  HomeIcon,
  UsersIcon,
  SparklesIcon,
  LoaderIcon,
  InfoIcon,
  EyeIcon,
  LockIcon,
  DatabaseIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
  RefreshCwIcon,
  ScanIcon
} from 'lucide-react';

interface KYCProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onUpgrade: (tier: number) => void;
}

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  required: boolean;
}

export const EnhancedKYCSystem: React.FC<KYCProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bvnInput, setBvnInput] = useState('');
  const [ninInput, setNinInput] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [attesters, setAttesters] = useState([{ email: '' }, { email: '' }]);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([]);

  const kycTiers = [
    {
      tier: 1,
      title: "Tier 1 - BVN Verification",
      limit: "₦50,000 daily",
      requirements: ["Bank Verification Number (BVN)", "Liveness Photo"],
      description: "Basic verification for essential banking features",
      features: ["Send & Receive Money", "Bill Payments", "Basic Wallet Features"]
    },
    {
      tier: 2,
      title: "Tier 2 - NIN Verification", 
      limit: "₦1,000,000 daily",
      requirements: ["National Identification Number (NIN)", "Enhanced Profile"],
      description: "Enhanced verification for higher transaction limits",
      features: ["Higher Transaction Limits", "Card Requests", "Savings Products"]
    },
    {
      tier: 3,
      title: "Tier 3 - Document Verification",
      limit: "₦5,000,000 daily", 
      requirements: ["Utility Bill", "Government ID", "Address Verification"],
      description: "Premium verification for maximum features",
      features: ["Maximum Limits", "Investment Products", "Business Features", "Premium Support"]
    }
  ];

  const documentTypes = [
    { id: 'utility', name: 'Utility Bill', description: 'Electricity, Water, or Gas bill' },
    { id: 'drivers', name: "Driver's License", description: 'Valid Nigerian driver\'s license' },
    { id: 'passport', name: 'International Passport', description: 'Nigerian international passport' },
    { id: 'others', name: 'Other Documents', description: 'Other government-issued ID' }
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleBVNVerification = async () => {
    if (bvnInput.length !== 11) return;
    
    setIsProcessing(true);
    setVerificationSteps([
      { id: '1', title: 'Connecting to ID Certify', description: 'Establishing secure connection', status: 'in-progress', required: true },
      { id: '2', title: 'BVN Database Lookup', description: 'Verifying with CBN database', status: 'pending', required: true },
      { id: '3', title: 'Identity Verification', description: 'Matching personal details', status: 'pending', required: true }
    ]);

    // Simulate verification process
    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '1' ? { ...step, status: 'completed' } : step
      ));
    }, 1000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'in-progress' } : step
      ));
    }, 2000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'completed' } : 
        step.id === '3' ? { ...step, status: 'in-progress' } : step
      ));
    }, 3000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '3' ? { ...step, status: 'completed' } : step
      ));
      setIsProcessing(false);
      setCurrentStep(currentStep + 1);
      triggerConfetti();
    }, 4000);
  };

  const handleNINVerification = async () => {
    if (ninInput.length !== 11) return;
    
    setIsProcessing(true);
    setVerificationSteps([
      { id: '1', title: 'Connecting to ID Certify', description: 'Establishing secure connection', status: 'in-progress', required: true },
      { id: '2', title: 'NIN Database Lookup', description: 'Verifying with NIMC database', status: 'pending', required: true },
      { id: '3', title: 'Identity Verification', description: 'Matching personal details', status: 'pending', required: true }
    ]);

    // Simulate verification process
    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '1' ? { ...step, status: 'completed' } : step
      ));
    }, 1000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'in-progress' } : step
      ));
    }, 2000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '2' ? { ...step, status: 'completed' } : 
        step.id === '3' ? { ...step, status: 'in-progress' } : step
      ));
    }, 3000);

    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === '3' ? { ...step, status: 'completed' } : step
      ));
      setIsProcessing(false);
      setCurrentStep(currentStep + 1);
      triggerConfetti();
    }, 4000);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate OCR processing
      setTimeout(() => {
        setAddressOptions([
          "123 Lagos Street, Victoria Island, Lagos State",
          "124 Lagos Street, Victoria Island, Lagos State", 
          "125 Lagos Street, Victoria Island, Lagos State"
        ]);
      }, 2000);
    }
  };

  const handleAddressVerification = () => {
    if (selectedAddress && currentLocation) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(currentStep + 1);
        triggerConfetti();
      }, 3000);
    }
  };

  const renderTierSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">KYC Verification</h2>
        <p className="text-[#64748B]">Powered by ID Certify - Secure Identity Verification</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <img src="/Logo Main Trans.png" alt="SureBanker" className="h-6" />
          <ArrowRightIcon className="w-4 h-4 text-[#64748B]" />
          <div className="text-sm font-medium text-[#5B52FF]">ID Certify</div>
        </div>
      </div>

      <div className="space-y-4">
        {kycTiers.map((tier) => (
          <Card 
            key={tier.tier}
            className={`cursor-pointer transition-all ${
              selectedTier === tier.tier ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
            } ${currentTier >= tier.tier ? 'border-green-200 bg-green-50' : ''}`}
            onClick={() => setSelectedTier(tier.tier)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-[#1E293B]">{tier.title}</h3>
                    {currentTier >= tier.tier && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] mb-3">{tier.description}</p>
                  <p className="font-medium text-[#5B52FF] mb-3">Daily Limit: {tier.limit}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1E293B]">Requirements:</p>
                    {tier.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#5B52FF] rounded-full flex items-center justify-center">
                          <CheckIcon className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-sm text-[#64748B]">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedTier === tier.tier 
                    ? 'border-[#5B52FF] bg-[#5B52FF]' 
                    : 'border-gray-300'
                }`}>
                  {selectedTier === tier.tier && (
                    <CheckIcon className="w-3 h-3 text-white m-0.5" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        onClick={() => setCurrentStep(selectedTier === 1 ? 2 : selectedTier === 2 ? 5 : 8)}
        disabled={currentTier >= selectedTier}
        className="w-full h-12 bg-[#5B52FF] text-white"
      >
        {currentTier >= selectedTier ? 'Already Completed' : `Start Tier ${selectedTier} Verification`}
      </Button>
    </div>
  );

  const renderBVNVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">BVN Verification</h2>
        <p className="text-[#64748B]">Verify your Bank Verification Number</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">What to Expect</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your BVN will be verified with CBN database</li>
                <li>• We'll take a liveness photo for security</li>
                <li>• Your data is encrypted and secure</li>
                <li>• Verification takes 2-3 minutes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          Bank Verification Number (BVN)
        </label>
        <Input
          type="text"
          placeholder="Enter your 11-digit BVN"
          value={bvnInput}
          onChange={(e) => setBvnInput(e.target.value.replace(/\D/g, '').slice(0, 11))}
          className="h-12 text-center text-lg tracking-wider"
          maxLength={11}
        />
        <p className="text-xs text-[#64748B] mt-2">
          Don't have your BVN? Dial *565*0# from your registered phone number
        </p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <LockIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">Data Security</h4>
              <p className="text-sm text-green-700">
                Your BVN is encrypted and stored securely. We only use it for identity verification as required by CBN regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={bvnInput.length !== 11}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderLivenessPhoto = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Liveness Verification</h2>
        <p className="text-[#64748B]">Take a photo to verify your identity</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CameraIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Photo Instructions</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Look directly at the camera</li>
                <li>• Ensure good lighting on your face</li>
                <li>• Remove glasses or hat if possible</li>
                <li>• Smile naturally</li>
                <li>• Photo cannot be edited after capture</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-[#64748B]">Position your face in the frame</p>
          </div>
        </div>
        
        <Button className="bg-[#5B52FF] text-white px-8 py-3">
          <CameraIcon className="w-5 h-5 mr-2" />
          Take Photo
        </Button>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleBVNVerification}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Verify BVN
        </Button>
      </div>
    </div>
  );

  const renderVerificationProcess = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Verifying Your Identity</h2>
        <p className="text-[#64748B]">Please wait while we verify your information</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <img src="/Logo Main Trans.png" alt="SureBanker" className="h-8" />
        <ArrowRightIcon className="w-6 h-6 text-[#64748B] animate-pulse" />
        <div className="text-lg font-semibold text-[#5B52FF]">ID Certify</div>
        <ArrowRightIcon className="w-6 h-6 text-[#64748B] animate-pulse" />
        <DatabaseIcon className="w-8 h-8 text-[#64748B] animate-bounce" />
      </div>

      <div className="space-y-4">
        {verificationSteps.map((step) => (
          <div key={step.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === 'completed' ? 'bg-green-500' :
              step.status === 'in-progress' ? 'bg-[#5B52FF]' :
              step.status === 'failed' ? 'bg-red-500' :
              'bg-gray-300'
            }`}>
              {step.status === 'completed' ? (
                <CheckIcon className="w-4 h-4 text-white" />
              ) : step.status === 'in-progress' ? (
                <LoaderIcon className="w-4 h-4 text-white animate-spin" />
              ) : step.status === 'failed' ? (
                <XIcon className="w-4 h-4 text-white" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <div>
              <p className="font-medium text-[#1E293B]">{step.title}</p>
              <p className="text-sm text-[#64748B]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {!isProcessing && verificationSteps.every(step => step.status === 'completed') && (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-green-900 mb-2">🎉 Verification Complete! 🎉</h3>
          <p className="text-green-700 mb-6">Your Tier {selectedTier} KYC has been successfully verified</p>
          <Button 
            onClick={() => {
              onUpgrade(selectedTier);
              onClose();
            }}
            className="bg-green-600 text-white px-8 py-3"
          >
            Continue to Dashboard
          </Button>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {currentStep === 1 && renderTierSelection()}
          {currentStep === 2 && renderBVNVerification()}
          {currentStep === 3 && renderLivenessPhoto()}
          {currentStep === 4 && renderVerificationProcess()}
          {/* Add more steps for NIN and Document verification */}
        </div>
      </div>
    </div>
  );
};