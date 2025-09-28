export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    
}
  
export const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "OAuth Sign-in error.",
  OAuthCallback: "OAuth callback error.",
  OAuthCreateAccount: "Could not create account.",
  EmailCreateAccount: "Could not create account.",
  Callback: "Callback error.",
  SessionRequired: "You must be signed in to access this page.",
  default: "An unknown error occurred.",
};
