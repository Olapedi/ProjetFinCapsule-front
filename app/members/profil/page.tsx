"use client";


import SiteFooter from "@/components/site/sitefooter";
import {useEffect, useState} from 'react'
import MembersNavBar from "@/components/members/membersnavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
import BoostDisplay from "@/components/site/boostdisplay";

export default function ProfilUser() {

    return (
        <main>
            <div>
                <MembersNavBar />
            </div>

            <div>
                {/* <UserProfilDisplay/> */}
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
