# Authentication Token Management

## Overview
This document explains how to manage authentication tokens in the Super Admin Dashboard.

## Current Issue Fixed
- ✅ Fixed **401 Unauthorized** errors by updating expired authentication token
- ✅ Fixed **React Router warnings** by adding future flags
- ✅ Centralized auth configuration for easier token management

## Quick Fix for Token Expiry

When you see `HTTP error! status: 401` in the console:

### 1. Update Token in Central Location
**File**: `src/config/auth.ts`

```typescript
export const AUTH_CONFIG = {
  // Update this token when it expires
  authToken: 'NEW_TOKEN_HERE',
  // ... rest of config
};
```

### 2. Get New Token
1. Open browser dev tools → Network tab
2. Go to your admin panel or API documentation
3. Look for any successful API request
4. Copy the `Authorization: Bearer TOKEN_HERE` value
5. Replace the token in `AUTH_CONFIG.authToken`

## How It Works

### Centralized Configuration
- **All API services** now use `AUTH_CONFIG` from `src/config/auth.ts`
- **Single source of truth** for authentication
- **Easy updates** - change token in one place

### API Services Using Centralized Auth
- `src/services/posApi.ts` - POS terminals API
- `src/services/customersApi.ts` - Customers API
- Future API services will use the same pattern

### Error Handling
- **Automatic detection** of 401 errors
- **Clear error messages** for administrators
- **Helpful console logs** pointing to token update location

## React Router Warnings Fixed

Added future flags to `src/index.tsx`:
```typescript
<BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
```

These flags:
- ✅ Suppress React Router v7 warnings
- ✅ Prepare for future React Router upgrades
- ✅ Enable performance optimizations

## Token Expiry Symptoms

When a token expires, you'll see:
- `Error fetching POS terminals: Error: HTTP error! status: 401`
- Empty data tables or infinite loading
- "Authentication token expired" error messages

## Prevention

### Token Lifecycle
1. **JWT tokens have expiration times** (usually 1-24 hours)
2. **Monitor console** for 401 errors
3. **Update proactively** before expiration if known

### Future Improvements
Consider implementing:
- **Automatic token refresh** using refresh tokens
- **Token expiry detection** with automatic redirect to login
- **Environment-based configuration** for different deployment stages

## Quick Reference

| Issue | Location | Fix |
|-------|----------|-----|
| 401 Errors | `src/config/auth.ts` | Update `authToken` value |
| Router Warnings | `src/index.tsx` | Already fixed with future flags |
| API Errors | Console logs | Check auth token expiry |

## Example Token Update

```typescript
// OLD (expired)
authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.OLD_TOKEN.signature'

// NEW (current)
authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.NEW_TOKEN.signature'
```

This centralized approach makes token management much easier and reduces the chance of authentication errors affecting the application.
