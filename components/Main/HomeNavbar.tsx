"use client";

import React from 'react';
import CustomLink from '../Templates/CustomLink';
import CustomButton from '../Templates/CustomButton';
import { useModalContext } from '@/context/ModalContext';

const HomeNavbar:React.FC = () => {
  const { setModalState, setModalOpen } = useModalContext();

  const onLogInClick = () => {
    setModalState('signin');
    setModalOpen(true);
  };

  const onSignUpClick = () => {
    setModalState('signup');
    setModalOpen(true);
  };
  
  return (
    // https://tailwindflex.com/@sophia-baker/minimalistic-header-navbar
    <div className="fixed top-0 left-0 z-50 w-full bg-gray-100 px-16 pt-8 pb-6">
      <nav className="relative flex flex-row items-center justify-between sm:h-10">
        {/* Left content */}
        <div className="flex items-center gap-4 w-auto">
          <a href="/home">
            <img className="w-auto h-10" src="https://www.svgrepo.com/show/448244/pack.svg" loading="lazy" width="202" height="40" />
          </a>
          <p className="hidden md:block text-xl font-medium text-gray-500">
            Notes App
          </p>
        </div>

        {/* Middle content */}
        <div className="hidden md:flex md:gap-8 lg:gap-16">
          <CustomLink href="/home">Home</CustomLink>
          <CustomLink href="/home">Gallery</CustomLink>
          <CustomLink href="/home">Blog</CustomLink>
        </div>

        {/* Right content */}
        <div>
          <div className="hidden md:flex md:gap-4">
            <CustomButton type='secondary' onClick={onSignUpClick}>Sign up</CustomButton>
            <CustomButton type='primary' onClick={onLogInClick}>Log in</CustomButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center -mr-2 md:hidden">
            <button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"  type="button" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default HomeNavbar;