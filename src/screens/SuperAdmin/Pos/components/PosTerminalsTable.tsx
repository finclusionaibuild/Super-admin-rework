import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { Pagination } from '../../../../components/ui/pagination';
import { ActionsDropdown } from '../../../../components/ui/actions-dropdown';
import { 
  SearchIcon,
  UserIcon,
  PlayIcon,
  PauseIcon,
  StopCircleIcon,
  LoaderIcon
} from 'lucide-react';
import { PosTerminal } from '../../../../types/pos';

interface PosTerminalsTableProps {
  posTerminals: PosTerminal[];
  filteredTerminals: PosTerminal[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    perPage: number;
    totalCount: number;
  };
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onAssignTerminal: (terminal: PosTerminal) => void;
  onTerminalStatusChange: (terminalId: string, action: 'activate' | 'freeze' | 'deactivate') => void;
}

export const PosTerminalsTable: React.FC<PosTerminalsTableProps> = ({
  posTerminals,
  filteredTerminals,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  loading,
  pagination,
  onPageChange,
  onPerPageChange,
  onAssignTerminal,
  onTerminalStatusChange
}) => {
  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#1E293B]">POS Terminals</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search terminals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="connected">Connected</option>
              <option value="disconnected">Disconnected</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderIcon className="w-8 h-8 animate-spin text-[#5B52FF]" />
              <span className="ml-3 text-[#64748B]">Loading terminals...</span>
            </div>
          ) : filteredTerminals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#64748B] text-lg">No terminals found</p>
              <p className="text-sm text-[#64748B] mt-2">
                {searchQuery || selectedFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No POS terminals have been added yet"}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TERMINAL ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SERIAL NUMBER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">INTEGRATOR TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BUSINESS ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LINK STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTerminals.map((terminal) => (
                  <tr key={terminal.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                      {terminal.terminalId}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {terminal.serialNumber || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">
                        Type {terminal.integratorTypeId || 'N/A'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {terminal.businessId ? (
                        <Badge className="bg-green-100 text-green-800">
                          #{terminal.businessId}
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">
                          Unassigned
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        terminal.linkStatus === true
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }>
                        {terminal.linkStatus === true ? "Connected" : "Disconnected"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {formatDate(terminal.createdAt || '')}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {terminal.assignedUser || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4">
                      <ActionsDropdown
                        actions={[
                          {
                            id: 'assign',
                            label: 'Assign Terminal',
                            icon: <UserIcon className="w-4 h-4" />,
                            onClick: () => onAssignTerminal(terminal)
                          },
                          {
                            id: 'activate',
                            label: 'Activate',
                            icon: <PlayIcon className="w-4 h-4" />,
                            onClick: () => onTerminalStatusChange(terminal.id, 'activate')
                          },
                          {
                            id: 'freeze',
                            label: 'Freeze',
                            icon: <PauseIcon className="w-4 h-4" />,
                            onClick: () => onTerminalStatusChange(terminal.id, 'freeze')
                          },
                          {
                            id: 'deactivate',
                            label: 'Deactivate',
                            icon: <StopCircleIcon className="w-4 h-4" />,
                            onClick: () => onTerminalStatusChange(terminal.id, 'deactivate'),
                            variant: 'destructive' as const
                          }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {!loading && filteredTerminals.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            perPage={pagination.perPage}
            totalCount={pagination.totalCount}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            loading={loading}
          />
        )}
      </CardContent>
    </Card>
  );
};
