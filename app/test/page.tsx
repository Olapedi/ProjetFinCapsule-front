import Image from 'next/image'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'
import Pricing from '@/components/site/pricing'
import Validation from '@/components/site/validationform'
import Example from '@/components/members/membersnavbar'
import MembersNavBar from '@/components/members/membersnavbar'
import UserProfilDisplay from '@/components/members/userprofildisplay'
import UserProfilDisplayMock from '@/components/members/userprofildisplayMockTest'
import FileInputComponent from '@/components/common/image_test'
export default function Test() {


  return (
    
    <main>

      <div>
         <FileInputComponent />
      </div>

      <div>
        <UserProfilDisplayMock/>
      </div>
      
    </main>
  )
}
