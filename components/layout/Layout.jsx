import React from 'react';
import Footer from './Footer';
import Header from './Header';
import AppBackground from '../AppBackground';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <AppBackground />

            <Header title="Consistency Hub" href="/" isHome />

            {children}

            <Footer />
        </div>
    );
}
