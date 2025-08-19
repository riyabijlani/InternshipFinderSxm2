import { createClient } from '@Internship Finder/sdk';
// import { getAccessToken } from '@Internship Finder/sdk/utils/auth-utils';

// Create a client with authentication required
export const Internship Finder = createClient({
  appId: "689d4418130bf907925c11a0", 
  requiresAuth: true // Ensure authentication is required for all operations
});
