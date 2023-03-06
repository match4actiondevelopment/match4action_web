import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuthGuard = () => {
  const router = useRouter();
  const [tokens, setTokens] = useState<{ access_token: string, refresh_token: string } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageTokenData = localStorage.getItem('match4action@tokens');

      if (localStorageTokenData) {
        const tokens: { access_token: string; refresh_token: string } = JSON.parse(localStorageTokenData);
        setTokens(tokens)
      }
    }
  }, [router]);

  const isLogged = tokens && Object.values(tokens).length > 0 ? true : false

  return { tokens, isLogged }
};
