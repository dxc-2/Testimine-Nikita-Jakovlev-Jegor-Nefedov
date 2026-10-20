const express = require('express');
const app = express();
app.use(express.json());

let items = [
  { id: 1, sku: 'A-1', qty: 5 },
  { id: 2, sku: 'B-2', qty: 0 }
];

app.post('/reset', (req, res) => {
  items = [
    { id: 1, sku: 'A-1', qty: 5 },
    { id: 2, sku: 'B-2', qty: 0 }
  ];
  res.status(200).json({ status: 'reset' });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'not found' });
  }
  res.json(item);
});

const skuRegex = /^[A-Za-z0-9-]+$/;

app.post('/items', (req, res) => {
  const { sku, qty } = req.body;
  if (!sku || typeof sku !== 'string' || !skuRegex.test(sku)) {
    return res.status(400).json({ error: 'invalid sku' });
  }
  if (qty === undefined || typeof qty !== 'number' || qty < 0) {
    return res.status(400).json({ error: 'invalid qty' });
  }

  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { id: newId, sku, qty };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'not found' });
  }

  const { sku, qty } = req.body;
  if (sku !== undefined) {
    if (typeof sku !== 'string' || !skuRegex.test(sku)) {
      return res.status(400).json({ error: 'invalid sku' });
    }
    item.sku = sku;
  }
  if (qty !== undefined) {
    if (typeof qty !== 'number' || qty < 0) {
      return res.status(400).json({ error: 'invalid qty' });
    }
    item.qty = qty;
  }

  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  items.splice(index, 1);
  res.status(204).send();
});

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;