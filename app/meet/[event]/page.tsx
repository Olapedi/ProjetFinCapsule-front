import Image from 'next/image'
import EventsAll from '@/components/site/eventsall'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'
import EventContainer from '@/components/containers/eventscontainer'
import {useRouter} from 'next/router'

export default function Meet({params}) {

  
  return (
    
    <main>

    <div>
<h1>{params.event}</h1>
    <EventContainer urlParam={params.event} />

    </div>
      
    </main>
  )
}