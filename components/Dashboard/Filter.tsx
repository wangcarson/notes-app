import React from 'react';

import { NextPage } from 'next'

interface Props {
  children: React.ReactNode
}

const Filter: NextPage<Props> = ({ children }) => {
  return (
    <button 
        className="h-8 md:w-40 w-32 flex flex-row gap-2 justify-between items-center bg-white border-1 border-gray-300 rounded-sm px-3 cursor-pointer" 
        type="button"
    >
        <div className="flex-1 shrink text-start text-sm text-nowrap overflow-hidden">
            { children } 
        </div>
        <svg className="w-2 h-2 flex-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
    </button>
  )
}

export default Filter;