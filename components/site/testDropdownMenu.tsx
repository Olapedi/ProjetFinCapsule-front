import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Example() {
  return (
    <div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open interaction menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/menuIcon.svg"
                        alt="open interaction menu icon"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                            <div className={classNames(active ? 'bg-gray-100 cursor-grab' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                                <Image
                            src='/msgIcon.svg'
                            width={20}
                            height={20}
                            alt='message action logo'
                            className='mr-4'
                            />
                            <p>Contacter</p>
                            </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                            <div className={classNames(active ? 'bg-gray-100 cursor-grab' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                                <Image
                            src='/circleIcon.svg'
                            width={20}
                            height={20}
                            alt='action alligner logo'
                            className='mr-4'
                            />
                            <p>S'alligner</p>
                            </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                            <div className={classNames(active ? 'bg-gray-100 cursor-grab' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                                <Image
                            src='/boostIcon.svg'
                            width={20}
                            height={20}
                            alt='boost action logo'
                            className='mr-4'
                            />
                            <p>Booster</p>
                            </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                            <div className={classNames(active ? 'bg-gray-100 cursor-grab' : '', 'block px-4 py-2 text-sm text-gray-700 flex')}>
                                <Image
                            src='/alertIcon.svg'
                            width={20}
                            height={20}
                            alt='boost action logo'
                            className='mr-4'
                            />
                            <p>Signaler</p>
                            </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
    </div>
  )
}
