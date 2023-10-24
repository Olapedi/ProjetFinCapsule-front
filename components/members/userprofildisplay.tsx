'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import BoostDisplay from '../site/boostdisplay'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'


export default function UserProfilDisplay(){

    const user = useAppSelector((state)=>state.authReducer.value)
    const profil = useAppSelector((state)=>state.profilReducer.value)
    const router = useRouter()
    let profilData = {}

    const getprofilData = async () => {
        const result = await fetch (`/profil/${user.currentProfil}`)
        profilData = await result.json()
    }

    useEffect(()=>{
        getprofilData()

    },[]) 

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
            <Image
                src ={}
                width={}
                height={}
                alt='LinkedIn profile logo'
            />
        </Link>)
    }
    if(profilData.socialFacebook){
        reseaux.push(<Link href={profilData.socialFacebook}>
            <Image
                src ={}
                width={}
                height={}
                alt='Facebook profile logo'
            />
        </Link>)
    }
    if(profilData.socialInstagram){
        reseaux.push(<Link href={profilData.socialInstagram}>
            <Image
                src ={}
                width={}
                height={}
                alt='Instagram profile logo'
            />
        </Link>)
    }
    if(profilData.socialYoutube){
        reseaux.push(<Link href={profilData.socialYoutube}>
            <Image
                src ={}
                width={}
                height={}
                alt='Youtube profile logo'
            />
        </Link>)
    }
    if(profilData.socialTweeter){
        reseaux.push(<Link href={profilData.socialTweeter}>
            <Image
                src ={}
                width={}
                height={}
                alt='Tweeter profile logo'
            />
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
                        {badges}

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
                        {badges}

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
                    src={user.avatar}
                    width={80}
                    height={80}
                    alt='photo of the profile'
                    />
                </div>
                    
                <div>
                    <h2>{user.displayName}</h2>
                    <p>{profilData.title}</p>
                    <p>{profilData.organisation}</p>
                    <p>{profilData.country} {profilData.city}</p>
                    <p>Code Neo : {profilData.neocode}</p>

                </div>
                <div>
                    <Image/><p>Boosts : {profileBoosts.length}</p>
                    {/*  */}
                    <Image/><p>Signalements : {profileAlerts.length}</p>
                    
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