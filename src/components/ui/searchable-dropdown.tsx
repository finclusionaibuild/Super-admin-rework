import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import { ChevronDownIcon, SearchIcon, CheckIcon } from 'lucide-react';

interface SearchableDropdownOption {
  id: string;
  label: string;
  sublabel?: string;
  region?: string;
}

interface SearchableDropdownProps {
  options: SearchableDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  loading?: boolean;
  error?: string | null;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  loading = false,
  error = null,
  onSearch,
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.sublabel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Selected option
  const selectedOption = options.find(option => option.id === value);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          {label}
        </label>
      )}

      <div ref={dropdownRef} className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:border-[#5B52FF] focus:ring-1 focus:ring-[#5B52FF] transition-colors ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          disabled={loading}
        >
          <span className={selectedOption ? 'text-[#1E293B]' : 'text-gray-500'}>
            {selectedOption ? (
              <div className="flex flex-col">
                <span className="font-medium">{selectedOption.label}</span>
                {(selectedOption.sublabel || selectedOption.region) && (
                  <span className="text-xs text-gray-500">
                    {selectedOption.sublabel}
                    {selectedOption.sublabel && selectedOption.region && ' • '}
                    {selectedOption.region}
                  </span>
                )}
              </div>
            ) : (
              placeholder
            )}
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 text-sm"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                      value === option.id ? 'bg-blue-50 text-blue-900' : 'text-[#1E293B]'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-medium truncate">{option.label}</span>
                      {(option.sublabel || option.region) && (
                        <span className="text-xs text-gray-500 truncate">
                          {option.sublabel}
                          {option.sublabel && option.region && ' • '}
                          {option.region}
                        </span>
                      )}
                    </div>
                    {value === option.id && (
                      <CheckIcon className="w-4 h-4 text-blue-600 ml-2 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
