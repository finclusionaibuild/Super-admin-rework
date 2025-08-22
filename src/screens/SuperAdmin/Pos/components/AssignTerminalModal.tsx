import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { XIcon } from 'lucide-react';
import { PosTerminal } from '../../../../types/pos';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  status: string;
  region: string;
}

interface AssignTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  posTerminals: PosTerminal[];
  users: User[];
  selectedTerminal: PosTerminal | null;
  editingUser: User | null;
  onTerminalSelect: (terminal: PosTerminal | null) => void;
  onUserSelect: (user: User | null) => void;
  onAssign: (terminalId: string, userId: string) => void;
}

export const AssignTerminalModal: React.FC<AssignTerminalModalProps> = ({
  isOpen,
  onClose,
  posTerminals,
  users,
  selectedTerminal,
  editingUser,
  onTerminalSelect,
  onUserSelect,
  onAssign
}) => {
  if (!isOpen) return null;

  const availableTerminals = posTerminals.filter(t => 
    t.assignedUser === 'Unassigned' || t.status === 'Inactive'
  );

  const availableUsers = users.filter(u => 
    u.type === 'Business' && u.status === 'Active'
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1E293B]">Assign POS Terminal</h3>
          <Button variant="ghost" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Select Terminal</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => {
                const terminal = posTerminals.find(t => t.terminalId === e.target.value) || null;
                onTerminalSelect(terminal);
              }}
              value={selectedTerminal?.terminalId || ''}
            >
              <option value="">Choose terminal</option>
              {availableTerminals.map(terminal => (
                <option key={terminal.id} value={terminal.terminalId}>
                  {terminal.terminalId} - {terminal.merchantName || 'N/A'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Assign to User</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => {
                const user = users.find(u => u.id === e.target.value) || null;
                onUserSelect(user);
              }}
              value={editingUser?.id || ''}
            >
              <option value="">Choose user</option>
              {availableUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} - {user.type} ({user.region})
                </option>
              ))}
            </select>
          </div>

          {selectedTerminal && editingUser && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Assignment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Terminal:</span>
                    <span className="font-medium text-blue-900">{selectedTerminal.terminalId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">User:</span>
                    <span className="font-medium text-blue-900">{editingUser.firstName} {editingUser.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Location:</span>
                    <span className="font-medium text-blue-900">{selectedTerminal.location || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-[#5B52FF] text-white"
            onClick={() => selectedTerminal && editingUser && onAssign(selectedTerminal.terminalId, editingUser.id)}
            disabled={!selectedTerminal || !editingUser}
          >
            Assign Terminal
          </Button>
        </div>
      </div>
    </div>
  );
};
