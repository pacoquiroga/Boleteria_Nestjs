
export interface AuthToken {
  access_token: string;
  user: {
    id: number;
    username: string;
    rol: string;
    name: string;
    lastname: string;
    email: string;
  };
}