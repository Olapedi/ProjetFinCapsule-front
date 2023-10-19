'use client'

import { useState } from 'react'
import { Dialog, Disclosure, RadioGroup } from '@headlessui/react'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import faqs from '../../neoney_datas/faqs.json'
import Testimonials from '../common/testimonials'

const pricing : any = {
  frequencies: [
    { value: 'monthly', label: 'Mensuel', priceSuffix: '/mois' },
    { value: 'annually', label: 'Annuel', priceSuffix: '/an' },
  ],
  tiers: [
    {
      name: 'Communauté',
      id: 'tier-community',
      href: '/join/login',
      price: { monthly: '0€', annually: '0€' },
      description: 'Boostez vos affaires près de chez vous, dans votre ville',
      features: ['Couverture régionale', "Limite de 200 contacts qualifiés dans votre ville", 'Limite de 200 participants uniques à vos événements'],
      mostPopular: false,
    },
    {
      name: 'Freelance',
      id: 'tier-freelancer',
      href: '/join/login',
      price: { monthly: '100€', annually: '1000€' },
      description: "Boostez vos affaires et votre réseau à l'échelle nationale",
      features: ['Couverture nationale', 'Limite de 1000 contacts qualifiés dans votre pays', 'Limite de 1000 participants uniques à vos événements'],
      mostPopular: false,
    },
    {
      name: 'Business',
      id: 'tier-business',
      href: '/join/login',
      price: { monthly: '149€', annually: '1490€' },
      description: "Boostez vos affaires et votre réseau à l'international",
      features: [
        'Couverture internationale',
        "Limite de 2000 contacts qualifiés à l'international",
        'Limite de 2000 participants uniques à vos événements',
        'Ajout de closeurs et commerciaux indépendants',
        'Support utilisateur prioritaire',        
      ],
      mostPopular: true,
    },
    {
      name: 'Agence',
      id: 'tier-agence',
      href: '/join/login',
      price: { monthly: '199€', annually: '1990€' },
      description: 'Dedicated support and infrastructure for your company.',
      features: [

        'Couverture internationale',
        "Aucune limite de contacts qualifiés à l'international",
        'Aucune limite de participants uniques à vos événements',
        'Ajout de closeurs et commerciaux indépendants',
        'Support utilisateur prioritaire',    
        'Support utilisateur dédié 1h par mois',
        'Ressources disponibles pour scaler vos activités'
      ],
      mostPopular: false,
    },
  ],
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [frequency, setFrequency] = useState(pricing.frequencies[0])

  return (
    <div className="bg-white">

      <main>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Exigez le meilleur pour gérer vos affaires
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Vous êtes freelances, indépendants, porteurs de projets, dirigeants ou dirigeantes d’entreprise, devenez Membre de la communauté des néo entrepreneurs et bénéficiez de l’ensemble de l’écosystème Kovalys Connect pour booster vos affaires.
          </p>
          <div className="mt-16 flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
              {pricing.frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                      'cursor-pointer rounded-full px-2.5 py-1'
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8'
                )}
              >
                <h2
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                      : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  Buy plan
                </a>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature : any) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial section */}

  
        {/* FAQ section */}
        <div className="mx-auto my-24 max-w-7xl px-6 sm:my-56 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">{faq.question}</span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

    </div>
  )
}
