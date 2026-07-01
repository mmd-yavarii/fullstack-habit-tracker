'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Header from './Header';
import AppBackground from '../AppBackground';

export default function Layout({ children }) {
    const pathname = usePathname();

    // همه مسیرهای auth
    const isAuthPage = pathname.startsWith('/auth');

    return (
        <div className="min-h-screen">
            <AppBackground />

            <Header title="Consistency Hub" href="/" isHome />

            {children}

            {!isAuthPage && <Footer />}
        </div>
    );
}
