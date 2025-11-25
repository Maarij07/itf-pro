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

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target as Node)) setLangOpen(false);
        }
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    return (
        <nav style={{ backgroundColor: colors.black }} className="text-white py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold text-white">ITF-PRO</div>

                <div className="flex-1 flex justify-center">
                    <div className="relative">
                        <ul ref={listRef} className="flex space-x-8 relative z-10">
                            {links.map(link => {
                                const isActive = link.href === pathname;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            ref={el => (linkRefs.current[link.href] = el)}
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

                <div className="flex items-center space-x-4">
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
            </div>
        </nav>
    );
}
