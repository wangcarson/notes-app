import Link from 'next/link';
import React from 'react';

type LinkProps = {
  href: string,
  className?: string,
  children: React.ReactNode
};

const CustomLink:React.FC<LinkProps> = ({ className, href, children }) => {
  return (
    <Link href={href} className={`${className} text-base font-normal text-gray-500 list-none hover:text-gray-900`} target="">
      { children }
    </Link>
  );
}
export default CustomLink;