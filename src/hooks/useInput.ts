import { useState, useCallback, ChangeEvent } from 'react';

interface UseInputOptions<T> {
  initialValue: T;
  validate?: (value: T) => string | undefined;
  transform?: (value: string) => T;
}

export function useInput<T = string>({
  initialValue,
  validate,
  transform = value => value as unknown as T,
}: UseInputOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = transform(event.target.value);
      setValue(newValue);
      
      if (validate) {
        const validationError = validate(newValue);
        setError(validationError);
      }
    },
    [transform, validate]
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  }, [validate, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(undefined);
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
    reset,
    setValue,
    setError,
  };
} 