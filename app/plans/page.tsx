import Image from 'next/image'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'
import Pricing from '@/components/site/pricing'

export default function Plans() {


  return (
    
    <main>

      <div>

        <SiteNavbar />

      </div>
      
      <div>

      <Pricing />

      </div>

      <div>

      <SiteFooter />
      
      </div>
      
    </main>
  )
}
