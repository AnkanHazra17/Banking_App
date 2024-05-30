"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/user.actions'
import { useRouter } from 'next/navigation'


const AuthForm = ({type}: {type: string}) => {
    const [user, setUser] = useState(null);
    const formSchema = authFormSchema(type);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
 
    // 2. Define a submit handler.
    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if(type === "sign-up"){
                const newUser = await signUp(data);
                setUser(newUser)
            }

            if(type === "sign-in"){
                const response = await signIn({email: data.email, password: data.password});
                if(response){
                    router.push("/");
                }
            }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <section className='auth-form'>
        <header>
            <Link href="/" className="cursor-pointer items-center flex gap-2">
                <Image src="/icons/logo.svg" height={34} width={34} alt='Logo'></Image>
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {
                        user ? "Link Account" :
                        type === "sign-in" ? "Sign In" : "Sign Up"
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {
                            user ? "Link your account to get started" : "Enter your details"
                        }
                    </p>
                </h1>
            </div>
        </header>
        {
            user ? (
                <div className='flex flex-col gap-4'>
                    {/* Plaid Link */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                type === "sign-up" && (
                                    <>
                                        <div className='flex gap-4'>
                                            <CustomInput
                                                control={form.control} 
                                                name="firstName" 
                                                label='First Name' 
                                                placeholder='Enter Your First Name'
                                            ></CustomInput>

                                            <CustomInput
                                                control={form.control} 
                                                name='lastName' 
                                                label='Last Name' 
                                                placeholder='Enter Your First Name'
                                            ></CustomInput>
                                        </div>

                                        <CustomInput
                                            control={form.control} 
                                            name='address1' 
                                            label='Address' 
                                            placeholder='Enter Your Specific Address'
                                        ></CustomInput>
                                        <CustomInput
                                            control={form.control} 
                                            name='city' 
                                            label='City' 
                                            placeholder='Enter Your City'
                                        ></CustomInput>

                                        <div className='flex gap-4'>
                                            <CustomInput
                                                control={form.control} 
                                                name='state' 
                                                label='State' 
                                                placeholder='Enter Your State'
                                            ></CustomInput>
                                            <CustomInput
                                                control={form.control} 
                                                name='postalCode' 
                                                label='Postal Code' 
                                                placeholder='Example: 111111'
                                            ></CustomInput>
                                        </div>

                                        <div className='flex gap-4'>
                                            <CustomInput
                                                control={form.control} 
                                                name='dateOfBirth' 
                                                label='Date Of Birth' 
                                                placeholder='YYYY-MM-DD'
                                            ></CustomInput>
                                            <CustomInput
                                                control={form.control} 
                                                name='ssn' 
                                                label='SSN' 
                                                placeholder='Example: 1234'
                                            ></CustomInput>
                                        </div>

                                    </>
                                )
                            }
                            <CustomInput
                                control={form.control} 
                                name='email' 
                                label='Email' 
                                placeholder='Enter Your Email'
                            ></CustomInput>

                            <CustomInput
                                control={form.control} 
                                name='password' 
                                label='Password'
                                placeholder='Enter Your Password'
                                inputeType='password'
                            ></CustomInput>

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" disabled={isLoading} className='form-btn'>
                                    {
                                        isLoading ? (
                                            <div className='flex items-center gap-2'>
                                                <Loader2 size={20} className="animate-spin"></Loader2>
                                                <p>Loading...</p>
                                            </div>
                                        ) : type === 'sign-in' ? "Sign In" : "Sign Up"
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {
                                type === "sign-in" ? "Don't have an account?" : "Already have an account?"
                            }
                        </p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link'>
                            {
                                type === "sign-in" ? "Sign Up" : "Sign In"
                            }
                        </Link>
                    </footer>
                </>
            )
        }
    </section>
  )
}

export default AuthForm