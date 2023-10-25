import Image from 'next/image'
import EventsAll from '@/components/site/eventsall'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

export default function Contact() {


  return (
    
    <main>

      <div>

        <SiteNavbar />

      </div>
      
      <div>

        <EventsAll />

      </div>

      <div>

        <SiteFooter />
      
      </div>
      
    </main>
  )
}