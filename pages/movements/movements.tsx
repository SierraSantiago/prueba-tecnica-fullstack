import { useEffect, useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/Sidebar";
import { useRouter } from "next/router";

interface Movement {
    id: number;
    concept: string;
    amount: number;
    date: string;
    user: {
        id: string;
        name: string;
    };
}

const MovementsPage = () => {
    useRequireAuth();
    const { role, loading } = useUserRole();
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const res = await fetch("/api/movements");
                const data = await res.json();
                setMovements(data);
            } catch (err) {
                console.error("Error fetching movements:", err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchMovements();
    }, []);

    if (loading || loadingData) {
        return <div className="text-white">Cargando...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-600 text-white">

            <Sidebar role={role} />

            {/* Contenido principal */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Vista de Ingresos y Egresos</h1>

                    {role === "ADMIN" && (
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => router.push("/movements/new")}
                        >
                            Nuevo
                        </Button>
                    )}
                </div>

                <table className="w-full border border-black">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-3 border border-gray-600 text-left">Concepto</th>
                            <th className="p-3 border border-gray-600 text-left">Monto</th>
                            <th className="p-3 border border-gray-600 text-left">Fecha</th>
                            <th className="p-3 border border-gray-600 text-left">Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-700">
                                <td className="p-3 border border-black bg-white text-black">{m.concept}</td>
                                <td className="p-3 border border-black bg-white text-black">
                                    ${m.amount.toFixed(2)}
                                </td>
                                <td className="p-3 border border-black bg-white text-black">
                                    {new Date(m.date).toLocaleDateString()}
                                </td>
                                <td className="p-3 border border-black bg-white text-black">
                                    {m.user?.name ?? "Desconocido"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default MovementsPage;
