'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FormCheckBoxProps {
  name: string;
  label: string;
  id: string;
  type?: 'checkbox' | 'radio';
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
}

const FormCheckBox: FC<FormCheckBoxProps> = ({
  name,
  label,
  id,
  type = 'checkbox',
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`form-check ${className}`}>
          <input
            id={id}
            type={type}
            className={`form-check-input ${inputClassName}`}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />

          <label htmlFor={id} className={`form-check-label ${labelClassName}`}>
            {label}
          </label>

          {error && <small className='text-danger'>{error}</small>}
        </div>
      )}
    />
  );
};

export default FormCheckBox;
