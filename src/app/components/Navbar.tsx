"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import colorsJson from '../../../colors.json';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../context/LanguageProvider';

export default function Navbar() {
    const pathname = usePathname() || '/';
    const colors = colorsJson.colors;

    const { t, lang, setLang } = useI18n();

    const links = [
        { href: '/', key: 'nav.home' },
        { href: '/about-us', key: 'nav.about' },
        { href: '/service', key: 'nav.service' },
        { href: '/project', key: 'nav.project' },
    ];

    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const listRef = useRef<HTMLUListElement | null>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

    useEffect(() => {
        const active = links.find(l => l.href === pathname) || links[0];
        const el = linkRefs.current[active.href];
        const listEl = listRef.current;
        if (el && listEl) {
            const elRect = el.getBoundingClientRect();
            const listRect = listEl.getBoundingClientRect();
            setIndicator({
                left: elRect.left - listRect.left,
                width: elRect.width,
                visible: true,
            });
        } else {
            setIndicator(s => ({ ...s, visible: false }));
        }
    }, [pathname]);

    // Language dropdown state
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement | null>(null);
    
    // Mobile menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target as Node)) setLangOpen(false);
        }
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    return (
        <nav
            style={{
                backgroundColor: colors.black,
                paddingTop: 'calc(1rem + 0.5vh)',
                paddingBottom: 'calc(1rem + 0.5vh)',
                position: 'sticky',
                top: 0,
                zIndex: 60,
                width: '100%'
            }}
            className="text-white px-6"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold text-white">ITF-PRO</div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="relative">
                        <ul ref={listRef} className="flex space-x-8 relative z-10">
                            {links.map(link => {
                                const isActive = link.href === pathname;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            ref={el => {
                                                linkRefs.current[link.href] = el;
                                            }}
                                            aria-current={isActive ? 'page' : undefined}
                                            className="px-1"
                                            style={{
                                                color: isActive ? colors.orange : '#FFFFFF',
                                                textDecoration: 'none',
                                            }}
                                            onClick={() => setLangOpen(false)}
                                        >
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* animated indicator */}
                        <div
                            style={{
                                position: 'absolute',
                                height: 3,
                                background: colors.orange,
                                bottom: -6,
                                left: indicator.left,
                                width: indicator.width,
                                transition: 'left 220ms cubic-bezier(.2,.9,.2,1), width 220ms cubic-bezier(.2,.9,.2,1), opacity 180ms',
                                opacity: indicator.visible ? 1 : 0,
                                borderRadius: 2,
                            }}
                        />
                    </div>
                </div>

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangOpen(v => !v)}
                            className="flex items-center px-3 py-1 text-white"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            aria-haspopup="menu"
                            aria-expanded={langOpen}
                        >
                            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{lang === 'fr' ? 'Français' : 'English'}</span>
                            <svg className="ml-1" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {langOpen && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-32 shadow-lg"
                                style={{ background: colors.black, border: `1px solid ${colors.orange}`, borderRadius: 6, zIndex: 50 }}
                            >
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2"
                                    onClick={() => { setLang('en'); setLangOpen(false); }}
                                    style={{ color: '#FFFFFF', background: lang === 'en' ? colors.orange : 'transparent', border: 'none' }}
                                >
                                    English
                                </button>
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2"
                                    onClick={() => { setLang('fr'); setLangOpen(false); }}
                                    style={{ color: '#FFFFFF', background: lang === 'fr' ? colors.orange : 'transparent', border: 'none' }}
                                >
                                    French
                                </button>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/contact"
                        className="px-4 py-2 font-medium"
                        style={{
                            backgroundColor: colors.orange,
                            color: '#FFFFFF',
                            borderRadius: '6px',
                        }}
                    >
                        {t('nav.contact')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center justify-center w-8 h-8"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4">
                    <div className="flex flex-col space-y-4">
                        {links.map(link => {
                            const isActive = link.href === pathname;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-2 py-2 text-base font-medium"
                                    style={{
                                        color: isActive ? colors.orange : '#FFFFFF',
                                        textDecoration: 'none',
                                    }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setLangOpen(false);
                                    }}
                                >
                                    {t(link.key)}
                                </Link>
                            );
                        })}
                        
                        {/* Mobile Language Selector */}
                        <div className="border-t border-gray-700 pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300 text-sm">Language:</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-3 py-1 text-sm rounded"
                                        style={{ 
                                            backgroundColor: lang === 'en' ? colors.orange : 'transparent',
                                            color: '#FFFFFF',
                                            border: `1px solid ${colors.orange}`
                                        }}
                                        onClick={() => { setLang('en'); setMobileMenuOpen(false); }}
                                    >
                                        EN
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm rounded"
                                        style={{ 
                                            backgroundColor: lang === 'fr' ? colors.orange : 'transparent',
                                            color: '#FFFFFF',
                                            border: `1px solid ${colors.orange}`
                                        }}
                                        onClick={() => { setLang('fr'); setMobileMenuOpen(false); }}
                                    >
                                        FR
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Contact Button */}
                        <Link
                            href="/contact"
                            className="px-4 py-3 font-medium text-center rounded-md"
                            style={{
                                backgroundColor: colors.orange,
                                color: '#FFFFFF',
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
