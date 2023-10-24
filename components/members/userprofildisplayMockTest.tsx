'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import BoostDisplay from '../site/boostdisplay'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'

export default function UserProfilDisplayMock(){

    const user = useAppSelector((state)=>state.authReducer.value)
    const router = useRouter()

    const profilData = {
        displayName : 'ItsMe',
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
            <p>Lkin</p>
        </Link>)
    }
    if(profilData.socialFacebook){
        reseaux.push(<Link href={profilData.socialFacebook}>
                        <p>FB</p>

        </Link>)
    }
    if(profilData.socialInstagram){
        reseaux.push(<Link href={profilData.socialInstagram}>
                        <p>insta</p>

        </Link>)
    }
    if(profilData.socialYoutube){
        reseaux.push(<Link href={profilData.socialYoutube}>
                        <p>youtube</p>
        </Link>)
    }
    if(profilData.socialTweeter){
        reseaux.push(<Link href={profilData.socialTweeter}>
            <p>Tweeter</p>
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
                    <div>
                        {profilData.strengths}

                        <div>
                            <h2>Présentation</h2>
                            <p>{profilData.description}</p>
                        </div>
                    </div>
                
                    {video}
                
                    {contacts}
                </div> 
            break;

        case 'About':
            content = 
                 <div>
                    <h2>À propos de {profilData.displayName}</h2>
                    <p>{profilData.legalinfo}</p>
                 </div>
        break;

        //Ajouter les informations légales liés à l'entreprise
        case 'Legals':
            content = 
            <div>
                
            </div>
                 
        break;
    
        default:
            content = 
                <div>
                    <div>
                        {profilData.strengths}

                        <div>
                            <h2>Présentation</h2>
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
            <div>
                <div>
                    <Image
                    src={profilData.avatar}
                    width={80}
                    height={80}
                    alt='photo of the profile'
                    />
                </div>
                    
                <div>
                    <h2>{profilData.displayName}</h2>
                    <p>{profilData.title}</p>
                    <p>{profilData.organisation}</p>
                    <p>{profilData.country} {profilData.city}</p>
                    <p>Code Neo : {profilData.neocode}</p>

                </div>
                <div>
                    <p>Boosts : {profilData.boosts.length}</p>
                    {/*  */}
                    <p>Signalements : {profilData.alerts.length}</p>
                    
                </div>

                <div>
                    {/* sandwichButton */}
                    <button onClick={()=> handleEdit()}>Editer</button>
                </div>
            </div>

            {/* Fiche / A propos / Info légales */}
            <div>
                <button onClick={()=>setContentShown('Fiche')}>Présentation</button>
                <button onClick={()=>setContentShown('About')}>À propos</button>
                <button onClick={()=>setContentShown('Legals')}>Informations légales</button>
            </div>

            {content}

            <BoostDisplay/>
        </div>
    )
}