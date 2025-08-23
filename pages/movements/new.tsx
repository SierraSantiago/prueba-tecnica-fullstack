import { useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/button';
import { useUserRole } from '@/hooks/useUserRole';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const NewMovementPage = () => {
  useRequireAuth();
  const { role, loading } = useUserRole();
  const router = useRouter();
  const user = useCurrentUser();

  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('');

  if (loading) {
    return <div className='text-white'>Cargando...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isoDate = new Date(date).toISOString();

      const res = await fetch('/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept,
          amount,
          date: isoDate,
          userId: user?.id,
        }),
      });

      if (!res.ok) throw new Error('Error creando movimiento');

      router.push('/movements/movements');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al crear el movimiento');
    }
  };

  if (role !== 'ADMIN') {
    return (
      <div className='flex h-screen bg-gray-600 text-white'>
        <Sidebar role={role} />
        <main className='flex-1 p-8'>
          <h1 className='text-xl'>No tienes permisos para crear movimientos</h1>
        </main>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-600 text-white'>
      <Sidebar role={role} />
      <main className='flex-1 p-8'>
        <h1 className='text-2xl font-bold mb-6'>Nuevo Movimiento</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 max-w-md bg-gray-800 p-6 rounded-lg shadow-md'
        >
          <div>
            <label className='block mb-2'>Concepto</label>
            <input
              type='text'
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>

          <div>
            <label className='block mb-2'>Monto</label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>

          <div>
            <label className='block mb-2'>Fecha</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>

          <Button type='submit' className='bg-green-600 hover:bg-green-700'>
            Guardar
          </Button>
        </form>
      </main>
    </div>
  );
};

export default NewMovementPage;
