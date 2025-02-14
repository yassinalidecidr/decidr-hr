declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DATABASE_URL?: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string;
    NEXT_PUBLIC_ACCESS_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
} 