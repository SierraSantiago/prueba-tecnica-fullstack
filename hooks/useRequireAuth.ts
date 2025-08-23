import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authClient } from '../lib/auth/client';

export const useRequireAuth = (redirectTo: string = '/auth/login') => {
  const router = useRouter();

  // Si el usuario no está autenticado, redirigir a la ruta especificada
  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      if (!session.data?.user) {
        router.replace(redirectTo);
      }
    };
    checkSession();
  }, [router, redirectTo]);
};
