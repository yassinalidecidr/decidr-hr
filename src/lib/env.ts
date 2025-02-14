export function validateEnv() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_APP_URL',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_BACKEND_URL',
    'NEXT_PUBLIC_ACCESS_KEY',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
} 