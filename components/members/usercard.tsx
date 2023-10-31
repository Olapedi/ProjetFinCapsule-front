import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import BoostButton from '../modals/boostmodal'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    key : '1',
    email: 'janecooper1@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },

  {
    name: 'Jane Cooper',
    key : '2',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper2@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },

  {
    name: 'Mickey',
    key : '3',
    title: 'Eastern Egg',
    role: 'Admin',
    email: 'mickey@lacapsule.com',
    telephone: '+1-202-555-0170',
    imageUrl:
    'https://3.bp.blogspot.com/-0AM-0MyQTzM/VwvY2yW7hlI/AAAAAAAAHaQ/M8J7igpDPWkoAcCU4zNre5UNhcsDv-q3w/s1600/mikey_mouse.png'
      // 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },


  // More people...
]

export default function UserCard() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6">
      {people.map((person) => (
        <li
          key={person.key}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{person.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {person.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Email
                </a>
              </div>

                
                <BoostButton />


            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
