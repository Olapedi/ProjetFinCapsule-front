'use client'

import Image from 'next/image'

import Dashboard from '@/components/members/dashboard'

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { useRouter } from 'next/navigation'
import FeedContainer from '@/components/containers/feedcontainer';


export default function Feed() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.authReducer.value)
  const router = useRouter()

  return (
    
    <main>

      <div>

    <FeedContainer />

      </div>

    </main>
  )
}
