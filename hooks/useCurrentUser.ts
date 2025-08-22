import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = (await authClient.getSession());
      setUser(session?.data?.user || null);
    };
    fetchUser();
  }, []);

  return user;
}
