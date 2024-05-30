"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

const SideBar = ({user}: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className='sidebar relative'>
      <nav className='flex flex-col gap-4'>
        <Link href="/" className="mb-12 cursor-pointer items-center flex gap-2">
          <Image src="/icons/logo.svg" height={34} width={34} alt='Logo' className='size-[24px] max-xl:size-14'></Image>
          <h1 className='sidebar-logo'>Horizon</h1>
        </Link>

        {
          sidebarLinks.map((item) => {
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
            return (
            <Link key={item.label} href={item.route} className={cn("sidebar-link", {"bg-bankGradient": isActive})}>
              <div className="relative size-6">
                <Image src={item.imgURL} alt={item.label} fill className={cn({"brightness-[3] invert-0": isActive})}></Image>
              </div>
              <p className={cn("sidebar-label", {"!text-white": isActive})}>{item.label}</p>
            </Link>
          )
          })
        }
      </nav>

      <Footer user={user}></Footer>
    </section>
  )
}

export default SideBar