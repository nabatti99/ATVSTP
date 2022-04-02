import { useEffect, useRef } from "react";

function usePrevious(value) {
  const valueRef = useRef();

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}

export default usePrevious;
