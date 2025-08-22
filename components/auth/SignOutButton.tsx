import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth/client";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Button className = 'text-black'variant="outline" onClick={handleSignOut}>
      Cerrar sesión
    </Button>
  );
};
