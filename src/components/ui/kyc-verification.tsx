import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Badge } from "./badge";
import { Avatar, AvatarFallback } from "./avatar";
import { 
  CheckIcon, 
  XIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  ShieldIcon, 
  UserIcon, 
  PhoneIcon, 
  MailIcon, 
  FileTextIcon, 
  CameraIcon, 
  UploadIcon, 
  CheckCircleIcon, 
  InfoIcon, 
  AlertTriangleIcon, 
  LockIcon, 
  BriefcaseIcon, 
  BuildingIcon, 
  DollarSignIcon
} from "lucide-react";
import CrownIcon from "./crown-icon";

interface KYCVerificationProps {
  isVisible: boolean;
  onClose: () => void;
  currentTier: number;
}

interface KYCTier {
  tier: string;
  title: string;
  description: string;
  limit: string;
  steps: KYCStep[];
}

interface KYCStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export const KYCVerification: React.FC<KYCVerificationProps> = ({ 
  isVisible, 
  onClose,
  currentTier = 0
}) => {
  const [activeTier, setActiveTier] = useState(currentTier);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    
    // Contact Information
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    
    // Identity Verification
    bvn: "",
    nin: "",
    
    // Document Verification
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
    selfie: null,
    
    // Employment & Income (Tier 3)
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    incomeProof: null,
    
    // Agreement
    termsAgreed: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset step when tier changes
  useEffect(() => {
    setCurrentStep(0);
  }, [activeTier]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible, onClose]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const currentTierData = kycTiers[activeTier];
    const currentStepData = currentTierData.steps[currentStep];
    const newErrors: Record<string, string> = {};
    
    // Validation logic based on current step
    switch (currentStepData.id) {
      case "personal-info":
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        break;
        
      case "contact-info":
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        break;
        
      case "identity-verification":
        if (!formData.bvn) newErrors.bvn = "BVN is required";
        else if (formData.bvn.length !== 11) newErrors.bvn = "BVN must be 11 digits";
        if (activeTier > 0 && !formData.nin) newErrors.nin = "NIN is required";
        break;
        
      case "document-upload":
        if (!formData.idType) newErrors.idType = "ID type is required";
        if (!formData.idNumber) newErrors.idNumber = "ID number is required";
        if (!formData.idFront) newErrors.idFront = "Front of ID is required";
        if (!formData.idBack) newErrors.idBack = "Back of ID is required";
        break;
        
      case "selfie-verification":
        if (!formData.selfie) newErrors.selfie = "Selfie is required";
        break;
        
      case "employment-info":
        if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required";
        if (formData.employmentStatus === "employed") {
          if (!formData.employerName) newErrors.employerName = "Employer name is required";
          if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
        }
        if (!formData.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required";
        break;
        
      case "agreement":
        if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      const currentTierData = kycTiers[activeTier];
      if (currentStep < currentTierData.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Last step of current tier
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsVerified(true);
      
      // If there are more tiers, move to the next one
      if (activeTier < kycTiers.length - 1) {
        setActiveTier(activeTier + 1);
      } else {
        // All tiers completed
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    }, 2000);
  };

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange(field, e.target.files[0]);
    }
  };

  // Define KYC tiers and steps
  const kycTiers: KYCTier[] = [
    {
      tier: "Tier 1",
      title: "Basic Verification",
      description: "Complete basic verification to access essential features",
      limit: "₦50,000",
      steps: [
        {
          id: "personal-info",
          title: "Personal Information",
          description: "Provide your basic personal details",
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">First Name</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Last Name</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Middle Name (Optional)</label>
                <Input
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                  placeholder="Enter your middle name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className={errors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className={`w-full px-3 py-2 border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-lg`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>
            </div>
          )
        },
        {
          id: "contact-info",
          title: "Contact Information",
          description: "Provide your contact details",
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter your city"
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">State</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enter your state"
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>
          )
        },
        {
          id: "identity-verification",
          title: "Identity Verification",
          description: "Verify your identity with BVN",
          component: (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Bank Verification Number (BVN)</label>
                <Input
                  type="number"
                  value={formData.bvn}
                  onChange={(e) => handleInputChange("bvn", e.target.value)}
                  placeholder="Enter your 11-digit BVN"
                  maxLength={11}
                  className={errors.bvn ? "border-red-500" : ""}
                />
                {errors.bvn && <p className="text-red-500 text-xs mt-1">{errors.bvn}</p>}
                <p className="text-xs text-[#64748B] mt-1">Your BVN is used to verify your identity and is kept secure</p>
              </div>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 flex items-start gap-3">
                  <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Why we need your BVN</p>
                    <p className="text-xs text-blue-700">Your BVN helps us verify your identity and protect your account from fraud. We only use it for verification and do not store the full details.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        },
        {
          id: "agreement",
          title: "Terms & Agreement",
          description: "Review and accept terms",
          component: (
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 max-h-60 overflow-y-auto">
                  <h4 className="font-semibold text-[#1E293B] mb-2">Terms of Service</h4>
                  <p className="text-sm text-[#64748B] mb-4">
                    By completing this verification process, you agree to the following terms:
                  </p>
                  <ul className="text-sm text-[#64748B] space-y-2 list-disc pl-5">
                    <li>You confirm that all information provided is accurate and belongs to you.</li>
                    <li>You authorize SureBanker to verify your information with relevant authorities.</li>
                    <li>You understand that providing false information may result in account suspension.</li>
                    <li>You agree to SureBanker's Privacy Policy regarding the handling of your personal data.</li>
                    <li>You understand that your verification level determines your transaction limits.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange("termsAgreed", e.target.checked)}
                  className={`mt-1 ${errors.termsAgreed ? "border-red-500" : ""}`}
                />
                <label htmlFor="terms-agreement" className="text-sm text-[#64748B]">
                  I confirm that the information provided is accurate and I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              {errors.termsAgreed && <p className="text-red-500 text-xs">{errors.termsAgreed}</p>}
            </div>
          )
        }
      ]
    },
    {
      tier: "Tier 2",
      title: "Advanced Verification",
      description: "Unlock higher transaction limits with additional verification",
      limit: "₦1,000,000",
      steps: [
        {
          id: "identity-verification",
          title: "Identity Verification",
          description: "Verify your identity with NIN",
          component: (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">National Identification Number (NIN)</label>
                <Input
                  type="number"
                  value={formData.nin}
                  onChange={(e) => handleInputChange("nin", e.target.value)}
                  placeholder="Enter your NIN"
                  className={errors.nin ? "border-red-500" : ""}
                />
                {errors.nin && <p className="text-red-500 text-xs mt-1">{errors.nin}</p>}
                <p className="text-xs text-[#64748B] mt-1">Your NIN is used for additional identity verification</p>
              </div>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 flex items-start gap-3">
                  <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Why we need your NIN</p>
                    <p className="text-xs text-blue-700">Your NIN provides an additional layer of identity verification required for Tier 2 access, allowing higher transaction limits.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        },
        {
          id: "document-upload",
          title: "Document Verification",
          description: "Upload your identification documents",
          component: (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">ID Type</label>
                <select
                  value={formData.idType}
                  onChange={(e) => handleInputChange("idType", e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.idType ? "border-red-500" : "border-gray-300"} rounded-lg`}
                >
                  <option value="">Select ID type</option>
                  <option value="national_id">National ID Card</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="passport">International Passport</option>
                  <option value="voters_card">Voter's Card</option>
                </select>
                {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">ID Number</label>
                <Input
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="Enter your ID number"
                  className={errors.idNumber ? "border-red-500" : ""}
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Front of ID</label>
                  <div className={`border-2 border-dashed ${errors.idFront ? "border-red-500" : "border-gray-300"} rounded-lg p-4 text-center`}>
                    {formData.idFront ? (
                      <div className="flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">File uploaded</span>
                      </div>
                    ) : (
                      <div>
                        <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-[#64748B]">Click to upload or drag and drop</p>
                        <p className="text-xs text-[#64748B] mt-1">PNG, JPG or PDF (max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      onChange={(e) => handleFileUpload("idFront", e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {errors.idFront && <p className="text-red-500 text-xs mt-1">{errors.idFront}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-1">Back of ID</label>
                  <div className={`border-2 border-dashed ${errors.idBack ? "border-red-500" : "border-gray-300"} rounded-lg p-4 text-center`}>
                    {formData.idBack ? (
                      <div className="flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">File uploaded</span>
                      </div>
                    ) : (
                      <div>
                        <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-[#64748B]">Click to upload or drag and drop</p>
                        <p className="text-xs text-[#64748B] mt-1">PNG, JPG or PDF (max 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      onChange={(e) => handleFileUpload("idBack", e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  {errors.idBack && <p className="text-red-500 text-xs mt-1">{errors.idBack}</p>}
                </div>
              </div>
            </div>
          )
        },
        {
          id: "selfie-verification",
          title: "Selfie Verification",
          description: "Take a selfie for facial verification",
          component: (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`border-2 border-dashed ${errors.selfie ? "border-red-500" : "border-gray-300"} rounded-lg p-6 mx-auto max-w-sm`}>
                  {formData.selfie ? (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <CheckCircleIcon className="w-12 h-12 text-green-500" />
                      </div>
                      <p className="text-green-600 font-medium">Selfie captured successfully</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => handleInputChange("selfie", null)}
                      >
                        Retake Selfie
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <CameraIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <p className="text-[#1E293B] font-medium mb-2">Take a Selfie</p>
                      <p className="text-sm text-[#64748B] mb-4">Make sure your face is clearly visible and well-lit</p>
                      <Button 
                        className="bg-[#5B52FF] text-white"
                        onClick={() => handleInputChange("selfie", "captured")}
                      >
                        <CameraIcon className="w-4 h-4 mr-2" />
                        Capture Selfie
                      </Button>
                    </div>
                  )}
                </div>
                {errors.selfie && <p className="text-red-500 text-xs mt-1">{errors.selfie}</p>}
              </div>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Selfie Guidelines:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Ensure your face is clearly visible
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Use good lighting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Remove sunglasses or hats
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      Use a neutral expression
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="w-4 h-4 text-red-500" />
                      No filters or editing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )
        },
        {
          id: "agreement",
          title: "Terms & Agreement",
          description: "Review and accept terms",
          component: (
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 max-h-60 overflow-y-auto">
                  <h4 className="font-semibold text-[#1E293B] mb-2">Tier 2 Verification Agreement</h4>
                  <p className="text-sm text-[#64748B] mb-4">
                    By completing Tier 2 verification, you agree to the following terms:
                  </p>
                  <ul className="text-sm text-[#64748B] space-y-2 list-disc pl-5">
                    <li>You confirm that all documents provided are authentic and belong to you.</li>
                    <li>You authorize SureBanker to verify your identity documents with issuing authorities.</li>
                    <li>You understand that your daily transaction limit will be increased to ₦1,000,000.</li>
                    <li>You agree to notify SureBanker immediately if your ID is lost, stolen, or compromised.</li>
                    <li>You understand that misrepresentation may result in account suspension and legal action.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-agreement-tier2"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange("termsAgreed", e.target.checked)}
                  className={`mt-1 ${errors.termsAgreed ? "border-red-500" : ""}`}
                />
                <label htmlFor="terms-agreement-tier2" className="text-sm text-[#64748B]">
                  I confirm that all documents are authentic and I agree to the Tier 2 verification terms
                </label>
              </div>
              {errors.termsAgreed && <p className="text-red-500 text-xs">{errors.termsAgreed}</p>}
            </div>
          )
        }
      ]
    },
    {
      tier: "Tier 3",
      title: "Premium Verification",
      description: "Unlock maximum transaction limits and premium features",
      limit: "₦5,000,000",
      steps: [
        {
          id: "employment-info",
          title: "Employment & Income",
          description: "Provide your employment and income details",
          component: (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.employmentStatus ? "border-red-500" : "border-gray-300"} rounded-lg`}
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="student">Student</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors.employmentStatus}</p>}
              </div>
              
              {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-1">
                      {formData.employmentStatus === "employed" ? "Employer Name" : "Business Name"}
                    </label>
                    <Input
                      value={formData.employerName}
                      onChange={(e) => handleInputChange("employerName", e.target.value)}
                      placeholder={formData.employmentStatus === "employed" ? "Enter employer name" : "Enter business name"}
                      className={errors.employerName ? "border-red-500" : ""}
                    />
                    {errors.employerName && <p className="text-red-500 text-xs mt-1">{errors.employerName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-1">
                      {formData.employmentStatus === "employed" ? "Job Title" : "Business Type"}
                    </label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      placeholder={formData.employmentStatus === "employed" ? "Enter job title" : "Enter business type"}
                      className={errors.jobTitle ? "border-red-500" : ""}
                    />
                    {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Monthly Income (₦)</label>
                <Input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  placeholder="Enter your monthly income"
                  className={errors.monthlyIncome ? "border-red-500" : ""}
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-1">Income Proof Document</label>
                <div className={`border-2 border-dashed ${errors.incomeProof ? "border-red-500" : "border-gray-300"} rounded-lg p-4 text-center`}>
                  {formData.incomeProof ? (
                    <div className="flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">File uploaded</span>
                    </div>
                  ) : (
                    <div>
                      <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-[#64748B]">Upload bank statement, pay slip, or tax document</p>
                      <p className="text-xs text-[#64748B] mt-1">PDF or image file (max 10MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={(e) => handleFileUpload("incomeProof", e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errors.incomeProof && <p className="text-red-500 text-xs mt-1">{errors.incomeProof}</p>}
              </div>
            </div>
          )
        },
        {
          id: "agreement",
          title: "Terms & Agreement",
          description: "Review and accept terms",
          component: (
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 max-h-60 overflow-y-auto">
                  <h4 className="font-semibold text-[#1E293B] mb-2">Tier 3 Verification Agreement</h4>
                  <p className="text-sm text-[#64748B] mb-4">
                    By completing Tier 3 verification, you agree to the following terms:
                  </p>
                  <ul className="text-sm text-[#64748B] space-y-2 list-disc pl-5">
                    <li>You confirm that all financial information provided is accurate and current.</li>
                    <li>You authorize SureBanker to verify your income and employment details.</li>
                    <li>You understand that your daily transaction limit will be increased to ₦5,000,000.</li>
                    <li>You agree to provide updated information if your financial situation changes significantly.</li>
                    <li>You understand that Tier 3 verification may require periodic review and re-verification.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-agreement-tier3"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange("termsAgreed", e.target.checked)}
                  className={`mt-1 ${errors.termsAgreed ? "border-red-500" : ""}`}
                />
                <label htmlFor="terms-agreement-tier3" className="text-sm text-[#64748B]">
                  I confirm that all financial information is accurate and I agree to the Tier 3 verification terms
                </label>
              </div>
              {errors.termsAgreed && <p className="text-red-500 text-xs">{errors.termsAgreed}</p>}
            </div>
          )
        }
      ]
    }
  ];

  if (!isVisible) return null;

  const currentTierData = kycTiers[activeTier];
  const currentStepData = currentTierData.steps[currentStep];
  const totalSteps = currentTierData.steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white">
                <ShieldIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">KYC Verification</h2>
                <p className="text-sm text-[#64748B]">Complete verification to unlock features</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {kycTiers.map((tier, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center ${
                  index < activeTier ? 'opacity-50' : 
                  index === activeTier ? 'opacity-100' : 
                  'opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index < activeTier ? 'bg-green-500 text-white' : 
                  index === activeTier ? 'bg-[#5B52FF] text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index < activeTier ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <div className="flex items-center">
                      <CrownIcon className="w-6 h-6" />
                      <span className="ml-1 text-xs">{index + 1}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium mt-2">{tier.tier}</p>
                <Badge className={`mt-1 ${
                  index < activeTier ? 'bg-green-100 text-green-800' : 
                  index === activeTier ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {tier.limit}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isVerified ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">
                {activeTier < kycTiers.length ? `${currentTierData.tier} Verification Complete!` : "All Verifications Complete!"}
              </h3>
              <p className="text-[#64748B] mb-6">
                {activeTier < kycTiers.length 
                  ? `You've successfully completed ${currentTierData.tier} verification. Let's continue to the next tier.`
                  : "You've successfully completed all verification tiers. You now have full access to all features!"}
              </p>
              
              {activeTier < kycTiers.length ? (
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={() => setIsVerified(false)}
                >
                  Continue to {kycTiers[activeTier].tier}
                </Button>
              ) : (
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={onClose}
                >
                  Return to Dashboard
                </Button>
              )}
            </div>
          ) : isProcessing ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <LockIcon className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Verifying Your Information</h3>
              <p className="text-[#64748B] mb-6">Please wait while we verify your information...</p>
              
              <div className="max-w-md mx-auto">
                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div className="h-2 bg-[#5B52FF] rounded-full animate-pulse" style={{ width: "70%" }}></div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-[#64748B]">
                  <span>Validating data</span>
                  <span>Almost done</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">{currentStepData.title}</h3>
                <p className="text-[#64748B]">{currentStepData.description}</p>
              </div>
              
              {/* Step Progress Indicator */}
              <div className="flex items-center mb-6">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <React.Fragment key={index}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index < currentStep 
                        ? "bg-green-500 text-white" 
                        : index === currentStep
                        ? "bg-[#5B52FF] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {index < currentStep ? <CheckIcon className="w-4 h-4" /> : index + 1}
                    </div>
                    {index < totalSteps - 1 && (
                      <div className={`flex-1 h-1 ${
                        index < currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Step Content */}
              {currentStepData.component}
            </>
          )}
        </div>

        {/* Footer */}
        {!isVerified && !isProcessing && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={currentStep === 0 ? onClose : handlePrevious}
              >
                {currentStep === 0 ? "Cancel" : (
                  <>
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back
                  </>
                )}
              </Button>
              <Button 
                className="bg-[#5B52FF] text-white"
                onClick={handleNext}
              >
                {isLastStep ? "Submit" : "Continue"}
                {!isLastStep && <ArrowRightIcon className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};