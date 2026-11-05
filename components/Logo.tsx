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
  const logoSrc = '/assets/aistudio/undd_b1797e20.png';
  const flagSrc = '/assets/aistudio/7501795_59b517b5.png';

  const sizeMap = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  const currentHeight = sizeMap[size] || sizeMap.md;

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none overflow-hidden rounded-xl ${className}`}>
        <img 
          src={flagSrc} 
          alt="UNDD Academy" 
          className="w-full h-full object-contain filter drop-shadow-md"
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
        className={`${currentHeight} w-auto object-contain filter drop-shadow-md`}
        loading="eager"
      />
    </div>
  );
};

export default Logo;
