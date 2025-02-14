export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  startDate: string;
  organisation: {
    settings: {
      allowedDomains: string[];
    };
    _id: string;
    name: string;
    domain: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}