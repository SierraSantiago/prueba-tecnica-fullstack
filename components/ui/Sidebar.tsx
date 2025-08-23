import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/prevalentware_logo.jpg";


interface SidebarProps {
  role: "ADMIN" | "USER";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const router = useRouter();

  const sections = [
    { name: "Ingresos y Egresos", path: "/movements/movements", roles: ["ADMIN", "USER"] },
    { name: "Usuarios", path: "/users/users", roles: ["ADMIN"] },
    { name: "Reportes", path: "/reports/reports", roles: ["ADMIN"] },
  ];

  return (
    
    <aside className="w-60 bg-gray-800 text-white shadow-md p-4 flex flex-col justify-center gap-7 h-screen">
      <Image
        src={logo}
        alt="Sidebar Logo"
        width={96}
        height={96}
        className="mx-auto mb-44 w-24 h-24 object-contain rounded "
      />
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
