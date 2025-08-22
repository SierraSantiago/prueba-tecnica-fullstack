import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Sidebar } from "@/components/ui/Sidebar";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/button";

const Home = () => {
  useRequireAuth(); 
  const { role, loading } = useUserRole();

  const sections = [
    { name: "Ingresos y Egresos", path: "/movements/movements", roles: ["ADMIN", "USER"] },
    { name: "Usuarios", path: "/users/users", roles: ["ADMIN"] },
    { name: "Reportes", path: "/reports", roles: ["ADMIN"] },
  ];

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

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
