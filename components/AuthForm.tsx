'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm =  ({ type }:{ type:string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const formSchema = authFormSchema(type);
   
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            email: "",
            password:""
          },
        })
       
        // 2. Define a submit handler.
       const onSubmit = async (data: z.infer<typeof formSchema>) => {
          setIsLoading(true);
          try{
            // Sign up with appwrite & create plaid token
            if(type === 'sign-up'){
              const newUser = await signUp(data);
              setUser(newUser);
            }
            if(type==='sign-in'){
              const response = await signIn({
                email: data.email,
                password: data.password,
              })
              if(response){
                console.log(response);
                console.log('authform sign in')
                router.push('/')
              }
            }
          }catch(error){
            console.log('error in AuthForm.tsx in onSubmit function')
            console.log(error);
          }finally{
            setIsLoading(false);
          }
        }
      

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='flex cursor-pointer gap-2'>
                <Image
                    src='/icons/logo.svg'
                    alt='horizon'
                    width={34}
                    height={34}
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
              <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                {user ? 'Link Account' :
                    (type==='sign-in' ? 'Sign In' : 'Sign Up')
                }
              </h1>
              <p className='text-16 font-normal text-gray-600'>
                {user ? 'Link your Account to get started' :
                        'Please enter your details'
                }
              </p>
            </div>
        </header>

        {user ? (
            <div>
                {/* PlaidLink */}
            </div>
        ):(
            <>
                {/* here we implement form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {type==='sign-up' && (

                      <>
                        <div className='flex gap-4'>
                          <CustomInput control={form.control} name='firstName' placeholder='Enter your first Name' label='First Name' />
                          <CustomInput control={form.control} name='lastName' placeholder='Enter your Last Name' label='Last Name' />
                        </div>
                        <CustomInput control={form.control} name='address1' placeholder='Enter your Address' label='Address' />
                        <div className='flex gap-4'>
                          <CustomInput control={form.control} name='city' placeholder='Enter your City' label='City' />
                          <CustomInput control={form.control} name='state' placeholder='Ex: Jharkhand' label='State' />
                        </div>
                        <div className='flex gap-4'>
                          <CustomInput control={form.control} name='pincode' placeholder='Ex: 826004' label='Pin Code' />
                          <CustomInput control={form.control} name='ssn' placeholder='Ex: 1234' label='SSN' />
                        </div>
                        <CustomInput control={form.control} name='dateOfBirth' placeholder='Ex: 23-03-2002' label='Date of Birth' />
                      </>

                    )}


                    <CustomInput control={form.control} name='email' placeholder='Enter your email' label='Email' />
                    <CustomInput control={form.control} name='password' placeholder='Enter your password' label='Password' />
                    <Button type="submit" className='form-btn' disabled={isLoading}>
                      {isLoading ? (
                        <>
                            <Loader2
                              size={20}
                              className='animate-spin'
                            /> &nbsp; Loading...
                        </>
                      ): type === 'sign-in'
                       ? 'Sign In' : 'Sign-Up' 
                      }
                    </Button>
                  </form>
                </Form>
                <footer className='flex justify-center gap-1 mt-2'>
                   <p className='text-14 font-normal text-gray-600'>
                    {type=='sign-in' ? 'Dont have an account?'
                                     : 'Already have an account?'}
                   </p>
                   <Link
                    href={type==='sign-in' ? '/sign-up' : '/sign-in'}
                    className='form-link'
                   >
                    {type === 'sign-in' ? 'Sign-Up' : 'Sign-In'}
                   </Link>
                </footer>
            </>
        )
        
        }

    </section>
  )
}

export default AuthForm

