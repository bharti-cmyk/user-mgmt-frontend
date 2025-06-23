import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-semibold transition duration-200 focus:outline-none';

  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'border border-gray-300 text-gray-800 hover:bg-gray-100';

  return (
    <button className={clsx(baseStyles, variantStyles, className)} {...props}>
      {props.children}
    </button>
  );
};
