import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RetryState } from '../RetryState';

describe('RetryState', () => {
  it('renders content and calls retry handler', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <RetryState
        title="Could not load"
        description="Try once again"
        onRetry={onRetry}
      />
    );

    expect(screen.getByText('Could not load')).toBeInTheDocument();
    expect(screen.getByText('Try once again')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
