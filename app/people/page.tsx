'use client'

import Image from 'next/image'

import Dashboard from '@/components/members/dashboard'

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { useRouter } from 'next/navigation'
import PeopleContainer from '@/components/containers/peoplecontainer';



export default function People() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.authReducer.value)
  const router = useRouter()

  return (
    
    <main>

      <div>

    <PeopleContainer />

      </div>

    </main>

  )
  
}
