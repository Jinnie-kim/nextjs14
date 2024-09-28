'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../style/navigation.module.css';

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">HOME</Link> {path === '/' && '✨'}
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
          {path === '/about-us' && '✨'}
        </li>
      </ul>
    </nav>
  );
}
