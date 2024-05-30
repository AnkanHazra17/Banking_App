"use client"

import React, { useState } from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema("sign-up");

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    inputeType?: string
}

const CustomInput = ({control, name, label, placeholder, inputeType}: CustomInput) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField control={control} name={name}
        render={({field}) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>

                <div className='flex w-full flex-col relative'>
                    <FormControl>
                        <Input 
                            className='input-class' 
                            placeholder={placeholder}
                            type={inputeType === "password" ?
                                    showPassword ? "text" : "password" : 
                                    "text"
                                }
                            {...field}
                        ></Input>
                    </FormControl>
                    <FormMessage className='form-message mt-2'></FormMessage>
                    {
                        inputeType === "password" && (
                            <div className="absolute right-2 top-3 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? (
                                        <AiOutlineEyeInvisible size={17} className="text-gray-400"></AiOutlineEyeInvisible>
                                    ) : (
                                        <AiOutlineEye size={17} className="text-gray-400"></AiOutlineEye>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )}
    >
    </FormField>
  )
}

export default CustomInput