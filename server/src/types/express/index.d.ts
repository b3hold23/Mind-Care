declare namespace Express {
  interface Request {
    user?: {
      id?: number;
      username: string;
      tokens?: {
        access_token: string;
        refresh_token: string;
      };
    };
    googleTokens?: {
      access_token: string;
      refresh_token: string;
    };
  }
}
