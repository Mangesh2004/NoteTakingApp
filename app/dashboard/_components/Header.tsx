import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-end p-3 shadow-sm'>
      <UserButton/>
    </div>
  )
}
