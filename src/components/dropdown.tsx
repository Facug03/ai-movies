'use client'

import { useState } from 'react'
import LeftArrow from './icons/LeftArrow'

interface Props {
  label: string
  dropdownTitle?: string
  items: { id: string; element: JSX.Element }[]
}

export default function Dropdown({ label, dropdownTitle, items }: Props) {
  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      {dropdown && (
        <div
          className='absolute left-0 top-0 z-40 h-dvh w-screen backdrop-brightness-75'
          onClick={() => setDropdown(false)}
        />
      )}
      <div className='relative'>
        <span className='mb-1 block text-m-t6 font-bold text-w-75 sm:text-t6'>{label}</span>
        <button
          onClick={() => setDropdown(!dropdown)}
          className='flex w-fit items-center justify-between gap-3 rounded-lg border-[1px] border-w-75 px-4 py-1 text-m-t7 font-medium
            text-w-75 sm:text-t6'
        >
          {dropdownTitle || 'Categories'}
          <LeftArrow styles='w-5 h-5 stroke-w-75 -rotate-90' />
        </button>

        {dropdown && (
          <div className='absolute top-[calc(100%+10px)] z-50 w-44 rounded-lg border-[1px] border-w-75 bg-b shadow'>
            <ul className='px-1 py-2 text-sm font-medium text-w-75'>
              {items.map((item) => (
                <li key={item.id}>{item.element}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
