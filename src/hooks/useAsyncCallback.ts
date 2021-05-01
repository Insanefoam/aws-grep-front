import { useState } from 'react';

export function useAsyncCallback<T>(
  callback?: Function
): [asyncSubmit: (val: T) => void, submitState: boolean] {
  const [isLoading, setIsLoading] = useState(false);

  const asyncWrapper = async (values: T) => {
    if (!callback) {
      return;
    }
    try {
      setIsLoading(true);
      const result = await callback(values);
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  return [asyncWrapper, isLoading];
}
