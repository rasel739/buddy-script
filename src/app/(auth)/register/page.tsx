'use client';

import ShapeBlock from '@/components/auth/shape-block';
import Form from '@/components/forms/form';
import FormCheckBox from '@/components/forms/form-checkbox';
import FormInput from '@/components/forms/form-input';
import Button, { SocialButton } from '@/components/ui/button';
import { RegisterFormData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearError, register } from '@/redux/features/authSlice';
import { registerSchema } from '@/schema';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      toast.success('Registration successful!');
      router.push('/');
    }
  };

  return (
    <section className='_social_registration_wrapper _layout_main_wrapper'>
      <ShapeBlock />
      <div className='_social_registration_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_registration_right'>
                <div className='_social_registration_right_image'>
                  <Image
                    src='/images/registration.png'
                    alt='Registration illustration'
                    width={500}
                    height={500}
                  />
                </div>
                <div className='_social_registration_right_image_dark'>
                  <Image
                    src='/images/registration1.png'
                    alt='Registration dark illustration'
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_registration_content'>
                <div className='_social_registration_right_logo _mar_b28'>
                  <Image
                    src='/images/logo.svg'
                    alt='Company logo'
                    className='_right_logo'
                    width={158}
                    height={33}
                  />
                </div>
                <p className='_social_registration_content_para _mar_b8'>Get Started Now</p>
                <h4 className='_social_registration_content_title _titl4 _mar_b50'>Registration</h4>

                <SocialButton provider='google' className='_mar_b40'>
                  Register with google
                </SocialButton>
                <div className='_social_registration_content_bottom_txt _mar_b40'>
                  <span>Or</span>
                </div>
                <Form
                  submitHandler={onSubmit}
                  resolver={yupResolver(registerSchema)}
                  defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    repeatPassword: '',
                    agreeToTerms: false,
                  }}
                >
                  <div className='_social_registration_form'>
                    <div className='row'>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                        <FormInput
                          name='firstName'
                          label='First Name'
                          type='text'
                          id='firstName'
                          className='_social_login_input'
                          required
                        />
                        <FormInput
                          name='lastName'
                          label='Last Name'
                          type='text'
                          id='lastName'
                          className='_social_login_input'
                          required
                        />

                        <FormInput
                          name='email'
                          label='Email'
                          type='email'
                          id='email'
                          className='_social_login_input'
                          required
                        />

                        <FormInput
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          className='_social_login_input'
                          required
                        />
                        <FormInput
                          name='repeatPassword'
                          label='Repeat Password'
                          type='password'
                          id='repeatPassword'
                          className='_social_login_input'
                          required
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-xl-12 col-md-12 col-sm-12'>
                        <FormCheckBox
                          name='agreeToTerms'
                          label=' I agree to terms & conditions'
                          id='agreeToTerms'
                          type='radio'
                          className='_social_login_form_check'
                          inputClassName='_social_login_form_check_input'
                          labelClassName='_social_registration_form_check_label'
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12 col-xl-12 col-sm-12'>
                        <div className='_social_registration_form_btn _mar_t40 _mar_b60'>
                          <Button
                            type='submit'
                            variant='primary'
                            className='_btn1'
                            size='md'
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                          >
                            {isLoading ? 'Registering...' : 'Register now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
                <div className='row'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                    <div className='_social_registration_bottom_txt'>
                      <p className='_social_registration_bottom_txt_para'>
                        Already have an account? <Link href='/login'>Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
