'use client'

import Image from 'next/image'
import ContactForm from '@/components/site/contactform'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'
import Link from 'next/link'

import Dashboard from '@/components/members/dashboard'

import ForSignupForm from '@/components/site/forsignupform'
import ForgotPasswordForm from '@/components/site/forgotpasswordform'
import SigninForm from '@/components/site/signinform'
import SignupForm from '@/components/site/signupform'

import { useAppSelector } from '@/redux/store'
import { useState } from 'react'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";

export default function Members() {

    const dispatch = useDispatch<AppDispatch>();
    const [signup, SetSignup] = useState(false);
    

    const email = useAppSelector((state) => state.authReducer.value.email)
    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth)
  
  return (
    
    <main>

      
      <div>

       {isAuth && <Dashboard /> }
       
       {/*  Partie Formulaire Sign in*/}

        {(((isAuth == false) && (signup == false)) && 

          <div>
            
          <SigninForm />

          </div>

          )}

        {(((isAuth == false) && (signup == false)) && 

          <p className="mt-10 text-center text-sm text-gray-500"> Pas encore de compte ? <span onClick={(e) => 
              {
                SetSignup(true);
              
              }}> <a href = '#' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> S&apos;inscrire </a> </span> </p>

          )}

      {/* Partie Sign up form */}

        {((isAuth == false) && (signup == true) && 

          <div>

          <SignupForm />

          </div>

          )}

        {((isAuth == false) && (signup == true) && 

            <p className="mt-10 text-center text-sm text-gray-500"> Déjà inscrit ? <span onClick={(e) => 
              {
                SetSignup(false);
              
              }}> <a href='#' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Se connecter ! </a> </span> </p>

          )}

      </div>
      
    </main>

  )
}
