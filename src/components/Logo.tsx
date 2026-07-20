import React from 'react';
// @ts-ignore
import documatchLogo from '../assets/images/documatch_logo_1784541285669.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Set sizes to be exactly 20% larger than the original layout values
  const sizeStyles = {
    sm: { width: '3.0rem', height: '3.0rem' },
    md: { width: '4.5rem', height: '4.5rem' },
    lg: { width: '6.6rem', height: '6.6rem' },
  };

  return (
    <div
      className={`${className} flex-shrink-0 select-none overflow-hidden flex items-center justify-center rounded-xl bg-transparent`}
      style={sizeStyles[size]}
    >
      <img
        src={documatchLogo}
        alt="Documatch Lab Logo"
        // Crop out the outer metallic border frame perfectly by scaling the image up and hiding the overflow
        className="w-full h-full object-cover scale-[1.32] select-none"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
