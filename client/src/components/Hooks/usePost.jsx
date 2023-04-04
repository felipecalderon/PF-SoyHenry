import { useState, useEffect } from 'react';
import axios from 'axios'
function usePost(url, body) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url, body) => {
      try {
        setIsLoading(true);

        const response = await axios.post(url, body);

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}

export default usePost