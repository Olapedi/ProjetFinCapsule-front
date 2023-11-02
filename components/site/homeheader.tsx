import Image from "next/image"
import SigninForm from "./signinform"
import Link from "next/link"


export default function Homeheader() {


    return (
      
      <div className="relative bg-gray-50 ">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-6 pt-5 sm:pb-8 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-18 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="hidden sm:mt-8 sm:flex lg:mt-4">
                
              </div>
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Boostez vos affaires avec les bonnes connexions
              </h1>
              <p className="mt-12 text-lg leading-8 text-gray-600">
              Neoney, c&apos;est là où les affaires se font ! Plus de 50 000 chefs d&apos;entreprise, CEOs, dirigeants, experts, investisseurs et indépendants, dans plus de 20 pays se connectent pour vendre à la bonne clientèle, acheter auprès des meilleurs fournisseurs, investir ou lever des fonds pour développer leur entreprise.

              </p>
              <div className="mt-10 flex items-center gap-x-6">
                
                <Link href = '/join' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Rejoindre Neoney </Link>
                
                {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Découvrir la communauté <span aria-hidden="true">→</span>
                </a> */}
              </div>
            </div>
          </div>
          <div className="relative pb-24 lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0 py-6">
          <button></button>

          <SigninForm />

          </div>
        </div>
      </div>
    )
  }
  