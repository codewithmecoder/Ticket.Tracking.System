export type CurrentUserLogin = {
  id: number;
  displayName: string;
  username: string;
  photo: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export type CurrentUserResponse = {
  email: string;
  id: string;
  normalizedEmail: string;
  normalizedUserName: string;
  userCliams: [];
  userName: string;
  userRoles: string[];
};
