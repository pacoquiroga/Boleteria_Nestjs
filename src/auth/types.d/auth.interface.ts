
export interface AuthToken {
  access_token: string;
  user: {
    id: number;
    username: string;
    roles: string[];
    fullName: string;
    email: string;
  };
}