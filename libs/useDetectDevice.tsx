import { useRef, useEffect } from 'react';
export default function useDetectDevice() {
  const isDesktop = useRef<boolean>(null!);
  useEffect(() => {
    if (
      navigator.userAgent.match(
        /IPhone|Android|WebOS|IPod|IPad|Blackberry|OperaMini|IEMobile/i
      )
    ) {
      isDesktop.current = false;
    } else {
      isDesktop.current = true;
    }
  }, []);
  return { isDesktop: isDesktop.current };
}
