import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { selectLoggedInUser, signupUserAsync } from '../AuthSlice'
import { useForm } from "react-hook-form"

export const Signup = () => {


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch=useDispatch()

  const loggedInUser=useSelector(selectLoggedInUser)

  return (
    <>
    {loggedInUser && <Navigate to={'/'} replace={true}></Navigate>}
    <Stack width={'100vw'} height={"calc(100vh - 4rem)"} justifyContent={'center'} alignItems={'center'}>

    <Stack width={'30rem'} spacing={2} component={'form'} noValidate onSubmit={handleSubmit((data)=>{
      const cred={...data}
      delete cred.confirmPassword
      dispatch(signupUserAsync(cred))
    })}>
      <Typography alignSelf={'center'} variant='h4' fontWeight={'100'}>Welcome to Ticketo🎫</Typography>
      <TextField placeholder='Name' {...register("name",{required:"Name is required"})}/>
      <Typography sx={{color:"text.secondary"}}>{errors.name?.message}</Typography>
      <TextField placeholder='Email' {...register("email",{required:"Email is required"})}/>
      <Typography sx={{color:"text.secondary"}}>{errors.email?.message}</Typography>
      <TextField placeholder='Password' {...register("password",{required:"Passoword is required"})}/>
      <Typography sx={{color:"text.secondary"}}>{errors.password?.message}</Typography>
      <TextField placeholder='Confirm Password' {...register("confirmPassword",{required:"Confirm Password is required",validate:(value,formvalues)=>value===formvalues.password || "Passwords Dosen't match"})}/>
      <Typography sx={{color:"text.secondary"}}>{errors.confirmPassword?.message}</Typography>

      <Button sx={{mt:2,height:'3rem'}} type='submit' variant='contained'>Signup</Button>
      <Typography alignSelf={"flex-end"} to={'/login'} component={Link} sx={{cursor:'pointer'}}>Already a member login?</Typography>
    </Stack>

  </Stack></>
  )
}
