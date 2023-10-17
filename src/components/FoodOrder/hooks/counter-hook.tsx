import { useEffect, useState } from "react";

const useCounter = (init: number, freq: number) => {
  const [initValue, setInitValue] = useState<number>(init);
  useEffect(() => {
    var timer = setInterval(() => setInitValue((prev) => prev + 1), freq);
    return () => clearInterval(timer);
  }, []);
  return initValue;
};

export default useCounter;
