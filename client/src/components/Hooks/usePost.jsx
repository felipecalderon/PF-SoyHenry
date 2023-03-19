import { useState, useEffect } from 'react';

function usePost(url, userData) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const postData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(url, { signal }, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const result = await response.json();

        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    postData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}

export default usePost;