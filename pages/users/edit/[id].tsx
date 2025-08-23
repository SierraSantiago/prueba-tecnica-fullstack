import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/button';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useUserRole } from '@/hooks/useUserRole';

interface UserEditDTO {
  name: string;
  role: 'ADMIN' | 'USER';
}

const EditUserPage = () => {
  useRequireAuth();
  const { role, loading } = useUserRole();
  const router = useRouter();
  const { id } = router.query;

  const [userData, setUserData] = useState<UserEditDTO>({
    name: '',
    role: 'USER',
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('Error al obtener usuario');
        const data = await res.json();
        setUserData({ name: data.name, role: data.role });
      } catch (err) {
        console.error(err);
        alert('No se pudo cargar el usuario');
      } finally {
        setLoadingData(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading || loadingData) {
    return <div className='text-white'>Cargando...</div>;
  }

  if (role !== 'ADMIN') {
    return (
      <div className='flex h-screen bg-gray-600 text-white'>
        <Sidebar role={role} />
        <main className='flex-1 p-8'>
          <h1 className='text-xl'>No tienes permisos para editar usuarios</h1>
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error('Error al actualizar usuario');

      router.push('/users/users');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al actualizar el usuario');
    }
  };

  return (
    <div className='flex h-screen bg-gray-600 text-white'>
      <Sidebar role={role} />
      <main className='flex-1 p-8 '>
        <h1 className='text-2xl font-bold mb-6'>Editar Usuario</h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 max-w-md bg-gray-800 p-6 rounded-lg shadow-md '
        >
          <div>
            <label className='block mb-2'>Nombre</label>
            <input
              type='text'
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className='w-full p-2 rounded bg-gray-700 text-white'
              required
            />
          </div>

          <div>
            <label className='block mb-2'>Rol</label>
            <select
              value={userData.role}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  role: e.target.value as 'ADMIN' | 'USER',
                })
              }
              className='w-full p-2 rounded bg-gray-700 text-white'
            >
              <option value='USER'>USER</option>
              <option value='ADMIN'>ADMIN</option>
            </select>
          </div>

          <Button type='submit' className='bg-green-600 hover:bg-green-700'>
            Guardar Cambios
          </Button>
        </form>
      </main>
    </div>
  );
};

export default EditUserPage;
