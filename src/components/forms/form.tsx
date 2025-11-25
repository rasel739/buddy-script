'use client';

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  Resolver,
  DefaultValues,
} from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  children: React.ReactNode | React.ReactElement;
  submitHandler: SubmitHandler<T>;
  options?: UseFormProps<T>;
  resolver?: Resolver<T>;
  defaultValues?: DefaultValues<T>;
  className?: string;
};

const Form = <T extends FieldValues>({
  children,
  submitHandler,
  options,
  resolver,
  defaultValues,
  className = '',
}: FormProps<T>) => {
  const methods = useForm<T>({
    ...options,
    resolver,
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler as SubmitHandler<FieldValues>)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
