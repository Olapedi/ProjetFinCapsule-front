'use client'
import Image from "next/image";
import SiteNavbar from "@/components/site/sitenavbar";
import SiteFooter from "@/components/site/sitefooter";
import Pricing from "@/components/site/pricing";
import Validation from "@/components/site/validationform";
// import Example from "@/components/members/membersnavbar";
// import MembersNavBar from "@/components/members/membernavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
// import UserProfilDisplayMock from "@/components/members/userprofildisplayMockTest";
import ProfilesAll from "@/components/site/profilesall";
// import Example from "@/components/site/testDropdownMenu";
import Dashboard from "@/components/members/dashboard";
import FileInputComponent from "@/components/common/image_test";
import EventForm_formData from "@/components/site/eventform_formData";
import EventForm from "@/components/site/eventform";
import MemberDashboard from "@/components/members/memberdashboard";
import EventDisplay from "@/components/site/eventdisplay";
import {useEffect, useState} from 'react'
import EventsAll from "@/components/site/eventsall";


export default function Test() {

  return (
    
    <main>
      
      <div>
        <EventsAll/>
      </div>

      <div>
        
      </div>
      
    </main>
  )
}
