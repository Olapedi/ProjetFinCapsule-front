import Image from 'next/image'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'
import Pricing from '@/components/site/pricing'
import Validation from '@/components/site/validationform'
import UserSpace from '@/components/members/userspace'
import Example from '@/components/members/membersnavbar'
import MembersNavBar from '@/components/members/membersnavbar'
import UserProfilDisplay from '@/components/members/userprofildisplay'
import UserProfilDisplayMock from '@/components/members/userprofildisplayMockTest'

export default function Test() {


  return (
    
    <main>

      <div>
         <MembersNavBar />
      </div>

      <div>
        <UserProfilDisplayMock/>
      </div>

      <div>
        {/* <EventsDisplay /> */}
      </div>
      
    </main>
  )
}
