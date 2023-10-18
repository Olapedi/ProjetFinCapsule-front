import Link from "next/link"
import Image from "next/image"


export default function ForgotPasswordForm() {

    return (

    <main className="flex flex-col justify-center"> 
      
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-12">
        
           <Link href = "/" className="flex justify-center"> 
   
          <span className="sr-only">Neoney</span>
          <Image src = '/neoney.png' width={200} height={50} alt='Logo Neoney'></Image>

            </Link>

          <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Mot de passe oublié 
          </h2>
        </div>


        <div className="bg-white shadow sm:rounded-lg flex justify-center">

        <div className="px-4 py-5 sm:p-6">
          
          <div className="mt-2 max-w-xl text-sm text-gray-500 text-center">
            <p>Renseignez votre adresse mail pour réinitialiser votre mot de passe. Si vous avez un compte dans notre base, vous recevrez un e-mail avec le lien de réinitialisation </p>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Réinitialiser
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Vous n'êtes pas membre ?{' '}

            <Link href = '/join' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Inscrivez-vous ! </Link>
            
          </p>
          
        </div>

        </div>



    </main>
    )
  }
  