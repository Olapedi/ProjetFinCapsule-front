'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { Modal } from "antd";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import UpdateProfilForm from './updateProfilForm'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

export default function UserProfilDisplay(props:any){
    console.log('props:',props)
    const router = useRouter()

    //modale pour envoyer une alerte au profil
    const handleAlert = () => {
        
    }
    //Envoie une demande d'allignement & change l'affichage à allignement en attente jusqu'à validation
    const handleAlign = () => {
        
    }   
    //modale pour envoyer un boost au profil 
    const handleBoost = () => {
        
    }
    //modale pour envoyer un message au profil ou redirection vers la page de messagerie en passant le profil cible
    const handleMessage = () => {
        
    }


    //récupération des boosts & alertes du profil
    const [boosts, setBoosts] = useState([])
    const [alerts, setAlerts] = useState([])

    const getProfilBoosts = async () => {
        const result = await fetch(`${process.env.backendserver}/boosts/profile/${props.profilData.proUid}`)
        const data = await result.json()
        if(data[0].result){
            data.splice(0,1)
            setBoosts(data)
        }
    }
    
    const getProfilAlerts = async () => {
        const result = await fetch(`${process.env.backendserver}/alerts/profile/${props.profilData.proUid}`)
        const data = await result.json()
        if(data[0].result){
            data.splice(0,1)
            setAlerts(data)
        }
    }

    const [editModalVisible,setEditModalVisible] = useState<boolean>(false)
    const handleCancelEdit = () => {
        setEditModalVisible(false)
    }

    useEffect(()=>{
        // getProfilBoosts()
        // getProfilAlerts()
    },[])

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
    
    // Affichage du bouton Edition du profil ou menu interaction en fonction d'un props (booleen) signalant si on instancie le profil de l'utilisateur ou d'un autre utilisateur
    let interactions
    if(props.onPersonnalProfil){
        interactions=
        <div>    
            <button
            className='ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={()=> setEditModalVisible(true)}>Modifier mon profil</button>
        </div> 
    }
    else{
    interactions = 
    <div>
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open interaction menu</span>
                <Image
                    className="h-8 w-8 rounded-full"
                    src="/menuIcon.svg"
                    alt="open interaction menu icon"
                    width={50}
                    height={50}
                />
                </Menu.Button>
            </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                    <Image
                src='/msgIcon.svg'
                width={20}
                height={20}
                alt='message action logo'
                className='mr-4'
                onClick={()=>handleMessage()}
                />
                <p>Contacter</p>
                </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                    <Image
                src='/circleIcon.svg'
                width={20}
                height={20}
                alt='action alligner logo'
                className='mr-4'
                onClick={()=>handleAlign()}
                />
                <p>S'alligner</p>
                </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                    <Image
                src='/boostIcon.svg'
                width={20}
                height={20}
                alt='boost action logo'
                className='mr-4'
                onClick={()=>handleBoost()}
                />
                <p>Booster</p>
                </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                    <Image
                src='/alertIcon.svg'
                width={20}
                height={20}
                alt='boost action logo'
                className='mr-4'
                onClick={()=>handleAlert()}
                />
                <p>Signaler</p>
                </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
}

    const [contentShown, setContentShown] = useState<string>('Fiche')
console.log('strs : ',props.profilData.strengths)
    //Partie concernant le content Fiche
    //Afficher la liste des strengths renseignés mis à part pour possible futur ajout d'icone
    let strengths
    if (props.profilData.strengths.length >0) {
        strengths = (
          <div className='mb-6'>
            <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Forces de {props.profilData.cards[0].displayName}</h2>
            {props.profilData.strengths.map((str: any, index: number) => (
              <div
                key={index}
                className="mt-4 mx-2 rounded-md bg-indigo-500 inline-block px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {str.text}
              </div>
            ))}
          </div>
        );
      }
      else{
        strengths = <></>
      }


    //afficher la section video uniquement si uploadée
    let video
    if(props.profilData.mainVideo){
        video = <video src={props.profilData.mainVideo}></video>    
    }

    //affichage des réseaux remplis par l'utilisateur uniquement
    const reseaux = []
    if(props.profilData.socialLinkedIn){
        reseaux.push(
            <Link href={props.profilData.socialLinkedIn} className='mx-1'>
                <Image
                    src ='/linkedinIcon.svg'
                    width={18}
                    height={18}
                    alt='LinkedIn profile logo'
                />
            </Link>
        )
    }
    if(props.profilData.socialFacebook){
        reseaux.push(
        <Link href={props.profilData.socialFacebook} className='mx-1'>
            <Image
                src ='/facebookIcon.svg'
                width={18}
                height={18}
                alt='Facebook profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialInstagram){
        reseaux.push(
        <Link href={props.profilData.socialInstagram} className='mx-1'>
            <Image
                src ='/instagramIcon.svg'
                width={18}
                height={18}
                alt='Instagram profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialYoutube){
        reseaux.push(
        <Link href={props.profilData.socialYoutube} className='mx-1'>
            <Image
                src ='/youtubeIcon.svg'
                width={18}
                height={18}
                alt='Youtube profile logo'
            />
        </Link>)
    }
    if(props.profilData.socialTweeter){
        reseaux.push(
        <Link href={props.profilData.socialTweeter} className='mx-1'>
            <Image
                src ='/tweetIcon.svg'
                width={18}
                height={18}
                alt='Tweeter profile logo'
            />
        </Link>)
    }

    //Affichage des boutons si les actions sont possibles

    const contactActions = []
    if(props.profilData.cards[0].website){
        contactActions.push(<Link href={props.profilData.cards[0].website}
            className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >Site Web</Link>)
    }
    // if(props.profilData.agenda){
    //     contactActions.push( <button onClick={()=>handleAppointment()}>Prendre rendez-vous</button> )
    // }

    let contacts = 
        <div className='flex flex-col'>
        <div className='mb-6 mt-4'>
            <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Réseaux sociaux</h2>
            <div className='flex flex-row mt-2'>
            {reseaux}
            </div>
        </div>
        <div className='mt-4'>
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
                <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Informations légales</h2>
                <p className='text-base leading-7 text-gray-700'>{props.profilData.legalinfos}</p>
                <p className='text-base leading-7 text-gray-700'>{props.profilData.organization}</p>
            </div>
                 
        break;
    
        default:
            content = 
                <div>
                    <div>
                        <div>
                            <h2 className='text-2xl font-bold tracking-wide text-gray-900'>Présentation</h2>
                            <p className='text-base leading-7 text-gray-700'>{props.profilData.cards[0].description}</p>
                        </div>
                        {strengths}
                    </div>
                
                    {video}
                
                    {contacts}
                </div>
            break;
    }


    console.log('props : ',props)
    return (
        <div className='m-12' >
            {/* <Modal
                onCancel={() => handleCancelBoost()}
                open={boostModalVisible}
                footer={null}
            >
                <Boost name={props.displayName} profileOwner={currentUserId} sender={currentUserId} receiver={props.proUid} confirmOk={confirmOk}/>
            </Modal>
            <Modal
                onCancel={() => handleCancelBoost()}
                open={boostModalVisible}
                footer={null}
            >
                <Boost name={props.displayName} profileOwner={currentUserId} sender={currentUserId} receiver={props.proUid} confirmOk={confirmOk}/>
            </Modal>
            <Modal
                onCancel={() => handleCancelBoost()}
                open={boostModalVisible}
                footer={null}
            >
                <Boost name={props.displayName} profileOwner={currentUserId} sender={currentUserId} receiver={props.proUid} confirmOk={confirmOk}/>
            </Modal> */}
            <Modal
                className='w-1/2'
                onCancel={() => handleCancelEdit()}
                open={editModalVisible}
                footer={null}
            >
                <UpdateProfilForm
                data={...props}
                closeEditModal={handleCancelEdit}
                refresh={props.refresh}
                />
            </Modal>
            <div className='text-base leading-7 text-gray-700 flex justify-between rounded-md shadow-sm ring-1 ring-inset ring-gray-300 p-10 mb-4'>
                <div className='flex'>
                    <div className="pr-6">
                        <Image
                        src={props.profilData.mainPicture}
                        width={80}
                        height={80}
                        alt='photo of the profile'
                        className='h-24 w-24 rounded-full object-cover ring-4 ring-white sm:h-32 sm:w-32'
                        />
                    </div>
                        
                    <div className='pr-6'>
                        <h2 className='text-2xl font-bold tracking-wide text-gray-900'>{props.profilData.cards[0].displayName}</h2>
                        <p>{props.profilData.cards[0].title}</p>
                        <p>{props.profilData.cards[0].organisation}</p>
                        <p>{props.profilData.jobCategories} {props.profilData.jobSubCategories}</p>
                        <p>{props.profilData.countries} {props.profilData.cities}</p>
                        {props.onPersonnalProfil?<p>Code neo : {props.profilData.owner.neocode}</p> : <></>}
                    </div>
                    <div className='pr-6 flex flex-col justify-center'>
                        <div className='flex flex-row items-center'>
                            <Image
                            src='/boostIcon.svg'
                            width={20}
                            height={20}
                            alt='boost icon'
                            className='py-4 mr-4'
                            />
                            <p>Boosts : {boosts.length}</p>
                        </div>   
                        
                        <div className='flex flex-row items-center'>
                            <Image
                            src='/alertIcon.svg'
                            width={20}
                            height={20}
                            alt='alert icon'
                            className='mr-4'
                            />
                            <p>Signalements : {alerts.length}</p>
                        </div>                        
                    </div>
            </div>
                <div className='flex justify-between flex-col'>
                {/* Boutons d'interactions si profil d'un autre utilisateur, si espace profil perso, bouton modifier */}
                    {interactions}
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
            <div className='text-base leading-7 text-gray-700 flex justify-between rounded-md shadow-sm ring-1 ring-inset ring-gray-300 p-10 mb-4'>
                {content}
            </div>

        </div>
    )
}