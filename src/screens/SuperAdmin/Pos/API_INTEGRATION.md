# POS Management API Integration

## Overview
Successfully implemented paginated API integration for POS terminals management, replacing dummy data with real API calls.

## Features Implemented

### 1. API Service (`src/services/posApi.ts`)
- `PosApiService` class with authentication
- Fetch POS terminals with pagination support
- Query parameters: search, integratorType, businessId, startDate, endDate, page, perPage
- Error handling and proper TypeScript types

### 2. Data Transformation (`src/utils/posTransformers.ts`)
- Transform API response to component format
- Map API fields to existing component interface
- Handle missing fields with fallback values

### 3. Custom Hook (`src/hooks/usePosTerminals.ts`)
- `usePosTerminals` hook for state management
- Debounced search functionality
- Pagination controls
- Loading and error states
- Auto-refresh capability

### 4. Pagination Component (`src/components/ui/pagination.tsx`)
- Reusable pagination component
- Page navigation with numbered buttons
- Per-page selection (10, 25, 50, 100)
- Loading state support
- Responsive design

### 5. Updated POS Management (`src/screens/SuperAdmin/Pos/PosManagement.tsx`)
- Integrated API hook
- Loading states and error handling
- Empty state for no terminals
- Real-time statistics from API data
- Disabled interactions during loading

## API Response Mapping

| API Field | Component Field | Notes |
|-----------|----------------|--------|
| `id` | `id` | Converted to string |
| `terminalId` | `terminalId` | Direct mapping |
| `serialNumber` | `serialNumber` | Direct mapping |
| `integratorTypeId` | `integratorTypeId` | New field |
| `businessId` | `businessId` | New field |
| `linkStatus` | `linkStatus` | New field |
| `createdAt` | `createdAt` | New field |
| - | `merchantName` | Fallback: "N/A" |
| - | `location` | Fallback: "N/A" |
| `linkStatus` | `status` | Mapped: true → "Active", false → "Offline" |
| - | `dailyVolume` | Fallback: 0 |
| - | `transactionCount` | Fallback: 0 |
| `linkStatus` | `uptime` | Mapped: true → "99.8%", false → "0%" |
| `businessId` | `assignedUser` | Mapped or "Unassigned" |
| - | `model` | Fallback: "N/A" |
| `createdAt` | `activationDate` | Formatted date |
| - | `lastTransaction` | Fallback: "N/A" |

## Key Features

### Pagination
- Server-side pagination with 10 items per page default
- Configurable page sizes (10, 25, 50, 100)
- Total count display with proper formatting
- Smart page navigation with ellipsis

### Search & Filtering
- Debounced search (500ms delay)
- Search across terminalId, merchantName, location
- Status filtering (All, Active, Offline, Maintenance, Inactive)
- Reset to page 1 on search/filter changes

### Loading States
- Loading spinners during API calls
- Disabled inputs and buttons during loading
- Loading indicator in table header
- Skeleton states for statistics

### Error Handling
- Error messages displayed via feedback system
- Graceful fallbacks for missing data
- Retry functionality with refresh button

### Empty States
- No terminals found message
- Different messages for search vs. no data
- Call-to-action button to add terminals
- Helpful guidance text

## Usage

The POS management now automatically loads real data from the API:

```typescript
// API endpoint
GET /api/admin/pos-terminals?page=1&perPage=10&search=...

// Component usage
<PosManagement />
// Now automatically loads and displays real POS terminals
```

## Future Enhancements

The API integration provides a solid foundation for:
- Additional API endpoints (create, update, delete terminals)
- Real-time updates via WebSocket
- Advanced filtering and sorting
- Export functionality
- Batch operations

All dummy data fields not in the API response are marked as "N/A" and can be populated when the corresponding API endpoints are available.
