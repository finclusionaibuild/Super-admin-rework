# Customers API Integration & Add Terminal Updates

## Overview
Successfully integrated the customers API and updated the add terminal functionality with real business data and proper API endpoints.

## New Features Implemented

### 1. Customers API Service (`src/services/customersApi.ts`)

**Endpoint**: `GET /api/admin/customers`

**Parameters**:
- `search` - Search customers by name/email
- `accountType` - Filter by account type (business, individual)  
- `startDate` / `endDate` - Date range filtering
- `page` / `perPage` - Pagination controls

**Response Structure**:
```typescript
{
  "statusCode": 200,
  "message": "Fetched Successfully",
  "data": {
    "paginatedData": [
      {
        "id": "cc7ea9d7-6707-4d45-ab80-bb81617e314d",
        "finclusionId": "TTSBNG110825848253",
        "firstName": "TestFristName",
        "lastName": "TestLastName", 
        "email": "alo@gmail.com",
        "phone": "09000000701",
        "accountType": "business",
        "kycTier": "Tier 2",
        "status": "Active"
      }
    ],
    "totalCount": 4,
    "page": 1,
    "perPage": 10,
    "totalPages": 1
  }
}
```

### 2. Reusable Customers Hook (`src/hooks/useCustomers.ts`)

**Features**:
- Generic hook for all customer types
- Specialized `useBusinessCustomers` hook
- Debounced search functionality
- Pagination controls
- Loading and error states
- Auto-fetch or manual fetch options

**Usage Examples**:
```typescript
// General customers hook
const { customers, loading, error } = useCustomers({
  accountType: 'business',
  initialParams: { perPage: 100 }
});

// Specialized business customers hook
const { customers: businessCustomers } = useBusinessCustomers({
  autoFetch: false // Manual fetch when needed
});
```

### 3. Updated Add Terminal API (`src/services/posApi.ts`)

**Endpoint**: `POST /api/admin/pos-terminals/business`

**Request Body**:
```typescript
{
  "businessId": "1db19660-f64d-49ff-b08d-227ef6a4db68",
  "terminalId": "123456789", 
  "serialNumber": "SN17232003123",
  "integratorType": "VFD"
}
```

### 4. Streamlined Add Terminal Modal

**Old Form Fields** (Removed):
- ❌ Merchant Name
- ❌ Location  
- ❌ Region
- ❌ Model
- ❌ Assign to User

**New Form Fields**:
- ✅ **Terminal ID** - Text input for terminal identifier
- ✅ **Serial Number** - Text input for device serial  
- ✅ **Business** - Dropdown with real business customers
- ✅ **Integrator Type** - Dropdown (currently only "VFD")

**Business Selection**:
- Displays: `{firstName} {lastName} - {finclusionId}`
- Stores: `{id}` (UUID) for API submission
- Real-time loading from customers API
- Error handling for API failures

### 5. Enhanced User Experience

**Loading States**:
- Business dropdown shows "Loading businesses..." during fetch
- Form inputs disabled during terminal creation
- Button shows "Adding..." during submission

**Error Handling**:
- Customer API errors shown below business dropdown
- Terminal creation errors shown via feedback system
- Proper validation for required fields

**Success Flow**:
- Success message with terminal ID
- Modal closes automatically
- Terminals list refreshes to show new terminal
- Form resets to default values

## API Integration Flow

### Add Terminal Process:

1. **User opens modal** → Triggers business customers fetch
2. **Business dropdown populates** → Shows `firstName lastName - finclusionId`
3. **User fills form** → Terminal ID, Serial Number, selects Business
4. **Form submission** → Sends `businessId` (UUID) to API
5. **Success response** → Shows success message, refreshes list
6. **Error handling** → Shows specific error messages

### Data Mapping:

```typescript
// UI Display Format
"TestFristName TestLastName - TTSBNG110825848253"

// API Submission Format  
{
  "businessId": "cc7ea9d7-6707-4d45-ab80-bb81617e314d",
  "terminalId": "123456789",
  "serialNumber": "SN17232003123", 
  "integratorType": "VFD"
}
```

## Reusability Benefits

The customers API service and hook are designed for platform-wide reuse:

### Future Use Cases:
- **User Management** - Customer listing and management
- **Transaction Assignment** - Link transactions to customers  
- **KYC Management** - Customer verification workflows
- **Reports & Analytics** - Customer-based reporting
- **Support System** - Customer lookup for support tickets

### Hook Flexibility:
```typescript
// Get all customers
const allCustomers = useCustomers();

// Get individual customers only
const individuals = useCustomers({ accountType: 'individual' });

// Get business customers with search
const businesses = useBusinessCustomers({ 
  initialParams: { search: 'tech' }
});

// Manual fetch when needed
const manualCustomers = useCustomers({ autoFetch: false });
```

## Code Quality Features

- **TypeScript Interfaces** - Full type safety throughout
- **Error Boundaries** - Graceful error handling
- **Loading States** - Professional UX during API calls
- **Debounced Search** - Optimized API calls
- **Pagination** - Efficient data loading
- **Reusable Patterns** - Following project `.cursorrules`

## Testing the Integration

1. Open POS Management → Add Terminal
2. Business dropdown should load real customers
3. Fill all required fields
4. Submit to create terminal via API
5. Verify success message and list refresh

The integration provides a solid foundation for all customer-related functionality across the platform while maintaining clean, reusable code patterns.
