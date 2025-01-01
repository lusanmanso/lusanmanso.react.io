import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
        <h1>React & Next.js</h1>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/produtos" className="text-gray-800 hover:text-blue-500">Produtos</Link>
          <Link href="/tecnologias" className="text-gray-800 hover:text-blue-500">Tecnologias</Link>
        </nav>

    </header>
  )
}
