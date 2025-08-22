import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface SidebarProps {
  role: "ADMIN" | "USER";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const router = useRouter();

  const sections = [
    { name: "Ingresos y Egresos", path: "/movements/movements", roles: ["ADMIN", "USER"] },
    { name: "Usuarios", path: "/users/users", roles: ["ADMIN"] },
    { name: "Reportes", path: "/reports", roles: ["ADMIN"] },
  ];

  return (
    <aside className="w-60 bg-gray-800 text-white shadow-md p-4 flex flex-col justify-center gap-7 h-screen">
      {sections
        .filter((s) => s.roles.includes(role))
        .map((section) => (
          <Button
            key={section.name}
            variant="outline"
            className="w-full text-black border-white hover:bg-gray-500 "
            onClick={() => router.push(section.path)}
          >
            {section.name}
          </Button>
        ))}
    </aside>
  );
};
