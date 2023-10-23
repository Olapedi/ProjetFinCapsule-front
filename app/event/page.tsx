import Image from 'next/image'
import EventForm from '@/components/site/eventform'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

export default function Contact() {


  return (
    
    <main>

      <div>

        <SiteNavbar />

      </div>
      
      <div>

      <EventForm />

      </div>

      <div>

      <SiteFooter />
      
      </div>
      
    </main>
  )
}
