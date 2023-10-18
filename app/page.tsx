import Image from 'next/image'
import Homeheader from '../components/site/homeheader'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

export default function Home() {


  return (
    
    <main>

      <div>

      <SiteNavbar />

      </div>

      <div>

      <Homeheader />

      </div>
      
      <div>

      <SiteFooter />

      </div>

    </main>
  )
}
