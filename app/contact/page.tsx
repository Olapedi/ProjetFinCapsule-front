import Image from 'next/image'
import ContactForm from '@/components/site/contactform'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

export default function Contact() {


  return (
    
    <main>

      <div>

        <SiteNavbar />

      </div>
      
      <div>

      <ContactForm />

      </div>

      <div>

      <SiteFooter />
      
      </div>
      
    </main>
  )
}
