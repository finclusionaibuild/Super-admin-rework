import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { SearchableDropdown } from '../../../../components/ui/searchable-dropdown';
import { XIcon, LoaderIcon } from 'lucide-react';
import { NewTerminal } from '../../../../types/pos';
import { Customer } from '../../../../types/customer';

interface AddTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTerminal: NewTerminal;
  setNewTerminal: (terminal: NewTerminal) => void;
  addingTerminal: boolean;
  businessCustomers: Customer[];
  customersLoading: boolean;
  customersError: string | null;
  searchBusinesses?: (query: string) => void;
  onSubmit: () => void;
}

export const AddTerminalModal: React.FC<AddTerminalModalProps> = ({
  isOpen,
  onClose,
  newTerminal,
  setNewTerminal,
  addingTerminal,
  businessCustomers,
  customersLoading,
  customersError,
  searchBusinesses,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1E293B]">Add New POS Terminal</h3>
          <Button variant="ghost" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Terminal ID *</label>
            <Input
              placeholder="Enter terminal ID"
              value={newTerminal.terminalId}
              onChange={(e) => setNewTerminal({ ...newTerminal, terminalId: e.target.value })}
              disabled={addingTerminal}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Serial Number *</label>
            <Input
              placeholder="Enter serial number"
              value={newTerminal.serialNumber}
              onChange={(e) => setNewTerminal({ ...newTerminal, serialNumber: e.target.value })}
              disabled={addingTerminal}
            />
          </div>
          <SearchableDropdown
            label="Business *"
            options={businessCustomers.map(customer => ({
              id: customer.id,
              label: customer.fullName,
              sublabel: customer.email || customer.homeAddress || `RC: ${customer.finclusionId}`,
              region: customer.region
            }))}
            value={newTerminal.businessId}
            onChange={(businessId) => setNewTerminal({ ...newTerminal, businessId })}
            onSearch={searchBusinesses}
            placeholder="Search and select business..."
            searchPlaceholder="Search businesses by name, address, or RC number..."
            loading={customersLoading}
            error={customersError}
            emptyMessage="No businesses found"
            className="col-span-2"
          />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Integrator Type *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B52FF]"
              value={newTerminal.integratorType}
              onChange={(e) => setNewTerminal({ ...newTerminal, integratorType: e.target.value })}
              disabled={addingTerminal}
            >
              <option value="VFD">VFD</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={addingTerminal}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={addingTerminal || !newTerminal.terminalId || !newTerminal.serialNumber || !newTerminal.businessId}
            className="flex-1 bg-[#5B52FF] text-white"
          >
            {addingTerminal ? (
              <>
                <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add Terminal"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
