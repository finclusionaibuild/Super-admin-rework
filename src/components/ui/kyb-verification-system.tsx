import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { 
  XIcon, 
  CheckIcon, 
  AlertTriangleIcon, 
  FileTextIcon, 
  UploadIcon, 
  UserIcon, 
  BuildingIcon, 
  ShieldIcon, 
  CameraIcon, 
  VideoIcon, 
  ClockIcon, 
  InfoIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  CopyIcon, 
  ShareIcon, 
  DownloadIcon, 
  EyeIcon, 
  EditIcon, 
  PlusIcon, 
  MinusIcon, 
  CalendarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  GlobeIcon, 
  DollarSignIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  CreditCardIcon, 
  BarChart3Icon, 
  LockIcon, 
  UnlockIcon, 
  RefreshCwIcon, 
  SearchIcon, 
  FilterIcon, 
  MoreHorizontalIcon, 
  ChevronRightIcon, 
  ChevronDownIcon, 
  StarIcon, 
  AwardIcon, 
  ShieldCheckIcon, 
  AlertCircleIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from 'lucide-react';

interface KYBTier {
  tier: number;
  name: string;
  description: string;
  transactionLimit: string;
  features: string[];
  requirements: string[];
  status: 'not_started' | 'in_progress' | 'completed' | 'rejected' | 'under_review';
  completedSteps: number;
  totalSteps: number;
}

interface BusinessInfo {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  foundedYear: string;
  employees: number;
}

interface UBOInfo {
  id: string;
  name: string;
  role: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  ownershipPercentage: number;
  documents: string[];
  kycStatus: 'pending' | 'verified' | 'rejected';
}

interface KYBVerificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onTierUpgrade: (tier: number) => void;
}

export const KYBVerificationSystem: React.FC<KYBVerificationSystemProps> = ({
  isOpen,
  onClose,
  currentTier,
  onTierUpgrade
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(currentTier + 1);
  const [currentStep, setCurrentStep] = useState(1);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    registrationNumber: '',
    taxId: '',
    country: 'Nigeria',
    address: '',
    phone: '',
    email: '',
    website: '',
    industry: '',
    foundedYear: '',
    employees: 0
  });
  const [ubos, setUbos] = useState<UBOInfo[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kybTiers: KYBTier[] = [
    {
      tier: 1,
      name: 'Basic Business Verification',
      description: 'Establish minimum business identity for initial account activation',
      transactionLimit: '₦500,000 daily',
      features: [
        'Basic business operations',
        'Limited transaction amounts',
        'Standard payment processing',
        'Basic reporting'
      ],
      requirements: [
        'Business Registration Certificate',
        'Valid Business License',
        'Proof of Business Address',
        'Director/UBO Information',
        'Primary Contact Setup'
      ],
      status: currentTier >= 1 ? 'completed' : 'not_started',
      completedSteps: currentTier >= 1 ? 9 : 0,
      totalSteps: 9
    },
    {
      tier: 2,
      name: 'Enhanced Business Verification',
      description: 'Gather regulatory and financial information for higher transaction limits',
      transactionLimit: '₦5,000,000 daily',
      features: [
        'Higher transaction limits',
        'Bulk transfer capabilities',
        'Advanced reporting',
        'Multi-user access',
        'API access'
      ],
      requirements: [
        'Corporate Structure Chart',
        'Bank Statements (3-6 months)',
        'Tax Compliance Certificate',
        'Shareholder Register',
        'Business Operations Details',
        'Enhanced UBO Verification'
      ],
      status: currentTier >= 2 ? 'completed' : currentTier === 1 ? 'not_started' : 'not_started',
      completedSteps: currentTier >= 2 ? 9 : 0,
      totalSteps: 9
    },
    {
      tier: 3,
      name: 'Full Business Verification',
      description: 'Meet stringent requirements for unlimited usage and advanced features',
      transactionLimit: 'Unlimited',
      features: [
        'Unlimited transaction limits',
        'Advanced fintech features',
        'Priority support',
        'Custom integrations',
        'Regulatory compliance tools',
        'Advanced analytics'
      ],
      requirements: [
        'Audited Financial Statements',
        'Comprehensive Ownership Disclosure',
        'AML/CFT Policies',
        'Site Visit/Video Verification',
        'Regulatory Compliance',
        'Enhanced Due Diligence'
      ],
      status: currentTier >= 3 ? 'completed' : currentTier === 2 ? 'not_started' : 'not_started',
      completedSteps: currentTier >= 3 ? 9 : 0,
      totalSteps: 9
    }
  ];

  const businessTypes = [
    'Limited Liability Company (LLC)',
    'Corporation',
    'Partnership',
    'Sole Proprietorship',
    'Non-Profit Organization',
    'Government Entity',
    'Other'
  ];

  const industries = [
    'Technology',
    'Financial Services',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Agriculture',
    'Transportation',
    'Energy',
    'Other'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedDocuments(prev => [...prev, ...fileNames]);
    }
  };

  const addUBO = () => {
    const newUBO: UBOInfo = {
      id: Date.now().toString(),
      name: '',
      role: '',
      dateOfBirth: '',
      nationality: '',
      idNumber: '',
      ownershipPercentage: 0,
      documents: [],
      kycStatus: 'pending'
    };
    setUbos([...ubos, newUBO]);
  };

  const updateUBO = (id: string, field: keyof UBOInfo, value: any) => {
    setUbos(ubos.map(ubo => 
      ubo.id === id ? { ...ubo, [field]: value } : ubo
    ));
  };

  const removeUBO = (id: string) => {
    setUbos(ubos.filter(ubo => ubo.id !== id));
  };

  const handleSubmitTier = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onTierUpgrade(selectedTier);
      setIsSubmitting(false);
      onClose();
    }, 3000);
  };

  const getStepTitle = (tier: number, step: number) => {
    const stepTitles = {
      1: [
        'Requirements Overview',
        'Business Registration Details',
        'Document Upload',
        'UBO & Director Details',
        'Business Contact Setup',
        'Review & Confirmation',
        'Automated Screening',
        'Account Activation',
        'Success & Dashboard'
      ],
      2: [
        'Enhanced Requirements',
        'Expanded Documentation',
        'Corporate Structure',
        'Financial Information',
        'Operations Questionnaire',
        'Risk Assessment',
        'Enhanced Verification',
        'Internal Review',
        'Account Upgrade'
      ],
      3: [
        'Premium Requirements',
        'Audit & Financial Statements',
        'Ownership Disclosure',
        'Enhanced Due Diligence',
        'Site Visit/Interview',
        'Regulatory Integration',
        'Final Compliance Review',
        'Full Account Activation',
        'Ongoing Monitoring Setup'
      ]
    };
    return stepTitles[tier as keyof typeof stepTitles]?.[step - 1] || `Step ${step}`;
  };

  const renderTierOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Business Verification (KYB)</h2>
        <p className="text-[#64748B]">Choose your verification tier to unlock business features</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {kybTiers.map((tier) => (
          <Card 
            key={tier.tier}
            className={`cursor-pointer transition-all ${
              selectedTier === tier.tier 
                ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' 
                : tier.status === 'completed'
                ? 'border-green-200 bg-green-50'
                : 'hover:shadow-md'
            }`}
            onClick={() => tier.status !== 'completed' && setSelectedTier(tier.tier)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    tier.status === 'completed' 
                      ? 'bg-green-500 text-white'
                      : selectedTier === tier.tier
                      ? 'bg-[#5B52FF] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tier.status === 'completed' ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">T{tier.tier}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E293B]">{tier.name}</h3>
                    <p className="text-sm text-[#64748B]">{tier.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    tier.status === 'completed' ? 'bg-green-100 text-green-800' :
                    tier.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    tier.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    tier.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {tier.status === 'completed' ? 'Completed' :
                     tier.status === 'in_progress' ? 'In Progress' :
                     tier.status === 'under_review' ? 'Under Review' :
                     tier.status === 'rejected' ? 'Rejected' :
                     'Not Started'}
                  </Badge>
                  <p className="text-sm font-medium text-[#1E293B] mt-1">{tier.transactionLimit}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-2">Features Unlocked:</h4>
                  <ul className="text-sm text-[#64748B] space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckIcon className="w-3 h-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-2">Requirements:</h4>
                  <ul className="text-sm text-[#64748B] space-y-1">
                    {tier.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FileTextIcon className="w-3 h-3 text-blue-600" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {tier.status !== 'completed' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className="bg-[#5B52FF] h-2 rounded-full" 
                        style={{ width: `${(tier.completedSteps / tier.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#64748B]">
                      {tier.completedSteps}/{tier.totalSteps} steps
                    </span>
                  </div>
                  {tier.tier <= currentTier + 1 && (
                    <Button 
                      className="bg-[#5B52FF] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTier(tier.tier);
                        setCurrentStep(1);
                      }}
                    >
                      {tier.status === 'not_started' ? 'Start Verification' : 'Continue'}
                    </Button>
                  )}
                </div>
              )}

              {tier.status === 'completed' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="font-medium">Verification Complete</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStepIndicator = () => {
    const currentTierData = kybTiers.find(t => t.tier === selectedTier);
    if (!currentTierData) return null;

    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          {Array.from({ length: currentTierData.totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? "bg-[#5B52FF] text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                {step < currentStep ? <CheckIcon className="w-4 h-4" /> : step}
              </div>
              {step < currentTierData.totalSteps && (
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

  // Tier 1 Steps
  const renderTier1Step1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Tier 1: Basic Business Verification</h3>
        <p className="text-[#64748B]">Complete these requirements to activate your business account</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-4">What You'll Need:</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Documents:</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Certificate of Incorporation/Registration</li>
                <li>• Valid Business License</li>
                <li>• Proof of Business Address</li>
                <li>• Director/UBO Government IDs</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Information:</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Business registration details</li>
                <li>• Director and UBO information</li>
                <li>• Primary contact setup</li>
                <li>• Business address verification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-green-900 mb-4">Tier 1 Benefits:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-700">• Daily limit: ₦500,000</p>
              <p className="text-sm text-green-700">• Basic business operations</p>
              <p className="text-sm text-green-700">• Standard payment processing</p>
            </div>
            <div>
              <p className="text-sm text-green-700">• Basic reporting</p>
              <p className="text-sm text-green-700">• Customer support</p>
              <p className="text-sm text-green-700">• Secure transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-[#64748B] mb-4">
          Estimated completion time: 15-30 minutes
        </p>
        <Button 
          onClick={() => setCurrentStep(2)}
          className="bg-[#5B52FF] text-white px-8 py-3"
        >
          Start Tier 1 Verification
        </Button>
      </div>
    </div>
  );

  const renderTier1Step2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Business Registration Details</h3>
        <p className="text-[#64748B]">Provide your business registration information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Name *</label>
          <Input
            value={businessInfo.businessName}
            onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
            placeholder="Enter registered business name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Type *</label>
          <select 
            value={businessInfo.businessType}
            onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select business type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Registration Number *</label>
          <Input
            value={businessInfo.registrationNumber}
            onChange={(e) => setBusinessInfo({...businessInfo, registrationNumber: e.target.value})}
            placeholder="e.g., RC123456"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Tax ID</label>
          <Input
            value={businessInfo.taxId}
            onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})}
            placeholder="Enter tax identification number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Country of Registration *</label>
          <select 
            value={businessInfo.country}
            onChange={(e) => setBusinessInfo({...businessInfo, country: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Industry *</label>
          <select 
            value={businessInfo.industry}
            onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Address *</label>
          <Input
            value={businessInfo.address}
            onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
            placeholder="Enter complete business address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Phone *</label>
          <Input
            value={businessInfo.phone}
            onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
            placeholder="+234 xxx xxx xxxx"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Email *</label>
          <Input
            value={businessInfo.email}
            onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
            placeholder="business@company.com"
          />
        </div>
      </div>
    </div>
  );

  const renderTier1Step3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Business Document Upload</h3>
        <p className="text-[#64748B]">Upload required business documents</p>
      </div>

      <div className="space-y-6">
        {[
          { name: 'Certificate of Incorporation/Registration', required: true },
          { name: 'Valid Business License', required: true },
          { name: 'Proof of Business Address', required: true },
          { name: 'Tax Registration Certificate', required: false }
        ].map((doc, index) => (
          <Card key={index} className="border-dashed border-2 border-gray-300 hover:border-[#5B52FF] transition-colors">
            <CardContent className="p-6">
              <div className="text-center">
                <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-medium text-[#1E293B] mb-2">
                  {doc.name} {doc.required && <span className="text-red-500">*</span>}
                </h4>
                <p className="text-sm text-[#64748B] mb-4">
                  Upload clear, high-quality images or PDF files
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id={`upload-${index}`}
                  multiple
                />
                <label htmlFor={`upload-${index}`}>
                  <Button className="bg-[#5B52FF] text-white cursor-pointer">
                    Choose Files
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {uploadedDocuments.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-900 mb-2">Uploaded Documents:</h4>
            <div className="space-y-2">
              {uploadedDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-green-700">{doc}</span>
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTier1Step4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Ultimate Beneficial Owners & Directors</h3>
        <p className="text-[#64748B]">Provide information for all directors and beneficial owners</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Who needs to be included?</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• All directors and officers</li>
                <li>• Anyone owning 25% or more of the business</li>
                <li>• Anyone with significant control or influence</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {ubos.map((ubo, index) => (
          <Card key={ubo.id} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-[#1E293B]">Person {index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeUBO(ubo.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Full Name *</label>
                  <Input
                    value={ubo.name}
                    onChange={(e) => updateUBO(ubo.id, 'name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Role/Position *</label>
                  <Input
                    value={ubo.role}
                    onChange={(e) => updateUBO(ubo.id, 'role', e.target.value)}
                    placeholder="e.g., Director, CEO, Owner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Date of Birth *</label>
                  <Input
                    type="date"
                    value={ubo.dateOfBirth}
                    onChange={(e) => updateUBO(ubo.id, 'dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Nationality *</label>
                  <Input
                    value={ubo.nationality}
                    onChange={(e) => updateUBO(ubo.id, 'nationality', e.target.value)}
                    placeholder="Enter nationality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">ID Number *</label>
                  <Input
                    value={ubo.idNumber}
                    onChange={(e) => updateUBO(ubo.id, 'idNumber', e.target.value)}
                    placeholder="Government ID number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Ownership % *</label>
                  <Input
                    type="number"
                    value={ubo.ownershipPercentage}
                    onChange={(e) => updateUBO(ubo.id, 'ownershipPercentage', Number(e.target.value))}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Upload ID Document *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-[#64748B]">Upload government-issued ID or passport</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id={`ubo-upload-${ubo.id}`}
                  />
                  <label htmlFor={`ubo-upload-${ubo.id}`}>
                    <Button className="mt-2 bg-[#5B52FF] text-white cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          onClick={addUBO}
          variant="outline"
          className="w-full h-12 border-dashed border-2"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Another Person
        </Button>
      </div>
    </div>
  );

  const renderTier1Step5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Business Account Contact</h3>
        <p className="text-[#64748B]">Set up the primary contact for this business account</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Primary Contact Name *</label>
              <Input placeholder="Enter contact person name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Position/Title *</label>
              <Input placeholder="e.g., CEO, Finance Manager" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Email Address *</label>
              <Input type="email" placeholder="contact@business.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone Number *</label>
              <Input placeholder="+234 xxx xxx xxxx" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Primary Contact Responsibilities</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Receive account notifications and updates</li>
                <li>• Authorize high-value transactions</li>
                <li>• Manage user access and permissions</li>
                <li>• Handle compliance and regulatory communications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTier1Step6 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Review & Confirmation</h3>
        <p className="text-[#64748B]">Please review all information before submission</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-[#1E293B] mb-4">Business Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Business Name:</span>
                <span className="font-medium">{businessInfo.businessName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Business Type:</span>
                <span className="font-medium">{businessInfo.businessType || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Registration Number:</span>
                <span className="font-medium">{businessInfo.registrationNumber || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Industry:</span>
                <span className="font-medium">{businessInfo.industry || 'Not provided'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-[#1E293B] mb-4">Directors & UBOs</h4>
            <div className="space-y-3">
              {ubos.length > 0 ? ubos.map((ubo, index) => (
                <div key={ubo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#1E293B]">{ubo.name || `Person ${index + 1}`}</p>
                    <p className="text-sm text-[#64748B]">{ubo.role} • {ubo.ownershipPercentage}%</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {ubo.kycStatus}
                  </Badge>
                </div>
              )) : (
                <p className="text-[#64748B] text-center py-4">No directors/UBOs added</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-[#1E293B] mb-4">Uploaded Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            {uploadedDocuments.length > 0 ? uploadedDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <FileTextIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">{doc}</span>
                <CheckIcon className="w-4 h-4 text-green-600 ml-auto" />
              </div>
            )) : (
              <p className="text-[#64748B] text-center py-4 col-span-2">No documents uploaded</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Before You Submit</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure all information is accurate and up-to-date</li>
                <li>• All required documents have been uploaded</li>
                <li>• Director/UBO information is complete</li>
                <li>• You have authority to submit on behalf of the business</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTier1Step7 = () => (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <SearchIcon className="w-10 h-10 text-blue-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Automated Screening in Progress</h3>
        <p className="text-[#64748B]">We're performing security and compliance checks</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Business registration verification</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Document authenticity check</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">Sanctions and PEP screening</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <ClockIcon className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">Final compliance review</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-[#64748B]">
        This process typically takes 2-5 minutes. Please do not close this window.
      </p>
    </div>
  );

  const renderTier1Step8 = () => (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
        <CheckIcon className="w-10 h-10 text-white" />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Tier 1 Verification Complete!</h3>
        <p className="text-[#64748B]">Your business account has been activated with Tier 1 privileges</p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-green-900 mb-4">Account Activated - Tier 1</h4>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <h5 className="font-medium text-green-800 mb-2">Available Features:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Basic business operations</li>
                <li>• Standard payment processing</li>
                <li>• Basic reporting</li>
                <li>• Customer support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-800 mb-2">Account Limits:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Daily limit: ₦500,000</li>
                <li>• Monthly limit: ₦10,000,000</li>
                <li>• Single transaction: ₦100,000</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-4">Ready for Tier 2?</h4>
          <p className="text-sm text-blue-700 mb-4">
            Upgrade to Tier 2 to unlock higher limits (₦5,000,000 daily) and advanced features like bulk transfers and API access.
          </p>
          <Button 
            className="bg-blue-600 text-white"
            onClick={() => {
              setSelectedTier(2);
              setCurrentStep(1);
            }}
          >
            Start Tier 2 Verification
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Tier 2 Steps (Enhanced Verification)
  const renderTier2Step1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Tier 2: Enhanced Business Verification</h3>
        <p className="text-[#64748B]">Unlock higher limits and advanced business features</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-4">Additional Requirements for Tier 2:</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Financial Documents:</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Bank statements (3-6 months)</li>
                <li>• Tax compliance certificate</li>
                <li>• Financial projections</li>
                <li>• Auditor information</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-800 mb-2">Corporate Information:</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Corporate structure chart</li>
                <li>• Shareholder register</li>
                <li>• Board resolution</li>
                <li>• Enhanced UBO verification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-green-900 mb-4">Tier 2 Benefits:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-700">• Daily limit: ₦5,000,000</p>
              <p className="text-sm text-green-700">• Bulk transfer capabilities</p>
              <p className="text-sm text-green-700">• Advanced reporting</p>
            </div>
            <div>
              <p className="text-sm text-green-700">• Multi-user access</p>
              <p className="text-sm text-green-700">• API access</p>
              <p className="text-sm text-green-700">• Priority support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tier 3 Steps (Full Verification)
  const renderTier3Step1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">Tier 3: Full Business Verification</h3>
        <p className="text-[#64748B]">Unlock unlimited features and premium business capabilities</p>
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-purple-900 mb-4">Premium Requirements for Tier 3:</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Advanced Documentation:</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Audited financial statements</li>
                <li>• AML/CFT policies</li>
                <li>• Regulatory compliance certificates</li>
                <li>• External auditor reports</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Enhanced Verification:</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Site visit or video verification</li>
                <li>• Comprehensive ownership disclosure</li>
                <li>• Enhanced due diligence</li>
                <li>• Regulatory integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-yellow-900 mb-4">Tier 3 Premium Benefits:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-yellow-700">• Unlimited transaction limits</p>
              <p className="text-sm text-yellow-700">• Advanced fintech features</p>
              <p className="text-sm text-yellow-700">• Custom integrations</p>
            </div>
            <div>
              <p className="text-sm text-yellow-700">• Dedicated account manager</p>
              <p className="text-sm text-yellow-700">• Regulatory compliance tools</p>
              <p className="text-sm text-yellow-700">• Advanced analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    if (selectedTier === 1) {
      switch (currentStep) {
        case 1: return renderTier1Step1();
        case 2: return renderTier1Step2();
        case 3: return renderTier1Step3();
        case 4: return renderTier1Step4();
        case 5: return renderTier1Step5();
        case 6: return renderTier1Step6();
        case 7: return renderTier1Step7();
        case 8: return renderTier1Step8();
        default: return renderTier1Step1();
      }
    } else if (selectedTier === 2) {
      switch (currentStep) {
        case 1: return renderTier2Step1();
        default: return renderTier2Step1();
      }
    } else if (selectedTier === 3) {
      switch (currentStep) {
        case 1: return renderTier3Step1();
        default: return renderTier3Step1();
      }
    }
    return renderTierOverview();
  };

  const canProceedToNextStep = () => {
    if (selectedTier === 1) {
      switch (currentStep) {
        case 2: return businessInfo.businessName && businessInfo.businessType && businessInfo.registrationNumber;
        case 4: return ubos.length > 0 && ubos.every(ubo => ubo.name && ubo.role);
        default: return true;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    const currentTierData = kybTiers.find(t => t.tier === selectedTier);
    if (currentStep < (currentTierData?.totalSteps || 9)) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitTier();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedTier(0); // Go back to tier overview
      setCurrentStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#1E293B]">
              {selectedTier > 0 ? `Tier ${selectedTier} Verification` : 'KYB Verification'}
            </h2>
            {selectedTier > 0 && (
              <p className="text-sm text-[#64748B]">
                {getStepTitle(selectedTier, currentStep)}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {selectedTier > 0 && renderStepIndicator()}
          
          {selectedTier === 0 ? renderTierOverview() : renderCurrentStep()}

          {selectedTier > 0 && currentStep > 0 && currentStep < 8 && (
            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                className="flex-1"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleNextStep}
                disabled={!canProceedToNextStep() || isSubmitting}
                className="flex-1 bg-[#5B52FF] text-white"
              >
                {isSubmitting ? 'Processing...' : 
                 currentStep === 8 ? 'Complete Verification' : 'Continue'}
                {!isSubmitting && <ArrowRightIcon className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};