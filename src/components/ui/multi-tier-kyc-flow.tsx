import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { CheckIcon, XIcon, ArrowLeftIcon, ArrowRightIcon, ShieldCheckIcon, CameraIcon, RefreshCwIcon, EyeIcon, EyeOffIcon, UserIcon, MapPinIcon, DollarSignIcon, LockIcon, FileTextIcon, HomeIcon, AlertTriangleIcon, InfoIcon, StarIcon, TrophyIcon, PlayIcon, PauseIcon, RotateCcwIcon, SmileIcon, ScanIcon, ShieldIcon, CreditCardIcon, BanknoteIcon as BanknotesIcon, TrendingUpIcon, PhoneIcon, MailIcon, CalendarIcon, BuildingIcon, GraduationCapIcon, BriefcaseIcon, PiggyBankIcon } from 'lucide-react';

interface KYCFlowProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onTierComplete: (tier: number) => void;
}

interface KYCData {
  // Tier 1
  bvn: string;
  faceVerified: boolean;
  faceImageData: string | null;
  residentialAddress: string;
  sourceOfIncome: string;
  paymentPin: string;
  confirmPaymentPin: string;
  
  // Tier 2
  nin: string;
  
  // Tier 3
  verificationId: string;
  idType: string;
  addressVerificationMethod: string;
  addressDocument: File | null;
}

export const MultiTierKYCFlow: React.FC<KYCFlowProps> = ({
  isOpen,
  onClose,
  currentTier,
  onTierComplete
}) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedTier, setSelectedTier] = useState(currentTier + 1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [livenessStep, setLivenessStep] = useState(0);
  const [livenessInstructions, setLivenessInstructions] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  
  const [kycData, setKycData] = useState<KYCData>({
    bvn: '',
    faceVerified: false,
    faceImageData: null,
    residentialAddress: '',
    sourceOfIncome: '',
    paymentPin: '',
    confirmPaymentPin: '',
    nin: '',
    verificationId: '',
    idType: 'passport',
    addressVerificationMethod: 'utility_bill',
    addressDocument: null
  });

  const tierBenefits = {
    1: {
      title: "Tier 1 Verification",
      subtitle: "Basic Account Access",
      dailyLimit: "₦50,000",
      monthlyLimit: "₦200,000",
      features: [
        "Send and receive money",
        "Pay bills and buy airtime",
        "Basic savings features",
        "Transaction history",
        "Customer support access"
      ],
      requirements: [
        "Bank Verification Number (BVN)",
        "Face verification (Liveness check)",
        "Residential address",
        "Source of income information",
        "Set payment PIN"
      ]
    },
    2: {
      title: "Tier 2 Verification",
      subtitle: "Enhanced Account Features",
      dailyLimit: "₦200,000",
      monthlyLimit: "₦1,000,000",
      features: [
        "Higher transaction limits",
        "Request physical cards",
        "Advanced savings plans",
        "Investment opportunities",
        "Priority customer support",
        "International transfers"
      ],
      requirements: [
        "Complete Tier 1 verification",
        "National Identification Number (NIN)",
        "Enhanced security features"
      ]
    },
    3: {
      title: "Tier 3 Verification",
      subtitle: "Premium Account Access",
      dailyLimit: "₦1,000,000",
      monthlyLimit: "₦5,000,000",
      features: [
        "Maximum transaction limits",
        "Premium card options",
        "Business account eligibility",
        "Loan and credit facilities",
        "VIP customer support",
        "Advanced investment products",
        "Cryptocurrency trading"
      ],
      requirements: [
        "Complete Tier 2 verification",
        "Additional government-issued ID",
        "Address verification document",
        "Enhanced due diligence"
      ]
    }
  };

  const sourceOfIncomeOptions = [
    "Employment/Salary",
    "Business/Self-employed",
    "Investment Income",
    "Pension/Retirement",
    "Government Benefits",
    "Family Support",
    "Freelancing/Consulting",
    "Rental Income",
    "Other"
  ];

  const idTypeOptions = [
    { value: "passport", label: "International Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "voters_card", label: "Voter's Registration Card" },
    { value: "national_id", label: "National ID Card" }
  ];

  const addressVerificationOptions = [
    { value: "utility_bill", label: "Utility Bill (Electricity, Water, Gas)" },
    { value: "bank_statement", label: "Bank Statement" },
    { value: "rent_agreement", label: "Rent Agreement/Lease" },
    { value: "government_letter", label: "Government Correspondence" }
  ];

  const livenessInstructionsList = [
    "Look directly at the camera",
    "Blink your eyes twice",
    "Smile naturally",
    "Turn your head slightly left",
    "Turn your head slightly right",
    "Nod your head up and down"
  ];

  useEffect(() => {
    if (cameraActive) {
      startCamera();
      setLivenessInstructions(livenessInstructionsList);
      setCurrentInstruction(0);
    }
    return () => {
      stopCamera();
    };
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setKycData({ ...kycData, faceImageData: imageData });
      }
    }
  };

  const nextLivenessInstruction = () => {
    if (currentInstruction < livenessInstructions.length - 1) {
      setCurrentInstruction(currentInstruction + 1);
    } else {
      // Complete liveness check
      captureImage();
      setCameraActive(false);
      setKycData({ ...kycData, faceVerified: true });
    }
  };

  const handleInputChange = (field: keyof KYCData, value: string | boolean | File | null) => {
    setKycData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTierComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onTierComplete(selectedTier);
      setCurrentStep(1);
    }, 2000);
  };

  const getTotalSteps = () => {
    switch (selectedTier) {
      case 1: return 8; // Requirements, BVN, Face, Address, Income, PIN, Success, Summary
      case 2: return 5; // Requirements, NIN, Success, Summary
      case 3: return 6; // Requirements, ID, Address Verification, Success, Summary
      default: return 1;
    }
  };

  const renderStepIndicator = () => {
    const totalSteps = getTotalSteps();
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? "bg-[#5B52FF] text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                {step < currentStep ? <CheckIcon className="w-4 h-4" /> : step}
              </div>
              {step < totalSteps && (
                <div className={`w-8 h-0.5 ${
                  step < currentStep ? "bg-[#5B52FF]" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tier Selection
  const renderTierSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1E293B] mb-4">Account Verification</h2>
        <p className="text-[#64748B] text-lg">Choose your verification tier to unlock account features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tierBenefits).map(([tier, benefits]) => {
          const tierNum = parseInt(tier);
          const isCompleted = tierNum <= currentTier;
          const isAvailable = tierNum <= currentTier + 1;
          
          return (
            <Card 
              key={tier}
              className={`cursor-pointer transition-all ${
                selectedTier === tierNum ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 
                isCompleted ? 'border-green-200 bg-green-50' :
                !isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
              onClick={() => isAvailable && setSelectedTier(tierNum)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isCompleted ? 'bg-green-500' : 
                    selectedTier === tierNum ? 'bg-[#5B52FF]' : 'bg-gray-200'
                  }`}>
                    {isCompleted ? (
                      <CheckIcon className="w-8 h-8 text-white" />
                    ) : (
                      <ShieldCheckIcon className={`w-8 h-8 ${
                        selectedTier === tierNum ? 'text-white' : 'text-gray-500'
                      }`} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">{benefits.title}</h3>
                  <p className="text-[#64748B]">{benefits.subtitle}</p>
                  {isCompleted && (
                    <Badge className="bg-green-100 text-green-800 mt-2">Completed</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F8F9FF] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1E293B] mb-2">Transaction Limits</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Daily:</span>
                        <span className="font-medium">{benefits.dailyLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Monthly:</span>
                        <span className="font-medium">{benefits.monthlyLimit}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#1E293B] mb-2">Features</h4>
                    <ul className="space-y-1">
                      {benefits.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[#64748B]">
                          <CheckIcon className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {benefits.features.length > 3 && (
                        <li className="text-sm text-[#64748B]">
                          +{benefits.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <Button 
                  className={`w-full mt-6 ${
                    isCompleted ? 'bg-green-500 hover:bg-green-600' :
                    selectedTier === tierNum ? 'bg-[#5B52FF] hover:bg-[#4338CA]' : 
                    'bg-gray-300'
                  } text-white`}
                  disabled={!isAvailable}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCompleted) {
                      // Show completed tier details
                      return;
                    }
                    if (isAvailable) {
                      setSelectedTier(tierNum);
                      setCurrentStep(1);
                    }
                  }}
                >
                  {isCompleted ? 'Completed' : 
                   !isAvailable ? 'Complete Previous Tier' : 
                   'Start Verification'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedTier && (
        <div className="text-center mt-8">
          <Button 
            onClick={() => setCurrentStep(1)}
            className="bg-[#5B52FF] text-white px-8 py-3 text-lg"
            disabled={selectedTier > currentTier + 1}
          >
            Begin {tierBenefits[selectedTier as keyof typeof tierBenefits].title}
          </Button>
        </div>
      )}
    </div>
  );

  // Tier 1 Steps
  const renderTier1Requirements = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#5B52FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Tier 1 Verification</h2>
        <p className="text-[#64748B]">Complete these requirements to unlock basic account features</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">What You'll Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Transaction Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Daily Limit:</span>
                  <span className="font-medium text-green-600">₦50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Monthly Limit:</span>
                  <span className="font-medium text-green-600">₦200,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Features</h4>
              <ul className="space-y-1">
                {tierBenefits[1].features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-3 h-3 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Requirements</h3>
          <div className="space-y-3">
            {tierBenefits[1].requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#F8F9FF] rounded-lg">
                <div className="w-8 h-8 bg-[#5B52FF] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-[#1E293B]">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setSelectedTier(0)} className="flex-1">
          Back to Tiers
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-[#5B52FF] text-white">
          Start Verification
        </Button>
      </div>
    </div>
  );

  const renderBVNVerification = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileTextIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">BVN Verification</h2>
        <p className="text-[#64748B]">Enter your Bank Verification Number to verify your identity</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              Bank Verification Number (BVN)
            </label>
            <Input
              type="text"
              placeholder="Enter your 11-digit BVN"
              value={kycData.bvn}
              onChange={(e) => handleInputChange('bvn', e.target.value.replace(/\D/g, '').slice(0, 11))}
              className="h-12 text-center text-lg tracking-wider"
              maxLength={11}
            />
            <p className="text-xs text-[#64748B] mt-2">
              Your BVN is safe and secure. We use bank-level encryption to protect your data.
            </p>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">What is BVN?</h4>
                  <p className="text-sm text-blue-700">
                    Bank Verification Number (BVN) is a unique 11-digit number that serves as a 
                    universal identifier across all Nigerian banks. It helps verify your identity 
                    and prevent fraud.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={kycData.bvn.length !== 11}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Verify BVN
        </Button>
      </div>
    </div>
  );

  const renderFaceVerification = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CameraIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Face Verification</h2>
        <p className="text-[#64748B]">We need to verify your identity using your camera</p>
      </div>

      {!cameraActive && !capturedImage && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Before We Start</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[#1E293B] mb-3">Requirements</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    Good lighting on your face
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    Remove hats, sunglasses, or masks
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    Look directly at the camera
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    Stay still during capture
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[#1E293B] mb-3">What We'll Do</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <ScanIcon className="w-4 h-4 text-blue-500" />
                    Activate your camera
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <SmileIcon className="w-4 h-4 text-blue-500" />
                    Guide you through liveness checks
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CameraIcon className="w-4 h-4 text-blue-500" />
                    Capture your photo
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#64748B]">
                    <ShieldIcon className="w-4 h-4 text-blue-500" />
                    Verify your identity
                  </li>
                </ul>
              </div>
            </div>
            
            <Button 
              onClick={() => setCameraActive(true)}
              className="w-full mt-6 bg-[#5B52FF] text-white h-12"
            >
              <CameraIcon className="w-5 h-5 mr-2" />
              Start Face Verification
            </Button>
          </CardContent>
        </Card>
      )}

      {cameraActive && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Liveness Check</h3>
              <p className="text-[#64748B]">
                Follow the instruction: <span className="font-medium text-[#5B52FF]">
                  {livenessInstructions[currentInstruction]}
                </span>
              </p>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 border-4 border-[#5B52FF] rounded-lg pointer-events-none"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                  Step {currentInstruction + 1} of {livenessInstructions.length}
                </div>
              </div>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCameraActive(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={nextLivenessInstruction}
                className="flex-1 bg-[#5B52FF] text-white"
              >
                {currentInstruction === livenessInstructions.length - 1 ? 'Capture' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {capturedImage && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Review Your Photo</h3>
              <p className="text-[#64748B]">Make sure your face is clearly visible</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <img 
                src={capturedImage} 
                alt="Captured face" 
                className="w-64 h-64 object-cover rounded-lg border-2 border-gray-200"
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCapturedImage(null);
                  setCameraActive(true);
                  setCurrentInstruction(0);
                }}
                className="flex-1"
              >
                <RotateCcwIcon className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button 
                onClick={handleNext}
                className="flex-1 bg-[#5B52FF] text-white"
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!cameraActive && !capturedImage && (
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
        </div>
      )}
    </div>
  );

  const renderResidentialAddress = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPinIcon className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Residential Address</h2>
        <p className="text-[#64748B]">Provide your current residential address</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Full Address
              </label>
              <textarea
                placeholder="Enter your complete residential address including street, city, state, and postal code"
                value={kycData.residentialAddress}
                onChange={(e) => handleInputChange('residentialAddress', e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Important</h4>
              <p className="text-sm text-yellow-700">
                Ensure your address is accurate as it will be used for verification and 
                correspondence. You may be required to provide supporting documents later.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!kycData.residentialAddress.trim()}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderSourceOfIncome = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSignIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Source of Income</h2>
        <p className="text-[#64748B]">Tell us about your primary source of income</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Primary Source of Income
              </label>
              <select
                value={kycData.sourceOfIncome}
                onChange={(e) => handleInputChange('sourceOfIncome', e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select your source of income</option>
                {sourceOfIncomeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {kycData.sourceOfIncome === 'Other' && (
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Please specify
                </label>
                <Input
                  placeholder="Describe your source of income"
                  className="h-12"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Why We Need This</h4>
              <p className="text-sm text-blue-700">
                This information helps us comply with financial regulations and provide 
                you with appropriate services and limits based on your income profile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!kycData.sourceOfIncome}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderSetPaymentPIN = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LockIcon className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Set Payment PIN</h2>
        <p className="text-[#64748B]">Create a secure 4-digit PIN for transactions</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Create PIN
              </label>
              <div className="relative">
                <Input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter 4-digit PIN"
                  value={kycData.paymentPin}
                  onChange={(e) => handleInputChange('paymentPin', e.target.value.replace(/\D/g, '').slice(0, 4))}
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
                  value={kycData.confirmPaymentPin}
                  onChange={(e) => handleInputChange('confirmPaymentPin', e.target.value.replace(/\D/g, '').slice(0, 4))}
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

            {kycData.paymentPin && kycData.confirmPaymentPin && (
              <div className="text-center">
                {kycData.paymentPin === kycData.confirmPaymentPin ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckIcon className="w-4 h-4" />
                    <span className="text-sm">PINs match</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <XIcon className="w-4 h-4" />
                    <span className="text-sm">PINs don't match</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <ShieldIcon className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900 mb-1">Security Tips</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Don't use obvious combinations like 1234 or 0000</li>
                <li>• Don't share your PIN with anyone</li>
                <li>• Use a PIN that's different from your phone unlock code</li>
                <li>• You can change your PIN anytime in settings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!kycData.paymentPin || !kycData.confirmPaymentPin || kycData.paymentPin !== kycData.confirmPaymentPin || kycData.paymentPin.length !== 4}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Set PIN
        </Button>
      </div>
    </div>
  );

  const renderTier1Success = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🎉 Tier 1 Complete! 🎉</h2>
        <p className="text-[#64748B]">Your basic verification has been completed successfully</p>
      </div>

      <Card className="mb-8 border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">You Now Have Access To:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-800 mb-2">Transaction Limits</h4>
              <div className="space-y-1 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Daily:</span>
                  <span className="font-medium">₦50,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-medium">₦200,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">Features</h4>
              <ul className="space-y-1">
                {tierBenefits[1].features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-green-700">
                    <CheckIcon className="w-3 h-3 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleNext}
        className="w-full h-12 bg-[#5B52FF] text-white"
      >
        Continue to Tier Summary
      </Button>
    </div>
  );

  // Tier 2 Steps
  const renderTier2Requirements = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#5B52FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <TrophyIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Tier 2 Verification</h2>
        <p className="text-[#64748B]">Unlock enhanced features with higher transaction limits</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Enhanced Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">New Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Daily Limit:</span>
                  <span className="font-medium text-blue-600">₦200,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Monthly Limit:</span>
                  <span className="font-medium text-blue-600">₦1,000,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">New Features</h4>
              <ul className="space-y-1">
                {tierBenefits[2].features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-3 h-3 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Requirements</h3>
          <div className="space-y-3">
            {tierBenefits[2].requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#F8F9FF] rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-[#1E293B]">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setSelectedTier(0)} className="flex-1">
          Back to Tiers
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-[#5B52FF] text-white">
          Start Tier 2
        </Button>
      </div>
    </div>
  );

  const renderNINVerification = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileTextIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">NIN Verification</h2>
        <p className="text-[#64748B]">Enter your National Identification Number</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              National Identification Number (NIN)
            </label>
            <Input
              type="text"
              placeholder="Enter your 11-digit NIN"
              value={kycData.nin}
              onChange={(e) => handleInputChange('nin', e.target.value.replace(/\D/g, '').slice(0, 11))}
              className="h-12 text-center text-lg tracking-wider"
              maxLength={11}
            />
            <p className="text-xs text-[#64748B] mt-2">
              Your NIN is encrypted and stored securely according to data protection standards.
            </p>
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <InfoIcon className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-2">About NIN</h4>
                  <p className="text-sm text-green-700">
                    The National Identification Number (NIN) is a unique 11-digit number 
                    assigned to every Nigerian citizen and legal resident. It's required 
                    for enhanced account verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={kycData.nin.length !== 11}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Verify NIN
        </Button>
      </div>
    </div>
  );

  const renderTier2Success = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <TrophyIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🏆 Tier 2 Complete! 🏆</h2>
        <p className="text-[#64748B]">You now have enhanced account access and features</p>
      </div>

      <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Enhanced Access Unlocked:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">New Limits</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span>Daily:</span>
                  <span className="font-medium">₦200,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-medium">₦1,000,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">New Features</h4>
              <ul className="space-y-1">
                {tierBenefits[2].features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-blue-700">
                    <CheckIcon className="w-3 h-3 text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleNext}
        className="w-full h-12 bg-[#5B52FF] text-white"
      >
        Continue to Tier Summary
      </Button>
    </div>
  );

  // Tier 3 Steps
  const renderTier3Requirements = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <StarIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Tier 3 Verification</h2>
        <p className="text-[#64748B]">Unlock premium features with maximum transaction limits</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Premium Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Maximum Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Daily Limit:</span>
                  <span className="font-medium text-purple-600">₦1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Monthly Limit:</span>
                  <span className="font-medium text-purple-600">₦5,000,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Premium Features</h4>
              <ul className="space-y-1">
                {tierBenefits[3].features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#64748B]">
                    <CheckIcon className="w-3 h-3 text-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Requirements</h3>
          <div className="space-y-3">
            {tierBenefits[3].requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#F8F9FF] rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-[#1E293B]">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setSelectedTier(0)} className="flex-1">
          Back to Tiers
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-[#5B52FF] text-white">
          Start Tier 3
        </Button>
      </div>
    </div>
  );

  const renderVerificationID = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileTextIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Additional ID Verification</h2>
        <p className="text-[#64748B]">Provide an additional government-issued ID</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                ID Type
              </label>
              <select
                value={kycData.idType}
                onChange={(e) => handleInputChange('idType', e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg"
              >
                {idTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                ID Number
              </label>
              <Input
                type="text"
                placeholder="Enter your ID number"
                value={kycData.verificationId}
                onChange={(e) => handleInputChange('verificationId', e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Upload ID Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#5B52FF] transition-colors">
                <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-[#64748B] mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#64748B]">
                  Supported formats: JPG, PNG, PDF (Max 5MB)
                </p>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleInputChange('addressDocument', file);
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!kycData.verificationId || !kycData.addressDocument}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderAddressVerification = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HomeIcon className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Address Verification</h2>
        <p className="text-[#64748B]">Upload a document to verify your residential address</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Document Type
              </label>
              <select
                value={kycData.addressVerificationMethod}
                onChange={(e) => handleInputChange('addressVerificationMethod', e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg"
              >
                {addressVerificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">
                Upload Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#5B52FF] transition-colors">
                <HomeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-[#64748B] mb-2">
                  Upload your address verification document
                </p>
                <p className="text-xs text-[#64748B] mb-4">
                  Document must be recent (within 3 months) and show your name and address clearly
                </p>
                <Button variant="outline">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900 mb-1">Document Requirements</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Document must be issued within the last 3 months</li>
                <li>• Your name and address must be clearly visible</li>
                <li>• Document must be in English or have certified translation</li>
                <li>• Ensure the document is not blurry or cut off</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1 bg-[#5B52FF] text-white"
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );

  const renderTier3Success = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <StarIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">⭐ Tier 3 Complete! ⭐</h2>
        <p className="text-[#64748B]">You now have premium access with maximum limits</p>
      </div>

      <Card className="mb-8 border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Premium Access Unlocked:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Maximum Limits</h4>
              <div className="space-y-1 text-sm text-purple-700">
                <div className="flex justify-between">
                  <span>Daily:</span>
                  <span className="font-medium">₦1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-medium">₦5,000,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Premium Features</h4>
              <ul className="space-y-1">
                {tierBenefits[3].features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-purple-700">
                    <CheckIcon className="w-3 h-3 text-purple-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleNext}
        className="w-full h-12 bg-[#5B52FF] text-white"
      >
        Continue to Tier Summary
      </Button>
    </div>
  );

  // Tier Summary
  const renderTierSummary = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
          <TrophyIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#1E293B] mb-2">Verification Summary</h2>
        <p className="text-[#64748B] text-lg">Your account verification status and available features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(tierBenefits).map(([tier, benefits]) => {
          const tierNum = parseInt(tier);
          const isCompleted = tierNum <= currentTier;
          const isJustCompleted = tierNum === selectedTier;
          
          return (
            <Card 
              key={tier}
              className={`${
                isJustCompleted ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' :
                isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {isCompleted ? (
                      <CheckIcon className="w-8 h-8 text-white" />
                    ) : (
                      <ShieldCheckIcon className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#1E293B] mb-1">{benefits.title}</h3>
                  <p className="text-sm text-[#64748B]">{benefits.subtitle}</p>
                  {isCompleted && (
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      {isJustCompleted ? 'Just Completed!' : 'Completed'}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-medium text-[#1E293B] mb-2 text-sm">Limits</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Daily:</span>
                        <span className="font-medium">{benefits.dailyLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Monthly:</span>
                        <span className="font-medium">{benefits.monthlyLimit}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#1E293B] mb-2 text-sm">Key Features</h4>
                    <ul className="space-y-1">
                      {benefits.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-[#64748B]">
                          <CheckIcon className={`w-3 h-3 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        {selectedTier < 3 ? (
          <div className="space-y-4">
            <p className="text-[#64748B]">
              Ready to unlock more features? Continue with the next tier verification.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
                className="px-8"
              >
                Continue to Dashboard
              </Button>
              <Button 
                onClick={() => {
                  setSelectedTier(selectedTier + 1);
                  setCurrentStep(1);
                }}
                className="bg-[#5B52FF] text-white px-8"
                disabled={selectedTier > currentTier + 1}
              >
                Start Tier {selectedTier + 1}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[#64748B] text-lg">
              🎉 Congratulations! You have completed all verification tiers and unlocked 
              the full potential of your SureBanker account.
            </p>
            <Button 
              onClick={() => {
                onClose();
                navigate('/dashboard');
              }}
              className="bg-[#5B52FF] text-white px-8 py-3 text-lg"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (selectedTier === 0) {
      return renderTierSelection();
    }

    if (selectedTier === 1) {
      switch (currentStep) {
        case 1: return renderTier1Requirements();
        case 2: return renderBVNVerification();
        case 3: return renderFaceVerification();
        case 4: return renderResidentialAddress();
        case 5: return renderSourceOfIncome();
        case 6: return renderSetPaymentPIN();
        case 7: return renderTier1Success();
        case 8: return renderTierSummary();
        default: return renderTier1Requirements();
      }
    }

    if (selectedTier === 2) {
      switch (currentStep) {
        case 1: return renderTier2Requirements();
        case 2: return renderNINVerification();
        case 3: return renderTier2Success();
        case 4: return renderTierSummary();
        default: return renderTier2Requirements();
      }
    }

    if (selectedTier === 3) {
      switch (currentStep) {
        case 1: return renderTier3Requirements();
        case 2: return renderVerificationID();
        case 3: return renderAddressVerification();
        case 4: return renderTier3Success();
        case 5: return renderTierSummary();
        default: return renderTier3Requirements();
      }
    }

    return renderTierSelection();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#1E293B]">KYC Verification</h1>
            {selectedTier > 0 && (
              <p className="text-sm text-[#64748B]">
                {tierBenefits[selectedTier as keyof typeof tierBenefits].title}
              </p>
            )}
          </div>
          <Button variant="ghost" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {selectedTier > 0 && renderStepIndicator()}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};