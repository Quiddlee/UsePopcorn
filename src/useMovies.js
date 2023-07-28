import { API_SEARCH_NAME } from './config';
import { useEffect, useState } from 'react';

/**
 * @param query {string}
 * @param [callback] {Function}
 * @return {{movies: Object[], isLoading: boolean, error: string}}
 * @description Fetching the movies from database by given query
 */
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setError('');
        setIsLoading(true);
        const res = await fetch(`${API_SEARCH_NAME}${query}`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();

        if (data.Response === 'False') throw new Error(data.Error);

        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
