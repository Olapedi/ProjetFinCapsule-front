import Image from 'next/image'
import ProfilesAll from '@/components/site/profilesall'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

export default function Contact() {


  return (
    
    <main>

      <div>

        <SiteNavbar />

      </div>
      
      <div>

        <ProfilesAll />

      </div>

      <div>

        <SiteFooter />
      
      </div>
      
    </main>
  )
}