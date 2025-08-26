import React from 'react';
import { Button } from '../../../../components/ui/button';
import { DownloadIcon, RefreshCwIcon } from 'lucide-react';

interface TransactionHeaderProps {
  onRefresh: () => void;
  onExport?: () => void;
  loading?: boolean;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  onRefresh,
  onExport,
  loading = false
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-[#1E293B]">Transaction Management</h2>
        <p className="text-[#64748B]">Monitor and manage all platform transactions</p>
      </div>
      <div className="flex gap-3">
        {onExport && (
          <Button variant="outline" className="flex items-center gap-2" onClick={onExport}>
            <DownloadIcon className="w-4 h-4" />
            Export Transactions
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
