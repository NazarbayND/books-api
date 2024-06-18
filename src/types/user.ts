export interface User {
  id: number;
  username: string;
  email: string;
  role: number;
  emailVerified: boolean;
  emailVerificationToken: string | null;
}
