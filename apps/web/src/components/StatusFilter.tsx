import type { OrderStatus } from '@orders/shared';

type Props = {
  value: OrderStatus | 'all';
  onChange: (status: OrderStatus | 'all') => void;
};

const statuses: Array<OrderStatus | 'all'> = [
  'all',
  'new',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
];

export const StatusFilter = ({ value, onChange }: Props) => {
  return (
    <label className="filter">
      Status
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as OrderStatus | 'all')}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>
  );
};
