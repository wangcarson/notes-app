import React from 'react';

type OAuthButtonProps = {
  onClick?: () => void,
  children?: React.ReactNode,
};

const OAuthButton:React.FC<OAuthButtonProps> = ({ onClick, children }) => {
  
  return (
    <button onClick={onClick}
      className="h-10 w-full gap-2 p-2 inline-flex items-center justify-center 
      rounded-lg outline-none bg-white border border-slate-300
      text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60
      hover:ring-0 hover:ring-gray-500 hover:ring-offset-1 hover:cursor-pointer"
    >
      { children }
    </button>
  )
}
export default OAuthButton;