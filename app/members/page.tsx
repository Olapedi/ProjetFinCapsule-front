'use client'

import Image from 'next/image'
import ContactForm from '@/components/site/contactform'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

import Dashboard from '@/components/members/dashboard'

import ForSignupForm from '@/components/site/forsignupform'
import ForgotPasswordForm from '@/components/site/forgotpasswordform'
import SigninForm from '@/components/site/signinform'

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";

export default function Members() {

    const dispatch = useDispatch<AppDispatch>();

    const email = useAppSelector((state) => state.authReducer.value.email)
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth)
  
  return (
    
    <main>

      
      <div>

       {isAuth && <Dashboard /> }
       
       {!isAuth && <SigninForm />}

      </div>
      

    </main>
  )
}
