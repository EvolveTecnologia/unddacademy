import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  inverted?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
}) => {
  const logoSrc = '/assets/aistudio/undd_d2d4f396.jpg';

  const sizeMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-22',
  };

  const currentHeight = sizeMap[size] || sizeMap.md;

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none overflow-hidden rounded-xl ${className}`}>
        <img 
          src={logoSrc} 
          alt="UNDD Academy" 
          className="w-full h-full object-cover filter drop-shadow-md"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt="UNDD Academy - União Nacional de Docentes de Direita" 
        className={`${currentHeight} w-auto object-contain rounded-lg filter drop-shadow-md`}
        loading="eager"
      />
    </div>
  );
};

export default Logo;
