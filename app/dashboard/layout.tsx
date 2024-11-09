import React from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'

export default function Layout({children}:any) {
  return (
    <div>
      <div className='w-64 h-screen fixed'>
        <Sidebar/>
      </div>
      <div className='ml-64'>
        <Header/>
      <div>
      {children}
      </div>

      </div>
    </div>
  )
}
