import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-6 bg-gradient-to-tr from-pink-50 via-purple-50 to-indigo-100 text-gray-800 shadow-inner">
  {/* Left section */}
  <aside className="flex items-center space-x-3">
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-pink-500"
    >
      <path d="M22.672 15.226...z" />
    </svg>
    <p className="text-sm font-medium">
      Copyright © {new Date().getFullYear()} - All rights reserved
    </p>
  </aside>

  {/* Right section: social links */}
  <nav className="flex gap-6">
    <a className="hover:text-pink-500 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M24 4.557...z" />
      </svg>
    </a>
    <a className="hover:text-pink-500 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M19.615 3.184...z" />
      </svg>
    </a>
    <a className="hover:text-pink-500 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M9 8h-3v4h3...z" />
      </svg>
    </a>
  </nav>
</footer>

  )
}

export default Footer
