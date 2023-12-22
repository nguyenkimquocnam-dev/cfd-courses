import { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const excute = async (payload, options) => {
    const { onSuccess, onFail } = options || {};
    setLoading(true);
    try {
      const res = await promise(payload);
      if (res.data) {
        setData(res.data?.data);
        onSuccess?.(res.data?.data);
      }
    } catch (error) {
      setError(error);
      onFail?.(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    excute,
    data,
    loading,
    error,
  };
};

export default useMutation;
