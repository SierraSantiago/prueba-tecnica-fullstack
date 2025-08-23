import { createMocks } from 'node-mocks-http';
import {
  getMovements,
  createMovement,
} from '../lib/movements/movement.controller';
import { MovementService } from '../lib/movements/movement.service';

jest.mock('../lib/movements/movement.service');

describe('Movements API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // probar el endpoint de obtener todos los movimientos
  test('GET /api/movements returns 200 with list of movements', async () => {
    const mockMovements = [
      {
        id: 1,
        concept: 'Compra',
        amount: 50,
        date: new Date().toISOString(),
        user: { id: '1', name: 'Santiago' },
      },
      {
        id: 2,
        concept: 'Venta',
        amount: 150,
        date: new Date().toISOString(),
        user: { id: '2', name: 'Juan' },
      },
    ];
    (MovementService.getAllMovements as jest.Mock).mockResolvedValue(
      mockMovements
    );

    const { req, res } = createMocks({ method: 'GET' });
    await getMovements(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockMovements);
  });

  // probar el endpoint de crear un nuevo movimiento
  test('POST /api/movements creates a new movement', async () => {
    const newMovement = {
      concept: 'Test',
      amount: 100,
      date: new Date().toISOString(),
      userId: 'user_123',
    };
    const createdMovement = {
      ...newMovement,
      id: 1,
      user: { id: 'user_123', name: 'Santiago' },
    };

    (MovementService.createMovement as jest.Mock).mockResolvedValue(
      createdMovement
    );

    const { req, res } = createMocks({ method: 'POST', body: newMovement });
    await createMovement(req as any, res as any);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(createdMovement);
  });

  // probar el endpoint de crear un nuevo movimiento con campos faltantes
  test('POST /api/movements fails if missing fields', async () => {
    const incompleteMovement = { concept: 'Test' }; // falta amount, date, userId
    (MovementService.createMovement as jest.Mock).mockImplementation(() => {
      throw new Error('Missing fields');
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: incompleteMovement,
    });
    await expect(createMovement(req as any, res as any)).rejects.toThrow(
      'Missing fields'
    );
  });
});
