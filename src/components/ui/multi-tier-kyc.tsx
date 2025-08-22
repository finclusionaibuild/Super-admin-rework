import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  CameraIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  InfoIcon,
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  LockIcon,
  FileTextIcon,
  EyeIcon,
  EyeOffIcon,
  StarIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingUpIcon,
  ClockIcon,
  PhoneIcon,
  MailIcon,
  HomeIcon,
  IdCardIcon,
  ScanIcon
} from 'lucide-react';

interface KYCTier {
  tier: number;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  requirements: string[];
  benefits: string[];
  limits: {
    dailyTransfer: string;
    monthlyTransfer: string;
    cardRequest: boolean;
    features: string[];
  };
}

interface MultiTierKYCProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onTierComplete: (tier: number) => void;
}

export const MultiTierKYC: React.FC<MultiTierKYCProps> = ({
  isOpen,
  onClose,
  currentTier,
  onTierComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(1);
  const [formData, setFormData] = useState({
    bvn: '',
    nin: '',
    address: '',
    city: '',
    state: '',
    sourceOfIncome: '',
    pin: '',
    confirmPin: '',
    verificationId: '',
    idType: 'passport'
  });
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [livenessStep, setLivenessStep] = useState(0);
  const [kycData, setKycData] = useState({
    bvn: '',
    address: '',
    city: '',
    state: '',
    sourceOfIncome: '',
    pin: '',
    confirmPin: '',
    nin: '',
    idType: '',
    idNumber: '',
    idDocument: null as File | null
  });
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const kycTiers: KYCTier[] = [
    {
      tier: 1,
      name: 'Basic Verification',
      status: currentTier >= 1 ? 'completed' : 'not_started',
      requirements: [
        'Bank Verification Number (BVN)',
        'Face Verification (Liveness Check)',
        'Residential Address',
        'Source of Income',
        'Payment PIN Setup'
      ],
      benefits: [
        'Basic money transfers',
        'Bill payments',
        'Account management',
        'Customer support access'
      ],
      limits: {
        dailyTransfer: '₦50,000',
        monthlyTransfer: '₦500,000',
        cardRequest: false,
        features: ['Basic Transfers', 'Bill Payments', 'Account View']
      }
    },
    {
      tier: 2,
      name: 'Enhanced Verification',
      status: currentTier >= 2 ? 'completed' : currentTier === 1 ? 'not_started' : 'not_started',
      requirements: [
        'National Identification Number (NIN)',
        'Enhanced identity verification'
      ],
      benefits: [
        'Higher transaction limits',
        'Card request capability',
        'Advanced savings features',
        'Investment options'
      ],
      limits: {
        dailyTransfer: '₦200,000',
        monthlyTransfer: '₦2,000,000',
        cardRequest: true,
        features: ['Card Requests', 'Higher Limits', 'Savings Plans', 'Investment Access']
      }
    },
    {
      tier: 3,
      name: 'Premium Verification',
      status: currentTier >= 3 ? 'completed' : currentTier >= 2 ? 'not_started' : 'not_started',
      requirements: [
        'Government-issued ID verification',
        'Address verification document',
        'Enhanced security verification'
      ],
      benefits: [
        'Maximum transaction limits',
        'Premium features access',
        'Business account eligibility',
        'Priority customer support'
      ],
      limits: {
        dailyTransfer: '₦1,000,000',
        monthlyTransfer: '₦10,000,000',
        cardRequest: true,
        features: ['Maximum Limits', 'Premium Features', 'Business Access', 'Priority Support']
      }
    }
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const incomeOptions = [
    'Employment/Salary',
    'Business/Self-employed',
    'Freelancing/Consulting',
    'Investment Returns',
    'Pension/Retirement',
    'Family Support',
    'Other'
  ];

  const idTypes = [
    { value: 'passport', label: 'International Passport' },
    { value: 'drivers_license', label: "Driver's License" },
    { value: 'voters_card', label: "Voter's Card" },
    { value: 'national_id', label: 'National ID Card' }
  ];

  const livenessInstructions = [
    'Look directly at the camera',
    'Blink your eyes twice',
    'Smile naturally',
    'Turn your head slightly left',
    'Turn your head slightly right',
    'Verification complete'
  ];

  useEffect(() => {
    if (isCapturing && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Camera access denied:', err));
    }
  }, [isCapturing]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const startFaceCapture = () => {
    setIsCapturing(true);
    setLivenessStep(0);
  };

  const captureFace = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setFaceImage(imageData);
        setIsCapturing(false);
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const nextLivenessStep = () => {
    if (livenessStep < livenessInstructions.length - 1) {
      setLivenessStep(prev => prev + 1);
    } else {
      captureFace();
    }
  };

  const handleVerification = async () => {
    setVerificationStatus('processing');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('success');
      setTimeout(() => {
        onTierComplete(selectedTier);
        setCurrentStep(1);
        onClose();
      }, 2000);
    }, 3000);
  };

  const renderTierOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">KYC Verification</h2>
        <p className="text-[#64748B]">Complete your verification to unlock all features</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {kycTiers.map((tier) => (
          <Card 
            key={tier.tier}
            className={`cursor-pointer transition-all ${
              tier.status === 'completed' ? 'border-green-200 bg-green-50' :
              tier.tier <= currentTier + 1 ? 'border-blue-200 hover:shadow-md' :
              'border-gray-200 bg-gray-50 opacity-60'
            }`}
            onClick={() => {
              if (tier.tier <= currentTier + 1) {
                setSelectedTier(tier.tier);
                setCurrentStep(2);
              }
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tier.status === 'completed' ? 'bg-green-500' :
                    tier.tier <= currentTier + 1 ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {tier.status === 'completed' ? (
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">T{tier.tier}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B]">Tier {tier.tier}</h3>
                    <p className="text-sm text-[#64748B]">{tier.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    tier.status === 'completed' ? 'bg-green-100 text-green-800' :
                    tier.tier <= currentTier + 1 ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {tier.status === 'completed' ? 'Completed' :
                     tier.tier <= currentTier + 1 ? 'Available' : 'Locked'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-2">Benefits</h4>
                  <ul className="text-sm text-[#64748B] space-y-1">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-3 h-3 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-2">Limits</h4>
                  <div className="text-sm text-[#64748B] space-y-1">
                    <p>Daily: {tier.limits.dailyTransfer}</p>
                    <p>Monthly: {tier.limits.monthlyTransfer}</p>
                    <p>Cards: {tier.limits.cardRequest ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTierRequirements = () => {
    const tier = kycTiers[selectedTier - 1];
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Tier {selectedTier} Verification</h2>
          <p className="text-[#64748B]">{tier.name}</p>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Requirements</h3>
            <ul className="space-y-2">
              {tier.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-blue-700">
                  <InfoIcon className="w-4 h-4" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-900 mb-4">Benefits & Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">New Benefits</h4>
                <ul className="space-y-1">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-green-700 text-sm">
                      <CheckCircleIcon className="w-3 h-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">Transaction Limits</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <p>Daily Transfer: {tier.limits.dailyTransfer}</p>
                  <p>Monthly Transfer: {tier.limits.monthlyTransfer}</p>
                  <p>Card Requests: {tier.limits.cardRequest ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={() => setCurrentStep(3)} className="flex-1 bg-[#5B52FF] text-white">
            Start Verification
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderBVNVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <UserIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">BVN Verification</h2>
        <p className="text-[#64748B]">Enter your Bank Verification Number</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-900">Important</p>
            <p className="text-xs text-yellow-700">Your BVN is used to verify your identity and is kept secure according to banking regulations.</p>
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
          value={formData.bvn}
          onChange={(e) => handleInputChange('bvn', e.target.value)}
          className="h-12"
          maxLength={11}
        />
        <p className="text-xs text-[#64748B] mt-1">
          Your BVN is an 11-digit number linked to your bank account
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(4)} 
          disabled={formData.bvn.length !== 11}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Verify BVN
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderFaceVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CameraIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Face Verification</h2>
        <p className="text-[#64748B]">Complete liveness check for identity verification</p>
      </div>

      {!isCapturing && !faceImage && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Before You Start</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Ensure good lighting on your face
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Remove hats, sunglasses, or face coverings
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Look directly at the camera
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Follow the on-screen instructions
              </li>
            </ul>
          </CardContent>
        </Card>
      )}

      {isCapturing && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-[#1E293B] mb-2">
                  Step {livenessStep + 1} of {livenessInstructions.length}
                </h3>
                <p className="text-[#64748B]">{livenessInstructions[livenessStep]}</p>
              </div>
              
              <div className="relative mx-auto w-80 h-60 bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-[#5B52FF] rounded-lg"></div>
              </div>
              
              <div className="text-center mt-4">
                <Button onClick={nextLivenessStep} className="bg-[#5B52FF] text-white">
                  {livenessStep === livenessInstructions.length - 1 ? 'Capture' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {faceImage && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-[#1E293B] mb-4">Review Your Photo</h3>
              <img src={faceImage} alt="Captured face" className="w-60 h-48 object-cover rounded-lg mx-auto mb-4" />
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  setFaceImage(null);
                  setLivenessStep(0);
                }}>
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={() => setCurrentStep(5)} className="bg-[#5B52FF] text-white">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!isCapturing && !faceImage && (
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={startFaceCapture} className="flex-1 bg-[#5B52FF] text-white">
            <CameraIcon className="w-4 h-4 mr-2" />
            Start Camera
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );

  const renderAddressVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <MapPinIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Residential Address</h2>
        <p className="text-[#64748B]">Provide your current residential address</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            Full Address
          </label>
          <textarea
            placeholder="Enter your complete residential address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">City</label>
            <Input
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">State</label>
            <select 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select state</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(4)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(6)} 
          disabled={!formData.address || !formData.city || !formData.state}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderIncomeVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <BriefcaseIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Source of Income</h2>
        <p className="text-[#64748B]">Tell us about your primary source of income</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          Primary Source of Income
        </label>
        <div className="grid grid-cols-1 gap-3">
          {incomeOptions.map((option) => (
            <Card 
              key={option}
              className={`cursor-pointer transition-all ${
                formData.sourceOfIncome === option ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
              }`}
              onClick={() => handleInputChange('sourceOfIncome', option)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  formData.sourceOfIncome === option 
                    ? 'border-[#5B52FF] bg-[#5B52FF]' 
                    : 'border-gray-300'
                }`}>
                  {formData.sourceOfIncome === option && (
                    <CheckCircleIcon className="w-3 h-3 text-white m-0.5" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(5)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(7)} 
          disabled={!formData.sourceOfIncome}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderPINSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <LockIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Set Payment PIN</h2>
        <p className="text-[#64748B]">Create a secure 4-digit PIN for transactions</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-900">PIN Security Tips</p>
            <ul className="text-xs text-yellow-700 mt-1 space-y-1">
              <li>• Use a unique 4-digit combination</li>
              <li>• Avoid obvious patterns (1234, 0000)</li>
              <li>• Don't use your birth year or phone number</li>
              <li>• Keep your PIN confidential</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            Create PIN
          </label>
          <div className="relative">
            <Input
              type={showPin ? "text" : "password"}
              placeholder="Enter 4-digit PIN"
              value={formData.pin}
              onChange={(e) => handleInputChange('pin', e.target.value.slice(0, 4))}
              className="h-12 text-center text-2xl tracking-widest"
              maxLength={4}
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showPin ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            Confirm PIN
          </label>
          <div className="relative">
            <Input
              type={showConfirmPin ? "text" : "password"}
              placeholder="Confirm 4-digit PIN"
              value={formData.confirmPin}
              onChange={(e) => handleInputChange('confirmPin', e.target.value.slice(0, 4))}
              className="h-12 text-center text-2xl tracking-widest"
              maxLength={4}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showConfirmPin ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {formData.pin && formData.confirmPin && (
          <div className="text-center">
            {formData.pin === formData.confirmPin ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircleIcon className="w-4 h-4" />
                <span className="text-sm">PINs match</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-red-600">
                <XCircleIcon className="w-4 h-4" />
                <span className="text-sm">PINs don't match</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(6)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(8)} 
          disabled={!formData.pin || !formData.confirmPin || formData.pin !== formData.confirmPin || formData.pin.length !== 4}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Set PIN
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderNINVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <IdCardIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">NIN Verification</h2>
        <p className="text-[#64748B]">Enter your National Identification Number</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">About NIN Verification</p>
            <p className="text-xs text-blue-700">Your NIN helps us verify your identity according to Nigerian banking regulations.</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          National Identification Number (NIN)
        </label>
        <Input
          type="text"
          placeholder="Enter your 11-digit NIN"
          value={formData.nin}
          onChange={(e) => handleInputChange('nin', e.target.value)}
          className="h-12"
          maxLength={11}
        />
        <p className="text-xs text-[#64748B] mt-1">
          Your NIN is an 11-digit number on your National ID card
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(8)} 
          disabled={formData.nin.length !== 11}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Verify NIN
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderIDVerification = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ScanIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">ID Verification</h2>
        <p className="text-[#64748B]">Upload a government-issued ID document</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            ID Type
          </label>
          <select 
            value={formData.idType}
            onChange={(e) => handleInputChange('idType', e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            {idTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            ID Number
          </label>
          <Input
            type="text"
            placeholder="Enter ID number"
            value={formData.verificationId}
            onChange={(e) => handleInputChange('verificationId', e.target.value)}
            className="h-12"
          />
        </div>

        <Card className="border-2 border-dashed border-gray-300 hover:border-[#5B52FF] transition-colors">
          <CardContent className="p-8 text-center">
            <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-[#1E293B] mb-2">Upload ID Document</h3>
            <p className="text-sm text-[#64748B] mb-4">
              Take a clear photo or upload a scan of your {idTypes.find(t => t.value === formData.idType)?.label}
            </p>
            <Button variant="outline">
              <CameraIcon className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(8)} 
          disabled={!formData.verificationId}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-6 text-center">
      {verificationStatus === 'processing' ? (
        <>
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <ClockIcon className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Processing Verification</h2>
          <p className="text-[#64748B]">Please wait while we verify your information...</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 justify-center">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm">Validating documents</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Verifying identity</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Verification Complete!</h2>
          <p className="text-[#64748B]">
            Congratulations! You've successfully completed Tier {selectedTier} verification.
          </p>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-900 mb-4">New Features Unlocked</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    {kycTiers[selectedTier - 1].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-green-700 text-sm">
                        <StarIcon className="w-3 h-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">New Limits</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <p>Daily: {kycTiers[selectedTier - 1].limits.dailyTransfer}</p>
                    <p>Monthly: {kycTiers[selectedTier - 1].limits.monthlyTransfer}</p>
                    <p>Cards: {kycTiers[selectedTier - 1].limits.cardRequest ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const renderTierSummary = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Verification Status</h2>
        <p className="text-[#64748B]">Your current KYC verification progress</p>
      </div>

      <div className="space-y-4">
        {kycTiers.map((tier) => (
          <Card 
            key={tier.tier}
            className={`${
              tier.status === 'completed' ? 'border-green-200 bg-green-50' :
              tier.tier === currentTier + 1 ? 'border-blue-200 bg-blue-50' :
              'border-gray-200'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tier.status === 'completed' ? 'bg-green-500' :
                    tier.tier === currentTier + 1 ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {tier.status === 'completed' ? (
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">T{tier.tier}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B]">Tier {tier.tier} - {tier.name}</h3>
                    <p className="text-sm text-[#64748B]">
                      Daily Limit: {tier.limits.dailyTransfer} | Monthly: {tier.limits.monthlyTransfer}
                    </p>
                  </div>
                </div>
                <Badge className={
                  tier.status === 'completed' ? 'bg-green-100 text-green-800' :
                  tier.tier === currentTier + 1 ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {tier.status === 'completed' ? 'Completed' :
                   tier.tier === currentTier + 1 ? 'Next' : 'Locked'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={onClose} className="bg-[#5B52FF] text-white">
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );

  const getStepContent = () => {
    if (selectedTier === 1) {
      switch (currentStep) {
        case 1: return renderTierOverview();
        case 2: return renderTierRequirements();
        case 3: return renderBVNVerification();
        case 4: return renderFaceVerification();
        case 5: return renderAddressVerification();
        case 6: return renderIncomeVerification();
        case 7: return renderPINSetup();
        case 8: return renderSuccess();
        case 9: return renderTierSummary();
        default: return renderTierOverview();
      }
    } else if (selectedTier === 2) {
      switch (currentStep) {
        case 1: return renderTierOverview();
        case 2: return renderTierRequirements();
        case 3: return renderNINVerification();
        case 8: return renderSuccess();
        case 9: return renderTierSummary();
        default: return renderTierOverview();
      }
    } else if (selectedTier === 3) {
      switch (currentStep) {
        case 1: return renderTierOverview();
        case 2: return renderTierRequirements();
        case 3: return renderIDVerification();
        case 4: return renderAddressVerification();
        case 8: return renderSuccess();
        case 9: return renderTierSummary();
        default: return renderTierOverview();
      }
    }
    return renderTierOverview();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#1E293B]">KYC Verification</h1>
          <Button variant="ghost" onClick={onClose}>
            <XCircleIcon className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6">
          {verificationStatus === 'processing' ? (
            <div className="text-center py-12">
              {renderSuccess()}
            </div>
          ) : (
            getStepContent()
          )}
        </div>
      </div>
    </div>
  );
};