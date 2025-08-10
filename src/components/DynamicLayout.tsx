'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export { Navbar, Sidebar, Footer };