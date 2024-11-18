import { useEffect, useState } from "react";

function useCookie(name: string): string | null {

    const [cookieValue, setCookieValue] = useState<string | null>(null);
  
    useEffect(() => {
      const getCookie = (): string | null => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
          const [key, value] = cookie.split('=');
          if (key === name) {
            return decodeURIComponent(value);
          }
        }
        return null;
      };
  
      setCookieValue(getCookie());
    }, [name]);
  
    return cookieValue;
  }
  
  export default useCookie;
  