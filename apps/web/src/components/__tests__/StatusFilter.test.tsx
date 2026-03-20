import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StatusFilter } from '../StatusFilter';

describe('StatusFilter', () => {
  it('calls onChange with selected status', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<StatusFilter value="all" onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText('Status'), 'delivered');

    expect(onChange).toHaveBeenCalledWith('delivered');
  });
});
