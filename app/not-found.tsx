import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6 px-4">
        <div className="relative w-16 h-16">
          <Image
            src="/agenxy-logo-black.svg"
            alt="Agenxy Logo"
            fill
            className="dark:hidden"
            priority
          />
          <Image
            src="/agenxy-logo-white.svg"
            alt="Agenxy Logo"
            fill
            className="hidden dark:block"
            priority
          />
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            We&apos;ve searched high and low, but couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <Link 
          href="/"
          className="px-6 font-semibold py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound