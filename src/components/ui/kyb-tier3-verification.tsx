import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Input } from './input';
import { Badge } from './badge';
import { 
  XIcon, 
  CheckIcon, 
  UploadIcon, 
  BuildingIcon, 
  FileTextIcon, 
  ShieldIcon,
  UserIcon,
  CreditCardIcon
} from 'lucide-react';

interface KYBTier3VerificationProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onUpgrade: (tier: number) => void;
}

export const KYBTier3Verification: React.FC<KYBTier3VerificationProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNumber: '',
    taxId: '',
    businessAddress: '',
    businessType: '',
    industry: '',
    incorporationDate: '',
    directorName: '',
    directorId: '',
    directorAddress: '',
    bankStatement: null,
    registrationDoc: null,
    taxClearance: null,
    utilityBill: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      onUpgrade(3);
    }, 3000);
  };

  const handleClose = () => {
    onClose();
    // Reset form if needed
    if (isVerified) {
      setCurrentStep(1);
      setIsVerified(false);
    }
  };

  if (!isOpen) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step < currentStep 
                ? "bg-green-500 text-white" 
                : step === currentStep
                ? "bg-[#5B52FF] text-white"
                : "bg-gray-200 text-gray-500"
            }`}>
              {step < currentStep ? <CheckIcon className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-0.5 ${
                step < currentStep ? "bg-green-500" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBusinessInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Name *</label>
        <Input
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          placeholder="Enter registered business name"
          className="h-12"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Registration Number *</label>
          <Input
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="RC12345678"
            className="h-12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Tax ID *</label>
          <Input
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            placeholder="Enter TIN"
            className="h-12"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Address *</label>
        <Input
          value={formData.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
          placeholder="Enter full business address"
          className="h-12"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Type *</label>
          <select 
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select business type</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Limited Liability Company">Limited Liability Company</option>
            <option value="Public Limited Company">Public Limited Company</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Industry *</label>
          <select 
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Date of Incorporation *</label>
        <Input
          type="date"
          value={formData.incorporationDate}
          onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
          className="h-12"
        />
      </div>
    </div>
  );

  const renderDirectorInfoStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Director Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Director's Full Name *</label>
        <Input
          value={formData.directorName}
          onChange={(e) => handleInputChange('directorName', e.target.value)}
          placeholder="Enter director's full name"
          className="h-12"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Director's ID Number *</label>
        <Input
          value={formData.directorId}
          onChange={(e) => handleInputChange('directorId', e.target.value)}
          placeholder="NIN, BVN, or Passport Number"
          className="h-12"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Director's Address *</label>
        <Input
          value={formData.directorAddress}
          onChange={(e) => handleInputChange('directorAddress', e.target.value)}
          placeholder="Enter director's residential address"
          className="h-12"
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ShieldIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Director Verification</p>
            <p className="text-xs text-blue-700">The director's information will be verified against government databases for KYC compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Required Documents</h3>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-[#5B52FF]" />
              <span className="font-medium text-[#1E293B]">Certificate of Incorporation</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Required</Badge>
          </div>
          <p className="text-sm text-[#64748B] mb-3">Upload your business registration certificate</p>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Simulate file selection
                handleFileUpload('registrationDoc', new File([], 'registration.pdf'));
              }}
            >
              <UploadIcon className="w-4 h-4" />
              Choose File
            </Button>
            <span className="text-sm text-[#64748B]">
              {formData.registrationDoc ? 'File selected' : 'No file chosen'}
            </span>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5 text-[#5B52FF]" />
              <span className="font-medium text-[#1E293B]">Bank Statement</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Required</Badge>
          </div>
          <p className="text-sm text-[#64748B] mb-3">Last 3 months of business bank statements</p>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Simulate file selection
                handleFileUpload('bankStatement', new File([], 'statement.pdf'));
              }}
            >
              <UploadIcon className="w-4 h-4" />
              Choose File
            </Button>
            <span className="text-sm text-[#64748B]">
              {formData.bankStatement ? 'File selected' : 'No file chosen'}
            </span>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-[#5B52FF]" />
              <span className="font-medium text-[#1E293B]">Tax Clearance Certificate</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Required</Badge>
          </div>
          <p className="text-sm text-[#64748B] mb-3">Current tax clearance certificate</p>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Simulate file selection
                handleFileUpload('taxClearance', new File([], 'tax.pdf'));
              }}
            >
              <UploadIcon className="w-4 h-4" />
              Choose File
            </Button>
            <span className="text-sm text-[#64748B]">
              {formData.taxClearance ? 'File selected' : 'No file chosen'}
            </span>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-[#5B52FF]" />
              <span className="font-medium text-[#1E293B]">Utility Bill</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Optional</Badge>
          </div>
          <p className="text-sm text-[#64748B] mb-3">Recent utility bill (not older than 3 months)</p>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // Simulate file selection
                handleFileUpload('utilityBill', new File([], 'utility.pdf'));
              }}
            >
              <UploadIcon className="w-4 h-4" />
              Choose File
            </Button>
            <span className="text-sm text-[#64748B]">
              {formData.utilityBill ? 'File selected' : 'No file chosen'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckIcon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-[#1E293B] mb-2">KYB Verification Successful!</h3>
      <p className="text-[#64748B] mb-6">Your business has been upgraded to Tier 3 verification.</p>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
        <div className="flex items-start gap-3">
          <ShieldIcon className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">All Features Unlocked</p>
            <div className="text-xs text-green-700 mt-2 space-y-1">
              <p>✓ Payroll Management</p>
              <p>✓ Bulk Payments</p>
              <p>✓ POS Integration</p>
              <p>✓ Business Loans</p>
              <p>✓ Higher Transaction Limits</p>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleClose}
        className="bg-[#5B52FF] text-white"
      >
        Start Using Tier 3 Features
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">KYB Tier 3 Verification</h2>
                <p className="text-sm text-[#64748B]">Unlock full business features</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleClose}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          
          {!isVerified ? (
            <>
              {renderStepIndicator()}
              
              <div className="mb-6">
                {currentStep === 1 && renderBusinessInfoStep()}
                {currentStep === 2 && renderDirectorInfoStep()}
                {currentStep === 3 && renderDocumentsStep()}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={currentStep === 1 ? handleClose : handleBack}
                >
                  {currentStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : currentStep < 3 ? 'Continue' : 'Submit Verification'}
                </Button>
              </div>
            </>
          ) : (
            renderSuccessStep()
          )}
        </CardContent>
      </Card>
    </div>
  );
};