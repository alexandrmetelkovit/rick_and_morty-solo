import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Select } from './Select';

jest.mock('@/assets/icons/arrow_filter-down.svg?react', () => {
  return () => <svg data-testid='mock-svg' />;
});

jest.mock('./Select.scss', () => ({}));

const mockOptions = [
  { label: 'Human', value: 'human' },
  { label: 'Alien', value: 'alien' }
];

describe('Проверка на placeholder', () => {
  it('отображает placeholder', () => {
    render(
      <Select
        options={mockOptions}
        value=''
        mode='medium'
        placeholder='Species'
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Species')).toBeInTheDocument();
  });

  it('применяет класс select_small для mode === "small"', () => {
    const { container } = render(
      <Select
        options={mockOptions}
        value=''
        mode='small'
        placeholder='Species'
        onChange={() => {}}
      />
    );
    expect(container.firstChild).toHaveClass('select_small');
  });

  it('не применяет класс select_small для mode === "medium"', () => {
    const { container } = render(
      <Select
        options={mockOptions}
        value=''
        mode='medium'
        placeholder='Species'
        onChange={() => {}}
      />
    );
    expect(container.firstChild).not.toHaveClass('select_small');
  });
});
