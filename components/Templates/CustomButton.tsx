import React from 'react';

type ButtonProps = {
  colour: string,
  hoverColour?: string,
  outline?: boolean,
  onClick?: () => void,
  className?: string,
  children: React.ReactNode
};

const CustomButton:React.FC<ButtonProps> = ({ className, colour, hoverColour, outline, onClick, children }) => {
  var buttonClass = outline
    ? `bg-white text-${colour} border-${colour} border-3 hover:bg-gray-100`
    : `bg-${colour} text-white border-${colour} border-3 hover:bg-${hoverColour ?? colour}`

  return (
    <button 
      type="button" 
      className={`${buttonClass} ${className} font-medium rounded-lg text-md text-center hover:cursor-pointer`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default CustomButton;