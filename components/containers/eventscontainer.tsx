'use client'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Import du redux

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";

// Import des composants Neoney 


import EventsAll from '../site/eventsall'
import EventDisplay from '../site/eventdisplay'


const tabs = [
    { name: 'Actualités', href: '#', current: true },
    { name: 'Présentation', href: '#', current: false },
    { name: 'Infos légales', href: '#', current: false },
    { name: 'Contact', href: '#', current: false },
  ]
  
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


export default function EventContainer() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const userState = useAppSelector((state) => state.authReducer.value)

    const searchParams = useSearchParams()
    const evtUid = searchParams.get('search')

    let [profile, setProfile] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowall] = useState(true);

    // Récupération des données au mount du composant

    useEffect(() => {

    if (evtUid !== 'all') { // Si le paramètre de la barre est différent de 'all' alors on n'affiche que le profil 

        setShowall(false);

    } else { //Si le paramètre est 'all', on affiche l'ensemble des profils

        setShowall(true);

    }

    async function fetchData() {

        try {

            const resp = await fetch(`${process.env.backendserver}/events/${evtUid}`);
            let data = await resp.json();
            data = data.splice(1);

            // Vérifier que les données ne sont pas vides

            if (data && data.length > 0) {
                setProfile(data);
                setLoading(false);
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des données du profil :', error);
            }

    }

    fetchData();

    }, [evtUid]);

    // Afficher des valeurs par défaut tant que les données ne sont pas disponibles

    if (loading) {

    return (
    <div className="min-h-full">
    <p>Chargement en cours...</p>
    </div>
    );
    }

    
    if (userState.token !== '') {

        if (!userState.isActivated) {

            router.push('/activate')
    
        }

    } else {

        router.push('/')

    }


    console.log('showAll : ' + showAll);
    console.log('profile state:',profile)
    console.log('loading state:',loading)

    return (
    
    <> 

    <main>

      <div>

      {(showAll) && <EventsAll /> }

      </div>

        
      {(!showAll) &&  <EventDisplay 
                
                title = {profile[0].occurences[0].title}
                shortDescription = {profile[0].occurences[0].shortDescription}
                longDescription = {profile[0].longDescription}
                startDate = {profile[0].occurences[0].startDate}
                startHour = {profile[0].occurences[0].startHour}
                endDate = {profile[0].occurences[0].endDate}
                endHour = {profile[0].occurences[0].endHour}
                evtUid = {profile[0].evtUid}
                country = {profile[0].countries[0]}
                city = {profile[0].cities[0]}

                />
      
      }

    </main>

    </>
  )
}
