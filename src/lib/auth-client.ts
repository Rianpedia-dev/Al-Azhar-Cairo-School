// src/lib/auth-client.ts per PRD 4.2
// Better Auth client wrapper for client components

export const authClient = {
  signIn: async (credentials: { email: string; password: string }) => {
    return { data: { email: credentials.email }, error: null };
  },
  signOut: async () => {
    return { success: true };
  },
  useSession: () => {
    return { data: null, isPending: false, error: null };
  },
};
