'use client';
import { RegisterFormData } from '@/types';
import Link from 'next/link';
import { FC, FormEvent, useState } from 'react';

const Register: FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: true,
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration submitted:', formData);
    }
  };

  const handleGoogleRegister = () => {
    // Handle Google registration logic
    console.log('Google registration clicked');
  };

  return (
    <section className='_social_registration_wrapper _layout_main_wrapper'>
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
      <div className='_social_registration_wrap'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
              <div className='_social_registration_right'>
                <div className='_social_registration_right_image'>
                  <img src='/images/registration.png' alt='Registration illustration' />
                </div>
                <div className='_social_registration_right_image_dark'>
                  <img src='/images/registration1.png' alt='Registration dark illustration' />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
              <div className='_social_registration_content'>
                <div className='_social_registration_right_logo _mar_b28'>
                  <img src='/images/logo.svg' alt='Company logo' className='_right_logo' />
                </div>
                <p className='_social_registration_content_para _mar_b8'>Get Started Now</p>
                <h4 className='_social_registration_content_title _titl4 _mar_b50'>Registration</h4>
                <button
                  type='button'
                  className='_social_registration_content_btn _mar_b40'
                  onClick={handleGoogleRegister}
                >
                  <img src='/images/google.svg' alt='Google icon' className='_google_img' />{' '}
                  <span>Register with google</span>
                </button>
                <div className='_social_registration_content_bottom_txt _mar_b40'>
                  <span>Or</span>
                </div>
                <form className='_social_registration_form' onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                      <div className='_social_registration_form_input _mar_b14'>
                        <label htmlFor='email' className='_social_registration_label _mar_b8'>
                          Email
                        </label>
                        <input
                          type='email'
                          id='email'
                          className='form-control _social_registration_input'
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                      <div className='_social_registration_form_input _mar_b14'>
                        <label htmlFor='password' className='_social_registration_label _mar_b8'>
                          Password
                        </label>
                        <input
                          type='password'
                          id='password'
                          className='form-control _social_registration_input'
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                      <div className='_social_registration_form_input _mar_b14'>
                        <label
                          htmlFor='repeatPassword'
                          className='_social_registration_label _mar_b8'
                        >
                          Repeat Password
                        </label>
                        <input
                          type='password'
                          id='repeatPassword'
                          className='form-control _social_registration_input'
                          value={formData.repeatPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, repeatPassword: e.target.value })
                          }
                          required
                        />
                        {errors.repeatPassword && (
                          <small className='text-danger'>{errors.repeatPassword}</small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-12 col-xl-12 col-md-12 col-sm-12'>
                      <div className='form-check _social_registration_form_check'>
                        <input
                          className='form-check-input _social_registration_form_check_input'
                          type='checkbox'
                          id='agreeToTerms'
                          checked={formData.agreeToTerms}
                          onChange={(e) =>
                            setFormData({ ...formData, agreeToTerms: e.target.checked })
                          }
                        />
                        <label
                          className='form-check-label _social_registration_form_check_label'
                          htmlFor='agreeToTerms'
                        >
                          I agree to terms & conditions
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-lg-12 col-md-12 col-xl-12 col-sm-12'>
                      <div className='_social_registration_form_btn _mar_t40 _mar_b60'>
                        <button type='submit' className='_social_registration_form_btn_link _btn1'>
                          Register now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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
