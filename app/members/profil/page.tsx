"use client";


import SiteFooter from "@/components/site/sitefooter";
import {useEffect, useState} from 'react'
import MembersNavBar from "@/components/members/membersnavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
import BoostDisplay from "@/components/site/boostdisplay";
import { useAppSelector } from "@/redux/store";

export default function ProfilUser() {

    const user = useAppSelector((state)=>state.authReducer.value)

    const [profilData,setProfilData] = useState([])
    const [neo,setNeo] =useState('')
    const [boosts,setBoosts] = useState([])
    const [alerts,setAlerts] = useState([])
  
    const getprofilData = async () => {
        const result = await fetch (`${process.env.backendserver}/profiles/${user.proUid}`)
        const data = await result.json()
        data.splice(0,1)
        setProfilData(data)
    }
  
    const getUserNeo = async () => {
        const result = await fetch(`${process.env.backendserver}/users/${user.usrUid}`)
        const userData = await result.json()
        setNeo(userData[1].neocode)
    }
  
    const getProfilBoosts = async () => {
        const result = await fetch(`${process.env.backendserver}/boosts/profile/${user.proUid}`)
        const data = await result.json()
        if(data[0].result){
            data.splice(0,1)
            setBoosts(data)
        }
    }
    // const getProfilAlerts = async () => {
    //     const result = await fetch(`${process.env.backendserver}/alerts/${user.proUid}`)
    //     const data = await result.json()
    //     setAlerts(data)
    // }
  
    useEffect(()=>{
        getprofilData()
        getProfilBoosts()
        // getProfilAlerts()
        getUserNeo()
    },[])

    console.log('boosts : ',boosts)

    let profilDisplay = <></>

    if(profilData.length && boosts){
      
      profilDisplay =  <UserProfilDisplay
                profilData={profilData[0]}
                neo={neo}
                boosts={boosts}
                onPersonnalProfil={false}
                // alerts={alerts}
             />
    }

    return (
        <main>
            <div>
                <MembersNavBar />
            </div>

            <div>
                {profilDisplay}
            </div>
            
            <div>
                <BoostDisplay
                boosts={boosts}
                />
            </div>
            
            <div>
                <SiteFooter />
            </div>
        </main>
    );
}
