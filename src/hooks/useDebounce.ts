import { useEffect, useState } from 'react';

export const useDebounce = (preset: any, delay = 500) => {
  const [value, setValue] = useState(preset);
  const [debouncedValue, setDebouncedValue] = useState(preset);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, value, setValue];
};
