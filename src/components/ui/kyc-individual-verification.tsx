import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { 
  XIcon, 
  CheckIcon, 
  AlertTriangleIcon, 
  ShieldIcon, 
  CameraIcon,
  FileTextIcon,
  MapPinIcon,
  CreditCardIcon,
  BookOpenIcon,
  UploadIcon,
  SparklesIcon,
  ArrowRightIcon,
  InfoIcon,
  EyeIcon,
  LockIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KYCIndividualVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onUpgrade: (tier: number) => void;
}

export const KYCIndividualVerification: React.FC<KYCIndividualVerificationProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  const [selectedTier, setSelectedTier] = useState(currentTier + 1);
  const [currentStep, setCurrentStep] = useState(1);
  const [bvnNumber, setBvnNumber] = useState('');
  const [ninNumber, setNinNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    setVerificationError('');
    
    // Simulate verification process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setVerificationComplete(true);
        setIsVerifying(false);
        triggerConfetti();
        setTimeout(() => {
          onUpgrade(selectedTier);
          onClose();
        }, 3000);
      } else {
        setIsVerifying(false);
        setVerificationError('Unable to verify your information. Please check your details and try again.');
      }
    }, 3000);
  };

  const renderTierSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ShieldIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">KYC Verification</h2>
        <p className="text-[#64748B]">Powered by ID Certify</p>
      </div>

      <div className="space-y-4">
        {/* Tier 1 - BVN */}
        <Card className={`cursor-pointer transition-all ${
          selectedTier === 1 ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
        } ${currentTier >= 1 ? 'opacity-50' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileTextIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Tier 1 - BVN Verification</h3>
                  <p className="text-sm text-[#64748B]">Bank Verification Number</p>
                  <p className="text-xs text-green-600">Transaction limit: ₦50,000/day</p>
                </div>
              </div>
              {currentTier >= 1 ? (
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              ) : (
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedTier === 1 ? 'border-[#5B52FF] bg-[#5B52FF]' : 'border-gray-300'
                }`}>
                  {selectedTier === 1 && <CheckIcon className="w-3 h-3 text-white m-0.5" />}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tier 2 - NIN */}
        <Card className={`cursor-pointer transition-all ${
          selectedTier === 2 ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
        } ${currentTier >= 2 ? 'opacity-50' : ''} ${currentTier < 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Tier 2 - NIN Verification</h3>
                  <p className="text-sm text-[#64748B]">National Identification Number</p>
                  <p className="text-xs text-green-600">Transaction limit: ₦200,000/day</p>
                </div>
              </div>
              {currentTier >= 2 ? (
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              ) : currentTier < 1 ? (
                <Badge className="bg-gray-100 text-gray-600">Requires Tier 1</Badge>
              ) : (
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedTier === 2 ? 'border-[#5B52FF] bg-[#5B52FF]' : 'border-gray-300'
                }`}>
                  {selectedTier === 2 && <CheckIcon className="w-3 h-3 text-white m-0.5" />}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tier 3 - Document Verification */}
        <Card className={`cursor-pointer transition-all ${
          selectedTier === 3 ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
        } ${currentTier >= 3 ? 'opacity-50' : ''} ${currentTier < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Tier 3 - Document Verification</h3>
                  <p className="text-sm text-[#64748B]">Utility Bill, Driver's License, or Passport</p>
                  <p className="text-xs text-green-600">Transaction limit: ₦1,000,000/day</p>
                </div>
              </div>
              {currentTier >= 3 ? (
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              ) : currentTier < 2 ? (
                <Badge className="bg-gray-100 text-gray-600">Requires Tier 2</Badge>
              ) : (
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedTier === 3 ? 'border-[#5B52FF] bg-[#5B52FF]' : 'border-gray-300'
                }`}>
                  {selectedTier === 3 && <CheckIcon className="w-3 h-3 text-white m-0.5" />}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          disabled={currentTier >= selectedTier || (selectedTier > 1 && currentTier < selectedTier - 1)}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Start Verification
        </Button>
      </div>
    </div>
  );

  const renderBVNVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/Logo Main Trans.png" alt="SureBanker" className="h-8" />
          <ArrowRightIcon className="w-6 h-6 text-[#64748B]" />
          <div className="w-8 h-8 bg-[#5B52FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <ArrowRightIcon className="w-6 h-6 text-[#64748B]" />
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <FileTextIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">BVN Verification</h2>
        <p className="text-[#64748B]">Tier 1 Identity Verification</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-4">What to Expect:</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Your BVN will be verified against the Central Bank database</li>
            <li>• This process is secure and your data is protected</li>
            <li>• Verification usually takes 30-60 seconds</li>
            <li>• You'll unlock basic transfer and payment features</li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          Bank Verification Number (BVN)
        </label>
        <Input
          type="text"
          placeholder="Enter your 11-digit BVN"
          value={bvnNumber}
          onChange={(e) => setBvnNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
          className="h-12"
          maxLength={11}
        />
        <div className="mt-2 text-xs text-[#64748B]">
          <InfoIcon className="w-4 h-4 inline mr-1" />
          Don't have your BVN? Dial *565*0# from your registered phone number
        </div>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 flex items-start gap-3">
          <LockIcon className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">Your Data is Safe</p>
            <p className="text-xs text-green-700">
              We use bank-level encryption and partner with ID Certify to protect your information.
              Your BVN is only used for verification and is never stored on our servers.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleVerification}
          disabled={bvnNumber.length !== 11 || isVerifying}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          {isVerifying ? 'Verifying...' : 'Verify BVN'}
        </Button>
      </div>
    </div>
  );

  const renderNINVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/Logo Main Trans.png" alt="SureBanker" className="h-8" />
          <ArrowRightIcon className="w-6 h-6 text-[#64748B]" />
          <div className="w-8 h-8 bg-[#5B52FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <ArrowRightIcon className="w-6 h-6 text-[#64748B]" />
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <CreditCardIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">NIN Verification</h2>
        <p className="text-[#64748B]">Tier 2 Identity Verification</p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-green-900 mb-4">What to Expect:</h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• Your NIN will be verified against the NIMC database</li>
            <li>• Enhanced security and higher transaction limits</li>
            <li>• Access to card services and advanced features</li>
            <li>• Verification usually takes 1-2 minutes</li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          National Identification Number (NIN)
        </label>
        <Input
          type="text"
          placeholder="Enter your 11-digit NIN"
          value={ninNumber}
          onChange={(e) => setNinNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
          className="h-12"
          maxLength={11}
        />
        <div className="mt-2 text-xs text-[#64748B]">
          <InfoIcon className="w-4 h-4 inline mr-1" />
          Find your NIN on your National ID card or visit the nearest NIMC office
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleVerification}
          disabled={ninNumber.length !== 11 || isVerifying}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          {isVerifying ? 'Verifying...' : 'Verify NIN'}
        </Button>
      </div>
    </div>
  );

  const renderDocumentVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Document Verification</h2>
        <p className="text-[#64748B]">Tier 3 Identity Verification</p>
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-purple-900 mb-4">What to Expect:</h3>
          <ul className="space-y-2 text-sm text-purple-700">
            <li>• Upload a clear photo of your chosen document</li>
            <li>• OCR technology will extract and verify information</li>
            <li>• Address verification with Google Maps integration</li>
            <li>• Social verification with 2 attesters</li>
            <li>• Maximum transaction limits unlocked</li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          Select Verification Document
        </label>
        <select 
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          className="w-full h-12 px-3 border border-gray-300 rounded-lg"
        >
          <option value="">Choose document type</option>
          <option value="utility">Utility Bill</option>
          <option value="drivers">Driver's License</option>
          <option value="passport">International Passport</option>
          <option value="others">Others (Manual Verification)</option>
        </select>
      </div>

      {selectedDocument && (
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            Upload Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#5B52FF] transition-colors">
            <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-[#64748B] mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-[#64748B]">
              PNG, JPG or PDF (max. 5MB)
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              className="hidden"
              id="document-upload"
            />
            <label htmlFor="document-upload">
              <Button className="mt-3 bg-[#5B52FF] text-white cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>
          {uploadedFile && (
            <p className="text-sm text-green-600 mt-2">
              ✓ {uploadedFile.name} uploaded successfully
            </p>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleVerification}
          disabled={!selectedDocument || !uploadedFile || isVerifying}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          {isVerifying ? 'Processing...' : 'Submit Document'}
        </Button>
      </div>
    </div>
  );

  const renderVerificationProcess = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-[#5B52FF] rounded-full flex items-center justify-center mx-auto animate-pulse">
        <ShieldIcon className="w-10 h-10 text-white" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Verifying Your Information</h2>
        <p className="text-[#64748B]">Please wait while we verify your details...</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm">Validating document</span>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm">Checking database records</span>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-gray-500">Finalizing verification</span>
        </div>
      </div>
    </div>
  );

  const renderVerificationSuccess = () => (
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <SparklesIcon className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🎉 Good Job! 🎉</h2>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Verification Complete!</h3>
        <p className="text-[#64748B]">
          Your Tier {selectedTier} verification has been successfully completed.
          You now have access to enhanced features and higher transaction limits.
        </p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-green-900 mb-2">What's Unlocked:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            {selectedTier === 1 && (
              <>
                <li>✓ Money transfers up to ₦50,000/day</li>
                <li>✓ Bill payments and airtime purchases</li>
                <li>✓ Basic wallet features</li>
              </>
            )}
            {selectedTier === 2 && (
              <>
                <li>✓ Money transfers up to ₦200,000/day</li>
                <li>✓ Request debit and virtual cards</li>
                <li>✓ Access to savings and investment features</li>
              </>
            )}
            {selectedTier === 3 && (
              <>
                <li>✓ Money transfers up to ₦1,000,000/day</li>
                <li>✓ Premium card options</li>
                <li>✓ Business account upgrade eligibility</li>
                <li>✓ Priority customer support</li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerificationError = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangleIcon className="w-10 h-10 text-white" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Unable to Verify</h2>
        <p className="text-[#64748B] mb-4">{verificationError}</p>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-red-900 mb-2">Next Steps:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Double-check your information for accuracy</li>
            <li>• Ensure your document is clear and readable</li>
            <li>• Contact support if the issue persists</li>
            <li>• You can retry verification after 24 hours</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Close
        </Button>
        <Button 
          onClick={() => {
            setCurrentStep(selectedTier === 1 ? 2 : selectedTier === 2 ? 3 : 4);
            setVerificationError('');
          }}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShieldIcon className="w-6 h-6 text-[#5B52FF]" />
              <h1 className="text-xl font-semibold text-[#1E293B]">KYC Verification</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XIcon className="w-5 h-5" />
            </Button>
          </div>

          {currentStep === 1 && renderTierSelection()}
          {currentStep === 2 && selectedTier === 1 && renderBVNVerification()}
          {currentStep === 3 && selectedTier === 2 && renderNINVerification()}
          {currentStep === 4 && selectedTier === 3 && renderDocumentVerification()}
          {isVerifying && renderVerificationProcess()}
          {verificationComplete && renderVerificationSuccess()}
          {verificationError && renderVerificationError()}
        </CardContent>
      </Card>
    </div>
  );
};