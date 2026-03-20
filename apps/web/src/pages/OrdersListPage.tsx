import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatMoney, useOrdersQuery, type OrderStatus } from '@orders/shared';
import { Layout } from '../components/Layout';
import { ordersRepository } from '../app/ordersRepository';
import { StatusFilter } from '../components/StatusFilter';
import { RetryState } from '../components/RetryState';

export const OrdersListPage = () => {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const ordersQuery = useOrdersQuery({ repository: ordersRepository, status });

  if (ordersQuery.isPending) {
    return (
      <Layout>
        <section className="state-box">Loading orders...</section>
      </Layout>
    );
  }

  if (ordersQuery.isError) {
    return (
      <Layout>
        <StatusFilter value={status} onChange={setStatus} />
        <RetryState
          title="Could not load orders"
          description="Try again. You can also test the API without error mode."
          onRetry={() => ordersQuery.refetch()}
        />
      </Layout>
    );
  }

  if (!ordersQuery.data || ordersQuery.data.length === 0) {
    return (
      <Layout>
        <StatusFilter value={status} onChange={setStatus} />
        <section className="state-box">
          <h2>No orders found</h2>
          <p>Change the status filter or try reloading the data.</p>
          <button onClick={() => ordersQuery.refetch()}>Retry</button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <StatusFilter value={status} onChange={setStatus} />
      <ul className="orders-list">
        {ordersQuery.data.map((order) => (
          <li key={order.id} className="order-card">
            <div>
              <h3>{order.number}</h3>
              <p>{order.customerName}</p>
              <p className="muted">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p>{formatMoney(order.totalAmount, order.currency)}</p>
              <p className={`status status-${order.status}`}>{order.status}</p>
              <Link to={`/orders/${order.id}`}>Open details</Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
