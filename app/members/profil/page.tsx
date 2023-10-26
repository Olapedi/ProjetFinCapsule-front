"use client";


import SiteFooter from "@/components/site/sitefooter";
import {useEffect, useState} from 'react'
import MembersNavBar from "@/components/members/membersnavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
import BoostDisplay from "@/components/site/boostdisplay";
import { useAppSelector } from "@/redux/store";

export default function ProfilUser() {

    const user = useAppSelector((state)=>state.authReducer.value)

    let [profilData,setProfilData] = useState([])
    const [neo,setNeo] =useState('')
    const [boosts,setBoosts] = useState([])
    const [alerts,setAlerts] = useState([])

    const getprofilData = async () => {
        const result = await fetch (`/profiles/${user.proUid}`)
        const data = await result.json()
        console.log('profilData : ',data)
        setProfilData(data)
    }

    const getUserNeo = async () => {
        const result = await fetch(`/users/${user.usrUid}`)
        const userData = await result.json()
        console.log('userData : ',userData)
        setNeo(userData.neoCode)
    }

    // const getProfilBoosts = async () => {
    //     const result = await fetch(`/boosts/${user.proUid}`)
    //     data = await result.json()
    //     setBoosts(data)
    // }
    // const getProfilAlerts = async () => {
    //     const result = await fetch(`/alerts/${user.proUid}`)
    //     data = await result.json()
    //     setAlerts(data)
    // }

    useEffect(()=>{
        getprofilData()
        // getProfilAlerts()
        // getProfilBoosts()
        getUserNeo()
    },[])

    console.log('profilData : ',profilData)
    console.log('neoCode : ',neo)

    return (
        <main>
            <div>
                <MembersNavBar />
            </div>

            <div>
                <UserProfilDisplay
                profilData={profilData}
                neo={neo}
                />
            </div>
            
            <div>
                <BoostDisplay/>
            </div>
            
            <div>
                <SiteFooter />
            </div>
        </main>
    );
}
