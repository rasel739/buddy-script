'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FormInputProps {
  name: string;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error?: string;
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  id,
  type = 'text',
  placeholder = '',
  className = '',
  required = false,
  error,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className='_social_login_form_input _mar_b14'>
          <label htmlFor={id} className='_form_label _mar_b8'>
            {label}
          </label>

          <input
            id={id}
            type={type}
            className={`form-control _form_input ${className}`}
            placeholder={placeholder}
            required={required}
            {...field}
          />

          {error && <small className='text-danger'>{error}</small>}
        </div>
      )}
    />
  );
};

export default FormInput;
