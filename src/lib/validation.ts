export const validateEmail = (email: string) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email address';
  }
};

export const validatePassword = (password: string) => {
  if (!password) return 'Password is required';
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
};

export const validateRequired = (value: unknown, fieldName: string) => {
  if (!value) return `${fieldName} is required`;
};

export const validateLength = (value: string, min: number, max: number) => {
  if (value.length < min) return `Must be at least ${min} characters`;
  if (value.length > max) return `Must be less than ${max} characters`;
}; 