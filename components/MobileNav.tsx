"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'


const MobileNav = ({user}: MobileNavProps) => {
    const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            <SheetTrigger>
                <Image
                    src="/icons/hamburger.svg"
                    height={30}
                    width={30}
                    alt='menue'
                    className="cursor-pointer"
                ></Image>
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-white">
                <Link href="/" className="cursor-pointer items-center flex gap-2 px-4">
                    <Image src="/icons/logo.svg" height={34} width={34} alt='Logo'></Image>
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>
                
                <div className='mobolenav-sheet'>
                    <SheetClose asChild>
                        <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {
                                sidebarLinks.map((item) => {
                                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose key={item.label} asChild>
                                            <Link href={item.route} className={cn("mobilenav-sheet_close w-full", {"bg-bankGradient": isActive})}>
                                                
                                                <Image src={item.imgURL} width={20} height={20} alt={item.label} className={cn({"brightness-[3] invert-0": isActive})}></Image>
                                                
                                                <p className={cn("text-16 font-semibold text-black-2", {"text-white": isActive})}>{item.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })
                            }
                        </nav>
                    </SheetClose>

                    <Footer user={user} type="mobile"></Footer>
                </div>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav