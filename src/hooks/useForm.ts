import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: (value: unknown) => string | undefined;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: unknown) => {
    const validateRule = validationRules[name as string];
    if (validateRule) {
      const error = validateRule(value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
      return !error;
    }
    return true;
  }, [validationRules]);

  const handleChange = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, [validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = Object.keys(values).every(key => 
      validateField(key as keyof T, values[key])
    );

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateField, onSubmit]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
} 