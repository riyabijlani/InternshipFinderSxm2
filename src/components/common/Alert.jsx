import React from 'react';
import { AlertTriangle, XCircle, Info } from 'lucide-react';

export const Alert = ({ title, children, variant = 'error' }) => {
  const variants = {
    error: {
      container: 'bg-red-50 border-red-500 text-red-700',
      icon: <XCircle className="h-5 w-5 text-red-400" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-500 text-yellow-700',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    },
    info: {
        container: 'bg-amber-50 border-amber-500 text-amber-700',
        icon: <Info className="h-5 w-5 text-amber-400" />,
    }
  };

  const selectedVariant = variants[variant];

  return (
    <div className={`${selectedVariant.container} border-l-4 p-4`} role="alert">
      <div className="flex">
        <div className="py-1 shrink-0">
          {selectedVariant.icon}
        </div>
        <div className="ml-3">
          <p className="font-bold">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};















