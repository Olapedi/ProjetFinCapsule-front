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


export default function EventsContainer() {

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


    async function fetchData() {
        try {

            const resp = await fetch(`${process.env.backendserver}/profiles/${proUid}`);
            let data = await resp.json();
            data = data.splice(1);

            // Vérifier que les données ne sont pas vides

            if (data && data.length > 0) {
                setProfile(data);
                setLoading(false);

                setProfile(data);

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

    console.log(profile);

    if (userState.token !== '') {

        if (!userState.isActivated) {

            router.push('/activate')
    
        }

    } else {

        router.push('/')

    }



  return (
    
    <> 

    <main>

      <div>

      {(showAll) && <ProfilesAll /> }

      </div>

        
      {(!showAll) &&  <div className="min-h-full">
 
        <main className="bg-gray-100">

          <div className="mx-auto py-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">{/* Your content */}
            
    
            <div>

                <ProfileHeader 
                
                displayName = {profile[0].cards[0].displayName}
                neocode = {profile[0].neocode}
                email = {profile[0].cards[0].email}
                phone = {profile[0].cards[0].phone}
                title = {profile[0].cards[0].title}
                organization = {profile[0].cards[0].organization}
                website = {profile[0].cards[0].website}
                country = {profile[0].countries[0]}
                city = {profile[0].cities[0]}
                proUid = {profile[0].proUid}

                />


            </div>
            
            
                <main className="mt-20 pb-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="sr-only">Page title</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                    
                    {/* Left column */}
                    
                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="section-1-title">
                        <h2 className="sr-only" id="section-1-title">
                            Section title
                        </h2>
                        <div>

                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">
                                Select a tab
                                </label>
                                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                <select
                                id="tabs"
                                name="tabs"
                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                defaultValue={tabs.find((tab) => tab.current).name}
                                >
                                {tabs.map((tab) => (
                                    <option key={tab.name}>{tab.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="flex space-x-4" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                        tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    >
                                    {tab.name}
                                    </a>
                                ))}
                                </nav>
                            </div>
                            </div>


                        </section>

                        {/*  Ajout de la carte des posts pour le feed */}

                    <div>

                                <section aria-labelledby="section-1-title">

                                    <h2 className="sr-only" id="section-1-title">
                                        Header 
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                    
                                        <div className = "p-6">{/* Header de la carte des posts */}
                                    
                                        <PostCardSimple />
                                        
                                        </div>

                                    </div>

                                </section>

                                <section aria-labelledby="section-1-title">

                                    <h2 className="sr-only" id="section-1-title">
                                        Contenu du post
                                    </h2>

                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                                    
                                    <div className = "p-6">{/* Contenu du post pour test*/}
                                    
                                    <PostCard />
                                    
                                    </div>

                                </div>

                                </section>

                            </div>

                    </div> 


                    {/* Right column */}
                    <div className="grid grid-cols-1 gap-4">

                    <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Annonces
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <AnnonceCard />
                            
                            </div>


                        </div>
                        
                        </section>


                        <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Section title
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <UserCard />
                            
                            </div>


                        </div>

                        </section>

                        <section aria-labelledby="section-2-title">

                        <h2 className="sr-only" id="section-2-title">
                            Section title
                        </h2>

                        <div className="overflow-hidden rounded-lg bg-gray-100 shadow">
                            
                            <div className="p-6">{/* Your content */}
                            
                            <EventCard />
                            
                            </div>


                        </div>
                        </section>


                    </div>
                    </div>
                </div>
                </main>


        
            </div>
          </div>
        </main>
      </div>   
      
      }   
  


    </main>

    </>
  )
}
