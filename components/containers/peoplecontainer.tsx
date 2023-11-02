'use client'

import GlobalModal from '../modals/globalmodal'
import GlobalNavbar from '../common/globalnavbar'

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

import ProfileHeader from '../members/profileheader'
import EventCard from '../members/eventcard'
import ProfileCard from '../site/profilecard'
import AnnonceCard from '../members/annoncecard'
import UserCard from '../members/usercard'
import PostCardSimple from '../members/postcardsimple'
import PostCard from '../members/postcard'
import Newpost from '../members/newpost'
import ProfilesAll from '../site/profilesall'
import UserProfilDisplay from '../members/userprofildisplay'


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

const navigation = [
  { name: '<-- Retour au Dashboard', href: '/members', current: true },

]
const userNavigation = [
  { name: 'Mon profil', href: '0' },
  { name: 'Se déconnecter', href: '1' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


export default function PeopleContainer() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const userState = useAppSelector((state) => state.authReducer.value)

    const searchParams = useSearchParams()
    const proUid = searchParams.get('search')

    let [profile, setProfile] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowall] = useState(true);

    
    // Récupération des données au mount du composant

    useEffect(() => {

    if (proUid !== 'all') { // Si le paramètre de la barre est différent de 'all' alors on n'affiche que le profil 

        setShowall(false);

    } else { //Si le paramètre est 'all', on affiche l'ensemble des profils

        setShowall(true);

    }

    async function fetchData() {

        try {

            const resp = await fetch(`${process.env.backendserver}/profiles/${proUid}`);
            let data = await resp.json();
            data = data.splice(1);

            // Vérifier que les données ne sont pas vides

            if (data && data.length > 0) {
                console.log('profil data : ',data)
                setProfile(data);
                setLoading(false);
                }

        } catch (error) {
            console.error('Erreur lors de la récupération des données du profil :', error);
            }

    }
    fetchData();

    }, [proUid]);

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
    let onPersonnalProfil = userState.proUid === proUid ? true : false
    let display = showAll ? <ProfilesAll/> : <UserProfilDisplay
        profilData={profile[0]}
        // neo={neo}
        onPersonnalProfil={onPersonnalProfil}
        // alerts={alerts}
        /> 
    return(
        <main>
            <div>
                {display}
            </div>
        </main>
    )
    
}