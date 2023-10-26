'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'


export default function UserProfilDisplay(props:any){
    console.log('props:',props)
    // return(
    //     <div></div>
    // )
    const router = useRouter()
// 

    //mockData for testing
    // const props:any = [
    //     {
    //         result : true,
    //         message: 'tout roule'
    //     },
        
    //     {
    //     displayName : 'Its Me',
    //     avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    //     mainVideo : 'https://www.youtube.com/watch?v=YBCCGV_9le0',
    //     title: 'Boulot boulot',
    //     neocode : 'codeNeo',
    //     city: 'Ville',
    //     country: 'Pays',
    //     boosts: ['Super', 'Top', 'Pro'],
    //     alerts: ['trop cher','arnaqueur'],
    //     strengths: ['rapide', 'Since 1480', 'Do the job'],
    //     description : 'description description description description',
    //     socialLinkedIn : 'https://chat.openai.com/',
    //     socialFacebook : 'https://www.google.fr/maps/preview',
    //     socialYoutube : 'https://www.youtube.com/',
    //     socialInstagram : 'https://www.instagram.com/',
    //     socialTweeter : 'https://twitter.com/tweeter',
    //     website : 'https://www.figma.com',
    //     agenda: 'https://workspace.google.com/intl/fr/products/calendar/',
    //     about: 'about about about about about about about about about about about about about about',
    //     legalinfos: ['go', 'do', 'this'],
    //     organisation: 'boite X'
    // }]

    const [contentShown, setContentShown] = useState<string>('Fiche')

    //Fonction au click sur Editer, renvoie vers le formulaire d'édition du profil utilisateur
    const handleEdit = () => {

    }

    //Partie concernant le content Fiche
    //Afficher la liste des strengths renseignés mis à part pour possible futur ajout d'icone
    let strengths
    if(props.profilData.strengths){
        strengths = props.profilData.strengths
    }


    //afficher la section video uniquement si uploadée
    let video
    if(props.profilData.mainVideo){
        video = <video src={props.profilData.mainVideo}></video>    
    }

    //affichage des réseaux remplis par l'utilisateur uniquement
    const reseaux = []
    if(props.profilData.socialLinkedIn){
        reseaux.push(<Link href={props.profilData.socialLinkedIn}>
            <Image
                src ='/linkedinIcon.svg'
                width={15}
                height={15}
                alt='LinkedIn profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialFacebook){
        reseaux.push(<Link href={props.profilData.socialFacebook}>
            <Image
                src ='/facebookIcon.svg'
                width={15}
                height={15}
                alt='Facebook profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialInstagram){
        reseaux.push(<Link href={props.profilData.socialInstagram}>
            <Image
                src ='/public/instagramIcon.svg'
                width={15}
                height={15}
                alt='Instagram profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialYoutube){
        reseaux.push(<Link href={props.profilData.socialYoutube}>
            <Image
                src ='/youtubeIcon.svg'
                width={15}
                height={15}
                alt='Youtube profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialTweeter){
        reseaux.push(<Link href={props.profilData.socialTweeter}>
            <Image
                src ='/tweetIcon.svg'
                width={15}
                height={15}
                alt='Tweeter profile logo'
            />
        </Link>)
    }

    //Affichage des boutons si les actions sont possibles

    const contactActions = []
    if(props.profilData.cards[0].website){
        contactActions.push(<button onClick={()=>router.push(`/${props.profilData.cards[0].website}`)}>En savoir plus</button>)
    }
    // if(props.profilData.agenda){
    //     contactActions.push( <button onClick={()=>handleAppointment()}>Prendre rendez-vous</button> )
    // }

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
                        {strengths}

                        <div>
                            <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Présentation</h2>
                            <p className='text-base leading-7 text-gray-700'>{props.profilData.cards[0].description}</p>
                        </div>
                    </div>
                
                    {video}
                
                    {contacts}
                </div> 
            break;

        case 'About':
            content = 
                 <div>
                    <h2 className='text-2xl font-bold tracking-wide text-gray-900'>À propos de {props.profilData.cards[0].displayName}</h2>
                    <p className='text-base leading-7 text-gray-700'>{props.profilData.about}</p>
                 </div>
        break;

        //Ajouter les informations légales liés à l'entreprise
        case 'Legals':
            content = 
            <div  className='text-base leading-7 text-gray-700'>
                {props.profilData.legalinfos}
            </div>
                 
        break;
    
        default:
            content = 
                <div>
                    <div>
                        {strengths}

                        <div>
                            <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Présentation</h2>
                            <p className='text-base leading-7 text-gray-700'>{props.profilData.cards[0].description}</p>
                        </div>
                    </div>
                
                    {video}
                
                    {contacts}
                </div>
            break;
    }


    console.log(props)
    return (
        <div className='m-12' >
            <div className='text-base leading-7 text-gray-700 flex justify-between rounded-md shadow-sm ring-1 ring-inset ring-gray-300 p-10 mb-4'>
                <div className='flex'>
                    <div className='pr-6'>
                        <Image
                        src={props.profilData.mainPicture}
                        width={80}
                        height={80}
                        alt='photo of the profile'
                        className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                        />
                    </div>
                        
                    <div className='pr-6'>
                        <h2 className='text-2xl font-bold tracking-wide text-gray-900'>{props.profilData.cards[0].displayName}</h2>
                        <p>{props.profilData.cards[0].title}</p>
                        <p>{props.profilData.cards[0].organisation}</p>
                        <p>{props.profilData.jobCategories} {props.profilData.jobSubCategories}</p>
                        <p>{props.profilData.countries} {props.profilData.cities}</p>
                        <p>Code Neo : {props.neo}</p>

                    </div>
                    <div className='pr-6 flex flex-col justify-center'>
                        <Image
                        src='/linkedinIcon.svg'
                        width={20}
                        height={20}
                        alt='boost icon'
                        />
                       
                        {/*  <p>Boosts : {props.profilData.boosts.length}</p> */}
                        <Image
                        src='../../public/linkedinIcon.svg'
                        width={20}
                        height={20}
                        alt='alert icon'
                        />
                        {/* <p>Signalements : {props.profilData.alerts.length}</p> */}
                        
                    </div>
            </div>
                <div className='flex space-around flex-col'>
                    {/* sandwichButton */}
                    <button
                     className='ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                     onClick={()=> handleEdit()}>Editer</button>
                </div>
            </div>

            {/* Fiche / A propos / Info légales */}
            <div className='pb-6'>
                <button 
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={()=>setContentShown('Fiche')}>Présentation</button>
                <button 
                className="rounded-md bg-white mx-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={()=>setContentShown('About')}>À propos</button>
                <button 
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={()=>setContentShown('Legals')}>Informations légales</button>
            </div>
            <div>
                {content}
            </div>

        </div>
    )
}