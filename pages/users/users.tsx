import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const UsersPage = () => {
  useRequireAuth();
  const { role, loading } = useUserRole();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading || loadingData) {
    return <div className='text-white'>Cargando...</div>;
  }

  if (role !== 'ADMIN') {
    return (
      <div className='flex h-screen bg-gray-600 text-white'>
        <Sidebar role={role} />
        <main className='flex-1 p-8'>
          <h1 className='text-xl'>No tienes permisos para ver esta página</h1>
        </main>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-600 text-white'>
      <Sidebar role={role} />

      <main className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-6'>Gestión de Usuarios</h1>

        <table className='w-full border border-black'>
          <thead className='bg-black text-white'>
            <tr>
              <th className='p-3 border border-gray-600 text-left'>Nombre</th>
              <th className='p-3 border border-gray-600 text-left'>Correo</th>
              <th className='p-3 border border-gray-600 text-left'>Teléfono</th>
              <th className='p-3 border border-gray-600 text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='hover:bg-gray-700'>
                <td className='p-3 border border-black bg-white text-black'>
                  {user.name}
                </td>
                <td className='p-3 border border-black bg-white text-black'>
                  {user.email}
                </td>
                <td className='p-3 border border-black bg-white text-black'>
                  {user.phone ?? '-'}
                </td>
                <td className='p-3 border border-black bg-white text-black'>
                  <Button
                    className='bg-blue-600 hover:bg-blue-700'
                    onClick={() => router.push(`/users/edit/${user.id}`)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UsersPage;
