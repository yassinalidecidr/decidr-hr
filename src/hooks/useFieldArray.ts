import { useState, useCallback } from 'react';

interface UseFieldArrayOptions<T> {
  initialValues?: T[];
  defaultValue: T;
}

export function useFieldArray<T>({ initialValues = [], defaultValue }: UseFieldArrayOptions<T>) {
  const [fields, setFields] = useState<T[]>(initialValues);

  const append = useCallback((value: T = defaultValue) => {
    setFields(current => [...current, value]);
  }, [defaultValue]);

  const prepend = useCallback((value: T = defaultValue) => {
    setFields(current => [value, ...current]);
  }, [defaultValue]);

  const remove = useCallback((index: number) => {
    setFields(current => current.filter((_, i) => i !== index));
  }, []);

  const update = useCallback((index: number, value: T) => {
    setFields(current => 
      current.map((item, i) => (i === index ? value : item))
    );
  }, []);

  const move = useCallback((from: number, to: number) => {
    setFields(current => {
      const newFields = [...current];
      const [removed] = newFields.splice(from, 1);
      newFields.splice(to, 0, removed);
      return newFields;
    });
  }, []);

  return {
    fields,
    append,
    prepend,
    remove,
    update,
    move,
    clear: useCallback(() => setFields([]), []),
    replace: useCallback((newFields: T[]) => setFields(newFields), []),
  };
} 