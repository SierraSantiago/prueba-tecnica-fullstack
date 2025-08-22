import { useEffect } from "react";
import { useRouter } from "next/router";
import { authClient } from "../lib/auth/client";

export const useRedirectIfAuthenticated = (redirectTo: string = "/") => {
  const router = useRouter();

  // Si el usuario ya está autenticado, redirigir a la ruta especificada
  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      if (session.data?.user) {
        router.replace(redirectTo); 
      }
    };
    checkSession();
  }, [router, redirectTo]);
};
