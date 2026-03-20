import { Link, useParams } from 'react-router-dom';
import {
  formatMoney,
  useCancelOrderMutation,
  useOrderDetailsQuery
} from '@orders/shared';
import { Layout } from '../components/Layout';
import { ordersRepository } from '../app/ordersRepository';
import { RetryState } from '../components/RetryState';

export const OrderDetailsPage = () => {
  const { id = '' } = useParams();
  const detailsQuery = useOrderDetailsQuery({ repository: ordersRepository, orderId: id });
  const { refetch } = detailsQuery;
  const cancelMutation = useCancelOrderMutation({
    repository: ordersRepository,
    orderId: id
  });

  if (detailsQuery.isPending) {
    return (
      <Layout>
        <section className="state-box">Loading order details...</section>
      </Layout>
    );
  }

  if (detailsQuery.isError) {
    return (
      <Layout>
        <Link to="/orders">Back to list</Link>
        <RetryState
          title="Could not load order details"
          description="Retry the request."
          onRetry={() => refetch()}
        />
      </Layout>
    );
  }

  if (!detailsQuery.data) {
    return (
      <Layout>
        <Link to="/orders">Back to list</Link>
        <section className="state-box">
          <h2>Order not found</h2>
          <button onClick={() => refetch()}>Retry</button>
        </section>
      </Layout>
    );
  }

  const order = detailsQuery.data;

  return (
    <Layout>
      <Link to="/orders">Back to list</Link>
      <article className="details-card">
        <h2>{order.number}</h2>
        <p>Customer: {order.customerName}</p>
        <p>Status: {order.status}</p>
        <p>Total: {formatMoney(order.totalAmount, order.currency)}</p>
        <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
        <p>Address: {order.shippingAddress}</p>
        {order.notes ? <p>Notes: {order.notes}</p> : null}
        <p>Can be cancelled: {order.canBeCancelled ? 'Yes' : 'No'}</p>
        {cancelMutation.isError ? (
          <p className="error-text">Could not cancel the order. Please retry.</p>
        ) : null}
        {order.canBeCancelled ? (
          <button
            onClick={() => cancelMutation.mutate()}
            disabled={cancelMutation.isPending}
          >
            {cancelMutation.isPending ? 'Cancelling...' : 'Cancel order'}
          </button>
        ) : null}

        <h3>Items</h3>
        <ul className="items-list">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <span>
                {item.quantity} x {formatMoney(item.price, order.currency)}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
};
