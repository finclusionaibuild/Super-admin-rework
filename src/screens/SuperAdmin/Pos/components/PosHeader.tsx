import React from 'react';
import { Button } from '../../../../components/ui/button';
import { DownloadIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';

interface PosHeaderProps {
  onAddTerminal: () => void;
  onRefresh: () => void;
  onExport?: () => void;
  loading?: boolean;
}

export const PosHeader: React.FC<PosHeaderProps> = ({
  onAddTerminal,
  onRefresh,
  onExport,
  loading = false
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B]">POS Terminal Management</h2>
        <p className="text-[#64748B]">Manage and monitor all POS terminals across regions</p>
      </div>
      <div className="flex gap-3">
        {onExport && (
          <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
            <DownloadIcon className="w-4 h-4" />
            Export Data
          </Button>
        )}
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button 
          className="bg-[#5B52FF] text-white flex items-center gap-2"
          onClick={onAddTerminal}
        >
          <PlusIcon className="w-4 h-4" />
          Add Terminal
        </Button>
      </div>
    </div>
  );
};
