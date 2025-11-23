'use client';

import Icons from '@/lib/icons';
import { FC } from 'react';

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search here...',
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form className='position-relative d-flex align-items-center' onSubmit={handleSubmit}>
      <Icons.Search
        className='position-absolute'
        style={{
          left: '14px',
          width: '18px',
          height: '18px',
          color: '#6c757d',
        }}
      />

      <input
        className='form-control rounded-pill ps-5'
        type='search'
        placeholder={placeholder}
        aria-label='Search'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingTop: '8px',
          paddingBottom: '8px',
          fontSize: '14px',
        }}
      />
    </form>
  );
};

export default SearchInput;
