import ReactPlayer from "react-player";

export default function AnnonceCard() {


    return (
      <div className="bg-white">
        <div className="relative bg-black">
          {/* Decorative image and overlay */}


          <ReactPlayer 
          url='https://www.youtube.com/watch?v=Ahk8Cz_y_Ac' 
          width={335}
          height={200}

          >

          </ReactPlayer>
      
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center py-5">

            <a
              href="https://www.lacapsule.academy/"
              target="_blank"
              className="my-2 inline-block rounded-md border border-transparent bg-white px-8 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              En savoir plus
            </a>
            
          </div>
        </div>
      </div>
    )
  }
  