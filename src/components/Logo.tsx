import React, { useState } from 'react';
// @ts-ignore
import documatchLocalLogo from '../assets/images/documatch_official_logo.jpg';

const OFFICIAL_DOCUMATCH_LOGO_URL =
  'https://customer-assets.emergentagent.com/job_7fe777d6-9bad-4a97-9808-a97a60a006ea/artifacts/x40hmr43_nuevo%20logo%20documatch.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const [imgSrc, setImgSrc] = useState<string>(OFFICIAL_DOCUMATCH_LOGO_URL);

  const sizeClasses = {
    sm: 'h-8 sm:h-9 md:h-10 max-h-10',
    md: 'h-10 sm:h-12 max-h-12',
    lg: 'h-14 sm:h-16 max-h-16',
  };

  return (
    <div
      className={`${className} flex-shrink-0 select-none flex items-center justify-center rounded-none bg-transparent`}
    >
      <img
        src={imgSrc}
        alt="Documatch"
        onError={() => {
          if (imgSrc !== documatchLocalLogo && documatchLocalLogo) {
            setImgSrc(documatchLocalLogo);
          } else if (imgSrc !== '/documatch-logo.jpg') {
            setImgSrc('/documatch-logo.jpg');
          }
        }}
        className={`${sizeClasses[size]} w-auto max-w-[240px] object-contain select-none rounded-none`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
