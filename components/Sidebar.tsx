'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({user}: any) => {

    const pathname = usePathname();

  return (

    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link
                href='/'
                className='mb-12 flex cursor-pointer items-center gap-2'
            >
                <Image
                    src='/icons/logo.svg'
                    width={54}
                    height={54}
                    alt='logo'
                    className='size-[34px] max-xl:size-14'
                />
                <h1 className='sidebar-logo'>Bankify</h1>
            </Link>

            {sidebarLinks.map((item)=>{

                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                return(
                    <Link 
                        href={item.route} 
                        key={item.label}
                        className={cn(
                            'sidebar-link', {
                                'bg-bank-gradient':isActive
                            }
                        )}
                    >
                        <div className='relative size-6'>
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                className={cn(
                                    {
                                        'brightness-[3] invert-0':isActive
                                    }
                                )}
                            />
                        </div>
                        <p className={cn('sidebar-label', {'!text-white':isActive})}>{item.label}</p>
                    </Link>
                )
            })}
            {/* USER */}
            <PlaidLink user={user}/>
        </nav>
        {/* FOOTER */}
        < Footer user={user} type='desktop' />

        
    </section>
  )
}

export default Sidebar;
