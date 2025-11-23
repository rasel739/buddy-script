'use client';
import Button, { SocialButton } from '@/components/ui/button';
import Link from 'next/link';
import { FC, FormEvent, useState } from 'react';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Login submitted:', formData);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
  };

  return (
    <section className='_social_login_wrapper _layout_main_wrapper'>
      <div className='_shape_one'>
        <img src='/images/shape1.svg' alt='Shape decoration' className='_shape_img' />
        <img src='/images/dark_shape.svg' alt='Dark shape decoration' className='_dark_shape' />
      </div>
      <div className='_shape_two'>
        <img src='/images/shape2.svg' alt='Shape decoration' className='_shape_img' />
        <img
          src='/images/dark_shape1.svg'
          alt='Dark shape decoration'
          className='_dark_shape _dark_shape_opacity'
        />
      </div>
      <div className='_shape_three'>
        <img src='/images/shape3.svg' alt='Shape decoration' className='_shape_img' />
        <img
          src='/images/dark_shape2.svg'
          alt='Dark shape decoration'
          className='_dark_shape _dark_shape_opacity'
        />
      </div>
      <div className='_social_login_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_login_left'>
                <div className='_social_login_left_image'>
                  <img src='/images/login.png' alt='Login illustration' className='_left_img' />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_login_content'>
                <div className='_social_login_left_logo _mar_b28'>
                  <img src='/images/logo.svg' alt='Company logo' className='_left_logo' />
                </div>
                <p className='_social_login_content_para _mar_b8'>Welcome back</p>
                <h4 className='_social_login_content_title _titl4 _mar_b50'>
                  Login to your account
                </h4>

                <SocialButton
                  provider='google'
                  onClick={handleGoogleSignIn}
                  className='_mar_b40'
                  icon={<img src='/images/google.svg' alt='Google icon' className='_google_img' />}
                >
                  Or sign-in with google
                </SocialButton>
                <div className='_social_login_content_bottom_txt _mar_b40'>
                  <span>Or</span>
                </div>
                <form className='_social_login_form' onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                      <div className='_social_login_form_input _mar_b14'>
                        <label htmlFor='email' className='_social_login_label _mar_b8'>
                          Email
                        </label>
                        <input
                          type='email'
                          id='email'
                          className='form-control _social_login_input'
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                      <div className='_social_login_form_input _mar_b14'>
                        <label htmlFor='password' className='_social_login_label _mar_b8'>
                          Password
                        </label>
                        <input
                          type='password'
                          id='password'
                          className='form-control _social_login_input'
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 col-xl-6 col-md-6 col-sm-12'>
                      <div className='form-check _social_login_form_check'>
                        <input
                          className='form-check-input _social_login_form_check_input'
                          type='radio'
                          id='rememberMe'
                          checked={formData.rememberMe}
                          onChange={(e) =>
                            setFormData({ ...formData, rememberMe: e.target.checked })
                          }
                        />
                        <label
                          className='form-check-label _social_registration_form_check_label'
                          htmlFor='rememberMe'
                        >
                          Remember me
                        </label>
                      </div>
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
                        >
                          Login now
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
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
