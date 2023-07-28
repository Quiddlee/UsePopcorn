import { useEffect } from 'react';

/**
 * @param key {string}
 * @param action {() => void}
 * @description Accepts a handler function and attach
 * it to the document element
 */
export function useKey(key, action) {
  function handleKeyDown(e) {
    if (e.key.toLowerCase() === key.toLowerCase()) {
      action();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
