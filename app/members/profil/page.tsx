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
        // dispatch(logIn({userUid:'usr2023102623866', proUid:'pro2023102527605'}))
        getprofilData()
        // getProfilAlerts()
        // getProfilBoosts()
        getUserNeo()
    },[])

    console.log('profilData : ',profilData)
    console.log('neoCode : ',neo)

    let profilDisplay = <></>

    if(profilData.length){
      console.log("profilD in if", profilData);
      
      profilDisplay =  <UserProfilDisplay
                profilData={profilData[0]}
                neo={neo}
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
                <BoostDisplay/>
            </div>
            
            <div>
                <SiteFooter />
            </div>
        </main>
    );
}
