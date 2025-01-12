import { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';

const XIcon = forwardRef<SVGSVGElement, Omit<LucideProps, 'ref'>>((props, ref) => {
  return (
    <svg
      ref={ref}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 300 271"
      fill="currentColor"
    >
      <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
    </svg>
  );
});

XIcon.displayName = 'XIcon';

export default XIcon;