import { ReactionType } from '@/types';
import Image from 'next/image';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'social'
  | 'icon'
  | 'link'
  | 'dropdown'
  | 'reaction';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type IconPosition = 'left' | 'right' | 'only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  active?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  active = false,
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  const getButtonClasses = (): string => {
    const baseClasses = '_btn';
    const variantClasses = {
      primary: '_btn_primary',
      secondary: '_btn_secondary',
      social: '_social_login_content_btn',
      icon: '_icon_btn',
      link: '_btn_link',
      dropdown: '_dropdown_btn',
      reaction: '_feed_reaction',
    };

    const sizeClasses = {
      sm: '_btn_sm',
      md: '_btn_md',
      lg: '_btn_lg',
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      active && '_active',
      fullWidth && '_full_width',
      loading && '_loading',
      className,
    ];

    return classes.filter(Boolean).join(' ');
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses =
      iconPosition === 'only' ? '' : iconPosition === 'left' ? '_icon_left' : '_icon_right';

    return <span className={`_btn_icon ${iconClasses}`}>{icon}</span>;
  };

  const renderLoader = () => {
    if (!loading) return null;

    return (
      <span className='_btn_loader'>
        <svg className='_spinner' viewBox='0 0 50 50'>
          <circle className='_spinner_path' cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
        </svg>
      </span>
    );
  };

  return (
    <button type={type} className={getButtonClasses()} disabled={disabled || loading} {...props}>
      {loading && renderLoader()}
      {!loading && iconPosition === 'left' && renderIcon()}
      {iconPosition !== 'only' && children && <span className='_btn_text'>{children}</span>}
      {!loading && iconPosition === 'right' && renderIcon()}
      {iconPosition === 'only' && renderIcon()}
    </button>
  );
};

export const SocialButton: React.FC<
  Omit<ButtonProps, 'variant'> & {
    provider: 'google';
  }
> = ({ provider, children, ...props }) => {
  const icons = {
    google: (
      <Image
        src='/images/google.svg'
        alt='Google icon'
        className='_google_img'
        width={20}
        height={20}
      />
    ),
  };

  return (
    <Button variant='social' icon={icons[provider]} iconPosition='left' {...props}>
      {children}
    </Button>
  );
};

export const IconButton: React.FC<Omit<ButtonProps, 'variant' | 'iconPosition'>> = ({
  icon,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <Button variant='icon' icon={icon} iconPosition='only' aria-label={ariaLabel} {...props} />
  );
};

export const ReactionButton: React.FC<
  Omit<ButtonProps, 'variant'> & {
    reactionType?: ReactionType;
  }
> = ({ reactionType, active, children, icon, ...props }) => {
  return (
    <Button variant='reaction' icon={icon} iconPosition='left' active={active} {...props}>
      {children}
    </Button>
  );
};

export default Button;
