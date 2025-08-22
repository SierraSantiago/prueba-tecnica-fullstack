import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";

type Role = "ADMIN" | "USER";

export const useUserRole = () => {
  const [role, setRole] = useState<Role>("USER");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const session = await authClient.getSession();

        if (session.data?.user) {
          const res = await fetch(`/api/users/${session.data.user.id}`);
          if (!res.ok) {
            console.error("Error al obtener el usuario:", await res.text());
            return;
          }

          const user = await res.json();
          if (user.role) {
            setRole(user.role);
          }
        }
      } catch (err) {
        console.error("Error obteniendo la sesión o rol del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading };
};
