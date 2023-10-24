'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import BoostDisplay from '../site/boostdisplay'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'


export default function userprofildisplayMockTest(){

    const user = useAppSelector((state)=>state.authReducer.value)
    // const profil = useAppSelector((state)=>state.profilReducer.value)
    const router = useRouter()
    // let profilData = {}

    // const getprofilData = async () => {
    //     const result = await fetch (`/profil/${user.currentProfil}`)
    //     profilData = await result.json()
    // }

    // useEffect(()=>{
    //     getprofilData()

    // },[]) 

    const profilData = {
        displayName : 'Its Me',
        avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mainVideo : 'https://www.youtube.com/watch?v=YBCCGV_9le0',
        title: 'Boulot boulot',
        neocode : 'codeNeo',
        city: 'Ville',
        country: 'Pays',
        boosts: ['Super', 'Top', 'Pro'],
        alerts: ['trop cher','arnaqueur'],
        strengths: ['rapide', 'Since 1480', 'Do the job'],
        description : 'description description description description',
        socialLinkedIn : 'https://chat.openai.com/',
        socialFacebook : 'https://www.google.fr/maps/preview',
        socialYoutube : 'https://www.youtube.com/',
        socialInstagram : 'https://www.instagram.com/',
        socialTweeter : 'https://twitter.com/tweeter',
        website : 'https://www.figma.com',
        agenda: 'https://workspace.google.com/intl/fr/products/calendar/',
        about: 'about about about about about about about about about about about about about about',
        legalinfo: ['go', 'do', 'this'],
        organisation: 'boite X'
    }

    const [contentShown, setContentShown] = useState<string>('Fiche')

    //Fonction au click sur Editer, renvoie vers le formulaire d'édition du profil utilisateur
    const handleEdit = () => {

    }

    //Partie concernant le content Fiche
    //fonction appellée au click sur 'prendre un rdv'
    const handleAppointment = () => {

    }
    //Afficher la liste des badges renseignés
    // const badges = profilData.strengths


    //afficher la section video uniquement si uploadée
    let video

    if(profilData.mainVideo){
        video = <video src={profilData.mainVideo}></video>    
    }

    //affichage des réseaux remplis par l'utilisateur uniquement
    const reseaux = []
    if(profilData.socialLinkedIn){
        reseaux.push(<Link href={profilData.socialLinkedIn}>
            {/* <Image
                src ={}
                width={}
                height={}
                alt='LinkedIn profile logo'
            /> */}
        </Link>)
    }
    if(profilData.socialFacebook){
        reseaux.push(<Link href={profilData.socialFacebook}>
            {/* <Image
                src ={}
                width={}
                height={}
                alt='Facebook profile logo'
            /> */}
        </Link>)
    }
    if(profilData.socialInstagram){
        reseaux.push(<Link href={profilData.socialInstagram}>
            {/* <Image
                src ={}
                width={}
                height={}
                alt='Instagram profile logo'
            /> */}
        </Link>)
    }
    if(profilData.socialYoutube){
        reseaux.push(<Link href={profilData.socialYoutube}>
            {/* <Image
                src ={}
                width={}
                height={}
                alt='Youtube profile logo'
            /> */}
        </Link>)
    }
    if(profilData.socialTweeter){
        reseaux.push(<Link href={profilData.socialTweeter}>
            {/* <Image
                src ={}
                width={}
                height={}
                alt='Tweeter profile logo'
            /> */}
        </Link>)
    }

    //Affichage des boutons si les actions sont possibles

    const contactActions = []
    if(profilData.website){
        contactActions.push(<button onClick={()=>router.push(`/${profilData.website}`)}>En savoir plus</button>)
    }
    if(profilData.agenda){
        contactActions.push( <button onClick={()=>handleAppointment()}>Prendre rendez-vous</button> )
    }

    let contacts = 
        <div>
            <div>
                {reseaux}
            </div>
            <div>
                {contactActions}
            </div>
        </div>
    //Partie concernant le content About

    //Partie concernant le content Legals


    // Conditionnemement de content en fonction de l'état contentShown
    let content
    switch (contentShown) {
        case 'Fiche':
            content = 
                <div>
                    <div className='text-base leading-7 text-gray-700'>
                        {profilData.strengths}

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Présentation</h2>
                            <p className='text-base leading-7 text-gray-700'>{profilData.description}</p>
                        </div>
                    </div>
                
                    {video}
                
                    {contacts}
                </div> 
            break;

        case 'About':
            content = 
                 <div className='text-base leading-7 text-gray-700'>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">À propos de {profilData.displayName}</h2>
                    <p>{profilData.about}</p>
                 </div>
        break;

        //Ajouter les informations légales liés à l'entreprise
        case 'Legals':
            content = 
            <div className='text-base leading-7 text-gray-700'>
                {profilData.legalinfo}
            </div>
                 
        break;
    
        default:
            content = 
                <div>
                    <div>
                        <p>
                        {profilData.strengths}
                        </p>

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Présentation</h2>
                            <p>{profilData.description}</p>
                        </div>
                    </div>
                
                    {video}
                
                    {contacts}
                </div>
            break;
    }


    return (
        <div className='m-12' >
            <div className='text-base leading-7 text-gray-700 flex justify-between rounded-md shadow-sm ring-1 ring-inset ring-gray-300 p-10 mb-4'>
                <div className='flex '>
                    <div className='pr-6'>
                        <img
                        src={profilData.avatar}
                        width={80}
                        height={80}
                        alt='photo of the profile'
                        className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                        />
                    </div>
                        
                    <div className='pr-6'>
                        <h2 className="text-2xl font-bold tracking-wide text-gray-900">{profilData.displayName}</h2>
                        <p>{profilData.title}</p>
                        <p>{profilData.organisation}</p>
                        <p>{profilData.country} {profilData.city}</p>
                        <p>Code Neo : {profilData.neocode}</p>

                    </div>
                    <div className='pr-6 flex flex-col justify-center'>
                        {/* <Image/> */}
                        <p>Boosts : {profilData.boosts.length}</p>
                        
                        {/* <Image/> */}
                        <p>Signalements : {profilData.alerts.length}</p>
                        
                    </div>
                </div>
                
                <div className=''> 
                {/* flex, flexDirection column, space-around */}
                    {/* sandwichButton */}
                    <button onClick={()=> handleEdit()} 
                    className='ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Editer</button>
                </div>
            </div>

            {/* Fiche / A propos / Info légales */}
            <div className='pb-6'>
                <button onClick={()=>setContentShown('Fiche')} 
                 className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >Présentation</button>

                <button onClick={()=>setContentShown('About')}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mx-2"
                >À propos</button>

                <button onClick={()=>setContentShown('Legals')}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >Informations légales</button>
            </div>

            {content}

            <BoostDisplay/>
        </div>
    )
}