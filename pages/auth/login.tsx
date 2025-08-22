import { useEffect } from "react";
import { authClient } from "../../lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

const Login = () => {
  
  // Si el usuario ya está autenticado, redirigir al home
  useRedirectIfAuthenticated("/");

    // Función para manejar el inicio de sesión con GitHub
  const handleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",            // URL a la que redirigir después del inicio de sesión
        newUserCallbackURL: "/",     // URL a la que redirigir si es un nuevo usuario
        disableRedirect: false,
        requestSignUp: true, 
    });
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <Card className="w-[350px] shadow-lg border">
        <CardHeader className="text-center">
          <CardTitle>Bienvenido a PruebaTecnica</CardTitle>
          <CardDescription>Inicia sesión con GitHub para continuar</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogin}
          >
            Iniciar con GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
