'use client'

import Image from 'next/image'
import Homeheader from '../components/site/homeheader'
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
import { useRouter } from 'next/navigation'


export default function Home() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.authReducer.value)
  const router = useRouter()

  return (
    
    <main>

      <div>

      <SiteNavbar />

      </div>

      <div>

      <Homeheader />

      </div>
      
      <div>

      <SiteFooter />

      </div>

    </main>
  )
}
