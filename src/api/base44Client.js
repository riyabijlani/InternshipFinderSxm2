import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "689d4418130bf907925c11a0", 
  requiresAuth: true // Ensure authentication is required for all operations
});
