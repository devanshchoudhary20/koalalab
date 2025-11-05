'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { mainNavigation, products, solutions } from '@/config/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToContact = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const headerHeight = 80 // Approximate header height
      const targetPosition = contactSection.offsetTop - headerHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute('href') === '#contact') {
        e.preventDefault()
        scrollToContact()
      }
    }

    // Add event listener for anchor clicks
    document.addEventListener('click', handleAnchorClick)
    
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <header className="sticky inset-x-0 top-0 z-50 font-content bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Koala Lab</span>
            <Image
              alt="Company Logo"
              src="/images/KoalaLogo.webp"
              width={100}
              height={100}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        <PopoverGroup className="hidden lg:flex lg:gap-x-4">
          {
            false &&
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 outline-none hover:bg-[#E0FFF6] px-3 py-2 rounded transition duration-150 ease-in-out">
                Product
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white p-4">
                    {products.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block p-4 rounded-lg transition duration-150 ease-in-out text-gray-900 hover:bg-[#E0FFF6]"
                        >
                        <div>
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          }

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 outline-none hover:bg-[#E0FFF6] px-3 py-2 rounded transition duration-150 ease-in-out">
              Solution
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block p-4 rounded-lg transition duration-150 ease-in-out text-gray-900 hover:bg-[#E0FFF6]"
                    >
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          {mainNavigation.map((item) => (
            <a 
              key={item.name} 
              href={item.name === 'Contact Us' ? '#contact' : item.href} 
              onClick={item.name === 'Contact Us' ? scrollToContact : undefined}
              className="text-sm/6 font-semibold text-gray-900 hover:bg-[#E0FFF6] px-3 py-2 rounded transition duration-150 ease-in-out"
            >
              {item.name}
            </a>
          ))}
        </PopoverGroup>
        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            onClick={scrollToContact}
            className="text-sm/6 font-semibold bg-gradient-fill-desktop px-4 py-2 rounded-md w-max text-gradient-fill-buttonText"
          >
            Request Trial
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Koala Lab</span>
              <Image
                alt="Company Logo"
                src="/images/koalaLabLogo.webp"
                width={100}
                height={100}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }: { open: boolean }) => (
                    <>
                      { 
                        false &&
                        <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                      }
                      <DisclosurePanel className="mt-2 space-y-2">
                        {products.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }: { open: boolean }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Solution
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {solutions.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                {mainNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.name === 'Contact Us' ? '#contact' : item.href}
                    onClick={item.name === 'Contact Us' ? scrollToContact : undefined}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}