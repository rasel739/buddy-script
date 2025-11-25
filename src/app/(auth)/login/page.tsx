'use client';

import ShapeBlock from '@/components/auth/shape-block';
import Form from '@/components/forms/form';
import FormCheckBox from '@/components/forms/form-checkbox';
import FormInput from '@/components/forms/form-input';
import Button, { SocialButton } from '@/components/ui/button';
import { LoginType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearError, login } from '@/redux/features/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schema';

const Login: FC = () => {
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

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      toast.success('Login successful!');
      router.push('/');
    }
  };

  const handleGoogleSignIn = () => {
    toast.error('Google sign-in not implemented yet');
  };

  return (
    <section className='_social_login_wrapper _layout_main_wrapper'>
      <ShapeBlock />
      <div className='_social_login_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_login_left'>
                <div className='_social_login_left_image'>
                  <Image
                    src='/images/login.png'
                    alt='Login'
                    className='_left_img'
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_login_content'>
                <div className='_social_login_left_logo _mar_b28'>
                  <Image
                    src='/images/logo.svg'
                    alt='Company logo'
                    className='_left_logo'
                    width={158}
                    height={33}
                  />
                </div>
                <p className='_social_login_content_para _mar_b8'>Welcome back</p>
                <h4 className='_social_login_content_title _titl4 _mar_b50'>
                  Login to your account
                </h4>

                <SocialButton provider='google' onClick={handleGoogleSignIn} className='_mar_b40'>
                  Or sign-in with google
                </SocialButton>
                <div className='_social_login_content_bottom_txt _mar_b40'>
                  <span>Or</span>
                </div>
                <Form
                  submitHandler={onSubmit}
                  resolver={yupResolver(loginSchema)}
                  defaultValues={{ email: '', password: '', rememberMe: false }}
                >
                  <div className='_social_login_form'>
                    <div className='row'>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
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
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6 col-xl-6 col-md-6 col-sm-12'>
                        <FormCheckBox
                          name='rememberMe'
                          label='Remember me'
                          id='rememberMe'
                          type='radio'
                          className='_social_login_form_check'
                          inputClassName='_social_login_form_check_input'
                          labelClassName='_social_registration_form_check_label'
                        />
                      </div>
                      <div className='col-lg-6 col-xl-6 col-md-6 col-sm-12'>
                        <div className='_social_login_form_left'>
                          <p className='_social_login_form_left_para'>Forgot password?</p>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12 col-xl-12 col-sm-12'>
                        <div className='_social_login_form_btn _mar_t40 _mar_b60'>
                          <Button
                            type='submit'
                            variant='primary'
                            className='_btn1'
                            size='md'
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                          >
                            {isLoading ? 'Logging in...' : 'Login now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
                <div className='row'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                    <div className='_social_login_bottom_txt'>
                      <p className='_social_login_bottom_txt_para'>
                        Don&apos;t have an account? <Link href='/register'>Create New Account</Link>
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

export default Login;
