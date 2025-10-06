interface ButtonProps {
  className?: string;
  colour?: string;
  hoverColour?: string;
  outline?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ className, colour = "#3b82f6", hoverColour, outline, onClick, children }) => {
  const isOutline = !!outline;
  const hoverColor = hoverColour ?? colour;

  const baseStyle = {
    backgroundColor: isOutline ? "white" : colour,
    color:           isOutline ? colour : "white",
    borderColor:     colour,
  } as React.CSSProperties;

  const hoverStyle = {
    backgroundColor: isOutline ? "#f3f4f6" : hoverColor,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={baseStyle}
      className={`border-2 font-medium rounded-lg text-md text-center transition-colors duration-200 cursor-pointer ${className}`}
      onMouseEnter={(e) => Object.assign((e.target as HTMLElement).style, hoverStyle)}
      onMouseLeave={(e) => Object.assign((e.target as HTMLElement).style, baseStyle)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
