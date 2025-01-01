import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 fixed top-0 w-full z-10 h-15">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">React & Next.js</Link>
        </h1>
        <nav className="space-x-4">
          <Link href="/produtos" className="text-gray-800 hover:text-blue-500">
            Products
          </Link>
          <Link href="/tecnologias" className="text-gray-800 hover:text-blue-500">
            Technologies
          </Link>
        </nav>
      </div>
    </header>
  );
}