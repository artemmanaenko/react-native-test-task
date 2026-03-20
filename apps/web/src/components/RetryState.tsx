type Props = {
  title: string;
  description: string;
  onRetry: () => void;
};

export const RetryState = ({ title, description, onRetry }: Props) => {
  return (
    <section className="state-box">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onRetry}>Retry</button>
    </section>
  );
};
