import { BellIcon } from '@heroicons/react/24/outline'
import Userprofileheading from './userprofileheading'
import Userslist from './userslist'



export default function Userprofilelayout() {
  return (

    <div className="flex min-h-full flex-col">
      

        <main className="xl:pl-96">
            
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{/* Main area */}
        


        </div>



        </main>

        <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}



        </aside>






    </div>
  )
}
