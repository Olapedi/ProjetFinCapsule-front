"use client";

'use client'

import GlobalModal from '../modals/globalmodal'
import GlobalNavbar from '../common/globalnavbar'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { Fragment, useEffect, useState, useRef } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import ProfilesAll from "../site/profilesall";
import UserCard from "../members/usercard";
import Newpost from "../members/newpost";
import EventCard from "../members/eventcard";
import AnnonceCard from "../members/annoncecard";
import PostCard from "../members/postcard";
import PostCardSimple from "../members/postcardsimple";

// Import du redux

import { useAppSelector } from '@/redux/store'
import { logIn, logOut } from '@/redux/features/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";


const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Home", href: "1", current: true },
    { name: "Membres", href: "2", current: false },
    { name: "Événements", href: "3", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function FeedContainer() {


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const userState = useAppSelector((state) => state.authReducer.value)

    const searchParams = useSearchParams()
    const proUid = searchParams.get('search')


    // # Déclaration des états pour l'affichage des contenus



    if (userState.token !== '') {

        if (!userState.isActivated) {

            router.push('/activate')
    
        }

    } else {

        router.push('/')

    }

    // Récupération des données au mount du composant
     
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Récupération des données au mount du composant

       useEffect(() => {

        async function fetchData() {
            try {

                const resp = await fetch(`${process.env.backendserver}/contributions`);

                let data = await resp.json();
                data = data.splice(1);

                // Vérifier que les données ne sont pas vides

                if (data && data.length > 0) {

                    setPosts(data);
                    setLoading(false);

                  //  setProfile(data);

                  }
    
            } catch (error) {
                console.error('Erreur lors de la récupération des contributions :', error);
              }

        }

        fetchData();

    }, [proUid]);

  // Afficher des valeurs par défaut tant que les données ne sont pas disponibles
  
  if (loading) {

    return (

        <p>Chargement en cours...</p>

    );
  }

    console.log(posts);


    const Postcards = posts.map(data => {

        return <PostCard 

                key = {data.ctbUid}
                ctbUid = {data.ctbUid}
                usrUid={data.usrUid} 
                proUid = {data.proUid}
                neocode={data.neocode} 
                country={data.country} 
                city={data.city} 
                senderDisplayName={data.senderDisplayName} 
                senderTitle={data.senderTitle} 
                senderOrganization={data.senderOrganization} 
                title={data.title} 
                text={data.text} 
                privacy={data.privacy} 
                category={data.category} 
                deadline={data.deadline} 
                mainPicture={data.mainPicture} 
                hashtags={data.hashtags} 
                likes={data.likes} 
                alerts={data.alerts} 
                comments={data.comments}
                creationDate ={data.creationDate}
                
                />;
      
    });




    return (
        <>
            <div className="min-h-full bg-gray-100">

                <main className="py-10">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 3 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                            {/* Left column */}

                            {/*  Ajout de la zone de création des posts */}

                            <div className="grid grid-cols-1 gap-4 lg:col-span-2">

                            <section aria-labelledby="section-1-title">
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-6">

                                    <Newpost />
                                    
                                    </div>
                                </div>
                            </section>

                            
                            {/*  Ajout de la carte des posts pour le feed */}


                            {Postcards}

           
                            </div>

                            {/* Right column */}
                            <div className="grid grid-cols-1 gap-4">
                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Annonces
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <AnnonceCard />

                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Section title
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <UserCard />
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="section-2-title">
                                    <h2
                                        className="sr-only"
                                        id="section-2-title"
                                    >
                                        Section title
                                    </h2>

                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            {/* Your content */}

                                            <EventCard />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Ajout de la modale de création de contenu*/}


                <footer>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                            <span className="block sm:inline">
                                &copy; 2021 Neoney by @Kovalys Connect.
                            </span>{" "}
                            <span className="block sm:inline">
                                Tous droits réservés.
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
