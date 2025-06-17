import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Spinner */}
          <div className="absolute -inset-3 border-3 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500 dark:border-t-blue-400"></div>
          {/* Logo */}
          <div className="relative w-12 h-12">
            <Image
              src="/agenxy-logo-black.svg"
              alt="Loading..."
              fill
              className="dark:hidden"
              priority
            />
            <Image
              src="/agenxy-logo-white.svg"
              alt="Loading..."
              fill
              className="hidden dark:block"
              priority
            />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default loading