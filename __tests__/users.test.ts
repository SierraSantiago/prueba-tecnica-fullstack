import { createMocks } from 'node-mocks-http';
import { getUsers, getUserById, updateUser } from '../lib/user/user.controller';
import { UserService } from '../lib/user/user.service';

jest.mock('../lib/user/user.service');

describe('User API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  // probar el endpoint de obtener todos los usuarios
  test('GET /api/users returns 200 with users', async () => {
    const mockUsers = [
      { id: '1', name: 'Santiago', email: 'santiago@mail.com', role: 'ADMIN' },
      { id: '2', name: 'Juan', email: 'juan@mail.com', role: 'USER' },
    ];
    (UserService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { req, res } = createMocks({
      method: 'GET',
    });

    await getUsers(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockUsers);
  });

  // probar el endpoint de obtener un usuario por ID
  test('GET /api/users/:id returns 200 with user data if found', async () => {
    const mockUser = {
      id: '1',
      name: 'Santiago',
      email: 'santiago@mail.com',
      role: 'ADMIN',
    };
    (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await getUserById(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockUser);
  });

  // probar el endpoint de obtener un usuario por ID que no existe
  test('PATCH /api/users/:id updates the user and returns 200', async () => {
    const updatedUser = { id: '1', name: 'Santiago Updated', role: 'USER' };
    (UserService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    const { req, res } = createMocks({
      method: 'PATCH',
      query: { id: '1' },
      body: { name: 'Santiago Updated', role: 'USER' },
    });

    await updateUser(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(updatedUser);
  });
});
