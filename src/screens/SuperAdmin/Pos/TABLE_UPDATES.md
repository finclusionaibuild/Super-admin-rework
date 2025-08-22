# POS Table Updates - API Fields Integration

## Overview
Updated the POS terminals table to display actual API response fields and implemented a space-saving actions dropdown.

## Changes Made

### 1. New Table Columns (Replacing dummy data)

| Old Column | New Column | API Field | Display Format |
|------------|------------|-----------|---------------|
| MERCHANT | SERIAL NUMBER | `serialNumber` | Plain text |
| LOCATION | INTEGRATOR TYPE | `integratorTypeId` | Badge: "Type {id}" |
| DAILY VOLUME | BUSINESS ID | `businessId` | Badge with #prefix or "Unassigned" |
| TRANSACTIONS | LINK STATUS | `linkStatus` | Badge: "Connected"/"Disconnected" |
| UPTIME | CREATED DATE | `createdAt` | Formatted date |

### 2. Actions Dropdown Component

**New Component**: `src/components/ui/actions-dropdown.tsx`

**Features**:
- Reusable dropdown with ellipsis trigger (⋯)
- Support for different action variants (default, destructive)
- Click-outside-to-close functionality
- Icons and labels for each action
- Disabled state support

**Actions Available**:
- **Assign Terminal** - Opens assignment modal
- **Activate** - Activates the terminal
- **Freeze** - Freezes the terminal  
- **Deactivate** - Deactivates terminal (destructive style)

### 3. Updated Statistics Cards

**Old Statistics**:
- Active, Offline, Maintenance, Inactive

**New Statistics**:
- **Total Terminals** - Total count from API pagination
- **Connected** - Terminals with `linkStatus: true`
- **Disconnected** - Terminals with `linkStatus: false`  
- **Assigned** - Terminals with non-empty `businessId`
- **Unassigned** - Terminals without `businessId`
- **Daily Transactions** - Kept as placeholder
- **Revenue** - Kept as placeholder

### 4. Updated Filter Options

**Old Filters**:
- All Status, Active, Offline, Maintenance, Inactive

**New Filters**:
- **All Status** - Shows all terminals
- **Connected** - `linkStatus === true`
- **Disconnected** - `linkStatus === false`
- **Assigned** - Has `businessId`
- **Unassigned** - No `businessId`

### 5. Enhanced Search Functionality

**Search Fields**:
- `terminalId` - Terminal identifier
- `serialNumber` - Serial number
- `assignedUser` - Assigned user name

### 6. Visual Improvements

**Badges and Status Indicators**:
- **Integrator Type**: Outlined badge showing "Type {id}"
- **Business ID**: Blue badge with # prefix for assigned terminals
- **Link Status**: Green for connected, red for disconnected
- **Date Formatting**: Localized date format for `createdAt`

### 7. Space Optimization

**Before**: 4 separate action buttons taking up significant space
**After**: Single ellipsis button (⋯) opening dropdown menu

## Code Example

```tsx
// New table row structure
<tr key={terminal.id}>
  <td>{terminal.terminalId}</td>
  <td>{terminal.serialNumber}</td>
  <td><Badge variant="outline">Type {terminal.integratorTypeId}</Badge></td>
  <td>
    {terminal.businessId ? (
      <Badge className="bg-blue-100 text-blue-800">#{terminal.businessId}</Badge>
    ) : (
      <span className="text-gray-400">Unassigned</span>
    )}
  </td>
  <td>
    <Badge className={terminal.linkStatus ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
      {terminal.linkStatus ? "Connected" : "Disconnected"}
    </Badge>
  </td>
  <td>{new Date(terminal.createdAt || '').toLocaleDateString()}</td>
  <td>{terminal.assignedUser}</td>
  <td>
    <ActionsDropdown actions={actions} disabled={loading} />
  </td>
</tr>
```

## Benefits

1. **Real Data Display** - Shows actual API fields instead of placeholder data
2. **Space Efficient** - Actions dropdown saves horizontal space
3. **Better UX** - Clear status indicators with color-coded badges
4. **Maintainable** - Reusable actions dropdown component
5. **Responsive** - Better table layout for different screen sizes
6. **Type Safe** - Proper TypeScript interfaces for all components

## API Field Mapping

```typescript
// API Response fields now displayed:
{
  "id": 8,                           // Row key
  "serialNumber": "SN17232003223",   // SERIAL NUMBER column
  "terminalId": "123227BN",          // TERMINAL ID column  
  "integratorTypeId": "1",           // INTEGRATOR TYPE column
  "businessId": "19",                // BUSINESS ID column
  "linkStatus": true,                // LINK STATUS column
  "createdAt": "2025-08-18T12:59:53" // CREATED DATE column
}
```

The table now accurately reflects the real API data while maintaining a clean, professional appearance with improved usability.
