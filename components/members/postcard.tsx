import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PostCard(props: any) {


  console.log('card props: ',props)

  const card = {
                  ctbUid : props.ctbUid,
                  usrUid : props.usrUid,
                  proUid : props.proUid,
                  neocode : props.neocode,
                  country : props.country,
                  city : props.city,
                  senderDisplayName : props.senderDisplayName,
                  senderTitle : props.senderTitle,
                  senderOrganization : props.senderOrganization,
                  title : props.title,
                  text : props.text,
                  privacy : props.privacy,
                  category : props.category,
                  deadline : props.deadline,
                  mainPicture : props.mainPicture,
                  hashtags : props.hashtags,
                  likes : props.likes,
                  alerts : props.alerts,
                  comments : props.comments,
                  creationDate: props.creationDate
            
            }



  return (


    <section aria-labelledby="section-1-title">

    <div className="overflow-hidden rounded-lg bg-white shadow">



    <div className="bg-white px-4 py-5 sm:px-6">
      <div className="flex space-x-3 mb-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            <Link href={`/people?search=${card.proUid}`} className="hover:underline">
              {card.senderDisplayName}
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <h3 className="hover:underline">
             {card.creationDate}
            </h3>
          </p>
        </div>
      </div>

      <p> 

      {card.text}

      </p>


    </div>


    </div>
    </section>

  )
}
