'use client'

import autoprefixer from "autoprefixer"
import ReactPlayer from "react-player"


export default function Testimonials() {


let link1 = 'https://www.youtube.com/watch?v=L_K1QChgvr4'
let link2 = 'https://www.youtube.com/watch?v=YyTZ_VgHH4w'
let link3 = 'https://www.youtube.com/watch?v=aMN0-4in-zU'

  return (
  
    <main>

    <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
            
            <ReactPlayer url={link1} />

            </div>

            <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">

            <ReactPlayer url={link2} />

            </div>
          </div>
        </div>
      </section>

    </main>
      
  )
      
    
  }
  