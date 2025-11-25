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
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className='_social_login_form_input _mar_b14'>
          <label htmlFor={id} className='_form_label _mar_b8'>
            {label}
            {/* {required && <span className='text-danger ms-1'>*</span>} */}
          </label>

          <input
            id={id}
            type={type}
            className={`form-control _form_input ${className} ${errorMessage ? 'is-invalid' : ''}`}
            placeholder={placeholder}
            required
            {...field}
            {...register(name)}
          />

          {errorMessage && <small className='text-danger d-block mt-1'>{errorMessage}</small>}
        </div>
      )}
    />
  );
};

export default FormInput;
