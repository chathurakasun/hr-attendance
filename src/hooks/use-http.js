import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      // if (!res.ok) throw new Error("request failed");
      // works with json data
      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
