import { test, expect } from '@playwright/test';

test.describe('Inventory API (server.js)', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('/reset');
  });

  // TC-01
  test('TC-01 GET /items returns 200 and an array of 2 items', async ({ request }) => {
    const res = await request.get('/items');
    expect(res.status()).toBe(200);
    const items = await res.json();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  // TC-02
  test('TC-02 GET /items/1 returns 200 and the item', async ({ request }) => {
    const res = await request.get('/items/1');
    expect(res.status()).toBe(200);
    const item = await res.json();
    expect(item).toHaveProperty('id', 1);
  });

  // TC-03 (Ожидается падение — дефект D-A-01)
  test('TC-03 GET /items/999 returns 404 with error body', async ({ request }) => {
    const res = await request.get('/items/999');
    expect(res.status()).toBe(404);
    expect(await res.json()).toEqual({ error: 'not found' });
  });

  // TC-04
  test('TC-04 POST /items with valid body returns 201 and the new item', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'C-3', qty: 5 }
    });
    expect(res.status()).toBe(201);
    const item = await res.json();
    expect(item).toHaveProperty('id');
    expect(item.sku).toBe('C-3');
    expect(item.qty).toBe(5);
  });

  // TC-05
  test('TC-05 POST /items with qty 0 returns 201 (boundary)', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'C-4', qty: 0 }
    });
    expect(res.status()).toBe(201);
    const item = await res.json();
    expect(item.qty).toBe(0);
  });

  // TC-06 (Ожидается падение — дефект D-A-02)
  test('TC-06 POST /items with qty -1 returns 400 (boundary)', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'C-5', qty: -1 }
    });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'invalid qty' });
  });

  // TC-07
  test('TC-07 POST /items with invalid sku returns 400', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'bad sku!', qty: 1 }
    });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'invalid sku' });
  });

  // TC-08
  test('TC-08 PUT /items/1 updates and returns 200', async ({ request }) => {
    const res = await request.put('/items/1', {
      data: { sku: 'A-1-NEW', qty: 10 }
    });
    expect(res.status()).toBe(200);
    const item = await res.json();
    expect(item.sku).toBe('A-1-NEW');
    expect(item.qty).toBe(10);
  });

  // TC-09 (Ожидается падение — дефект D-A-03)
  test('TC-09 DELETE /items/1 returns 204 without body', async ({ request }) => {
    const res = await request.delete('/items/1');
    expect(res.status()).toBe(204);
    expect(await res.text()).toBe('');

    const getRes = await request.get('/items/1');
    expect(getRes.status()).toBe(404);
  });

  // TC-10
  test('TC-10 DELETE /items/999 returns 404', async ({ request }) => {
    const res = await request.delete('/items/999');
    expect(res.status()).toBe(404);
  });
});