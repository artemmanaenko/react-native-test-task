import cors from 'cors';
import express from 'express';
import {
  canCancelOrderStatus,
  createInitialOrders,
  toOrderSummary
} from './orders.data';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const forceError = process.env.FORCE_ERROR === 'true';

app.use(cors());
app.use(express.json());

let ordersState = createInitialOrders();

const randomDelay = () => 300 + Math.floor(Math.random() * 400);
const wait = (delayMs: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

const shouldFail = (failFlag: unknown) => forceError || String(failFlag) === 'true';

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/reset', (_req, res) => {
  ordersState = createInitialOrders();
  res.json({ status: 'reset' });
});

app.get('/orders', async (req, res) => {
  await wait(randomDelay());

  if (shouldFail(req.query.fail)) {
    res.status(500).json({ message: 'Mock failure for orders list' });
    return;
  }

  res.json(ordersState.map(toOrderSummary));
});

app.get('/orders/:id', async (req, res) => {
  await wait(randomDelay());

  if (shouldFail(req.query.fail)) {
    res.status(500).json({ message: 'Mock failure for order details' });
    return;
  }

  const order = ordersState.find((item) => item.id === req.params.id);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  res.json(order);
});

app.post('/orders/:id/cancel', async (req, res) => {
  await wait(randomDelay());

  if (shouldFail(req.query.fail)) {
    res.status(500).json({ message: 'Mock failure for cancel order' });
    return;
  }

  const orderIndex = ordersState.findIndex((item) => item.id === req.params.id);

  if (orderIndex === -1) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  const order = ordersState[orderIndex];

  if (!canCancelOrderStatus(order.status)) {
    res.status(409).json({ message: 'Order cannot be cancelled in its current status' });
    return;
  }

  const updatedOrder = {
    ...order,
    status: 'cancelled' as const,
    canBeCancelled: false,
    notes: order.notes ?? 'Cancelled by user.'
  };

  ordersState[orderIndex] = updatedOrder;

  res.json(updatedOrder);
});

app.listen(port, () => {
  console.log(`Mock API listening on http://localhost:${port}`);
});
