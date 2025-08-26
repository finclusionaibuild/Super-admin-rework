import React from 'react';
import { Button } from '../../../../components/ui/button';
import { DownloadIcon, RefreshCwIcon, PlusIcon, UsersIcon } from 'lucide-react';

interface CustomerHeaderProps {
  onRefresh: () => void;
  onExport?: () => void;
  onCreateUser?: () => void;
  loading?: boolean;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  onRefresh,
  onExport,
  onCreateUser,
  loading = false
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
          <UsersIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">User Management</h2>
          <p className="text-[#64748B]">Manage all platform users across all regions and types</p>
        </div>
      </div>
      <div className="flex gap-3">
        {onExport && (
          <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
            <DownloadIcon className="w-4 h-4" />
            Export Users
          </Button>
        )}
        {onCreateUser && (
          <Button
            className="bg-[#5B52FF] text-white flex items-center gap-2"
            onClick={onCreateUser}
          >
            <PlusIcon className="w-4 h-4" />
            Create User
          </Button>
        )}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
