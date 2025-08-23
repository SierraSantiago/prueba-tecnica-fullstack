import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/button';
import { CSVLink } from 'react-csv';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Movement {
  id: number;
  concept: string;
  amount: number;
  date: string;
  user: { id: string; name: string };
}

const ReportsPage = () => {
  useRequireAuth();
  const { role, loading } = useUserRole();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await fetch('/api/movements');
        const data: Movement[] = await res.json();
        data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setMovements(data);

        // Calcular saldo
        const total = data.reduce((acc, m) => acc + m.amount, 0);
        setBalance(total);
      } catch (err) {
        console.error('Error fetching movements:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchMovements();
  }, []);

  if (loading || loadingData)
    return <div className='text-white'>Cargando...</div>;
  if (role !== 'ADMIN')
    return (
      <div className='flex h-screen bg-gray-600 text-white'>
        <Sidebar role={role} />
        <main className='flex-1 p-8'>
          <h1 className='text-xl'>No tienes permisos para ver esta página</h1>
        </main>
      </div>
    );

  const csvData = movements.map((m) => ({
    Concepto: m.concept,
    Monto: m.amount,
    Fecha: new Date(m.date).toLocaleDateString(),
    Usuario: m.user.name,
  }));

  return (
    <div className='flex h-screen bg-gray-600 text-white'>
      <Sidebar role={role} />
      <main className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-6'>Reportes Financieros</h1>

        <div className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>
            Saldo: ${balance.toFixed(2)}
          </h2>
        </div>

        <div className='mb-6 w-full h-64 border-black text-white'>
          <ResponsiveContainer>
            <LineChart
              data={movements.map((m) => ({ date: m.date, amount: m.amount }))}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#000000' />
              <XAxis
                dataKey='date'
                stroke='#000000'
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis stroke='#000000' />
              <Tooltip
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monto']}
              />

              <Line type='monotone' dataKey='amount' stroke='#000000' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <CSVLink data={csvData} filename={'movimientos.csv'}>
          <Button className='bg-green-600 hover:bg-green-700'>
            Descargar CSV
          </Button>
        </CSVLink>
      </main>
    </div>
  );
};

export default ReportsPage;
