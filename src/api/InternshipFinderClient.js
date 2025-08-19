import { createClient } from '@InternshipFinder/sdk';
// import { getAccessToken } from '@InternshipFinder/sdk/utils/auth-utils';

// Create a client with authentication required
export const InternshipFinder = createClient({
  appId: "689d4418130bf907925c11a0", 
  requiresAuth: true // Ensure authentication is required for all operations
});












