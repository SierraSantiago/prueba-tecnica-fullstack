import { SignOutButton } from "@/components/auth/SignOutButton";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Sidebar } from "@/components/ui/Sidebar";
import { authClient } from "../lib/auth/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");

  useRequireAuth(); 

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data?.user) {
        
        // Por ahora, asignamos ADMIN siempre como indica la prueba
        setRole("ADMIN");
      }
    });
  }, []);

  const sections = [
    { name: "Ingresos y Egresos", path: "/movements", roles: ["ADMIN", "USER"] },
    { name: "Usuarios", path: "/users", roles: ["ADMIN"] },
    { name: "Reportes", path: "/reports", roles: ["ADMIN"] },
  ];

  return (
    <div className="flex h-screen bg-gray-600 text-white">
      <Sidebar role={role} />

      <main className="flex-1 p-8 relative">
        <div className="absolute top-4 right-4">
          <SignOutButton />
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <h1 className="text-2xl font-bold">Panel de Navegación</h1>
          <div className="flex flex-col gap-4 w-64 mt-4">
            {sections
              .filter((s) => s.roles.includes(role))
              .map((section) => (
                <Button
                  key={section.name}
                  className="w-full text-white border-white hover:bg-gray-700"
                  onClick={() => window.location.assign(section.path)}
                >
                  {section.name}
                </Button>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
