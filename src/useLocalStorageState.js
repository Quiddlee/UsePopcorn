import { useEffect, useState } from 'react';

/**
 * @param initialState {any}
 * @param key {string}
 * @return {[any, ((value: any) => void)]}
 * @description Getting the state from local storage
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
