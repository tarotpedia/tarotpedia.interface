'use client';

import { useTheme } from 'next-themes';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#1a1819] group-[.toaster]:text-[#c3beb6] group-[.toaster]:border-[#c19670]/30 group-[.toaster]:shadow-[0_0_20px_rgba(193,150,112,0.1)] font-[Caudex]',
          description: 'group-[.toast]:text-[#8a8580]',
          actionButton: 'group-[.toast]:bg-[#c19670] group-[.toast]:text-[#060506]',
          cancelButton: 'group-[.toast]:bg-[#1a1819] group-[.toast]:text-[#c3beb6]',
          success: 'group-[.toaster]:border-[#059669]/30 group-[.toaster]:text-[#059669]',
          error: 'group-[.toaster]:border-[#e11d48]/30 group-[.toaster]:text-[#e11d48]',
          warning: 'group-[.toaster]:border-[#c19670]/30 group-[.toaster]:text-[#c19670]',
          info: 'group-[.toaster]:border-[#d4a574]/30 group-[.toaster]:text-[#d4a574]',
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#059669]" />,
        info: <InfoIcon className="size-4 text-[#d4a574]" />,
        warning: <TriangleAlertIcon className="size-4 text-[#c19670]" />,
        error: <OctagonXIcon className="size-4 text-[#e11d48]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#c19670]" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
