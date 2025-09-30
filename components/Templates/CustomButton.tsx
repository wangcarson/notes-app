import React from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary',
  onClick?: () => void,
  className?: string,
  children: React.ReactNode
};

const CustomButton:React.FC<ButtonProps> = ({ className, type, onClick, children }) => {
  var buttonClasses: string;
  if (type === 'primary') {
    buttonClasses = `text-white bg-secondary border-secondary border-3`;
  } else {
    buttonClasses = `text-secondary bg-white border-secondary border-3`;
  }
  
  return (
    <button type="button" className={`${buttonClasses} ${className} font-medium rounded-lg text-md px-4 py-1.5 text-center hover:cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  );
}
export default CustomButton;