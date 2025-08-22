import { PosTerminal } from '../types/pos';
import { ApiPosTerminal } from '../services/posApi';

// Transform API data to component format
export const transformApiTerminalToComponent = (apiTerminal: ApiPosTerminal): PosTerminal => {
  return {
    id: apiTerminal.id.toString(),
    terminalId: apiTerminal.terminalId,
    serialNumber: apiTerminal.serialNumber,
    integratorTypeId: apiTerminal.integratorTypeId,
    businessId: apiTerminal.businessId,
    linkStatus: apiTerminal.linkStatus,
    createdAt: apiTerminal.createdAt,
    // Default values for fields not in API (will be filled later)
    merchantName: 'N/A', // Will be filled later
    location: 'N/A', // Will be filled later
    status: apiTerminal.linkStatus ? 'Active' : 'Offline',
    dailyVolume: 0, // Will be filled later
    transactionCount: 0, // Will be filled later
    uptime: apiTerminal.linkStatus ? '99.8%' : '0%',
    assignedUser: apiTerminal.businessId ? `Business ${apiTerminal.businessId}` : 'Unassigned',
    model: 'N/A', // Will be filled later
    activationDate: new Date(apiTerminal.createdAt).toLocaleDateString(),
    lastTransaction: 'N/A' // Will be filled later
  };
};

// Batch transform multiple terminals
export const transformApiTerminals = (apiTerminals: ApiPosTerminal[]): PosTerminal[] => {
  return apiTerminals.map(transformApiTerminalToComponent);
};
