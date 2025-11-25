"use client";
import Link from 'next/link';
import colorsJson from '../../../colors.json';
import { useI18n } from '../../context/LanguageProvider';

export default function Footer() {
    const colors = colorsJson.colors;
    const { t } = useI18n();

    return (
        <footer style={{ backgroundColor: colors.black }} className="text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Column 1: Logo, About Us heading, paragraph, social icons */}
                <div>
                    <div className="mb-4">
                        <div className="text-2xl font-bold">ITF-PRO</div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{t('footer.aboutHeading')}</h3>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#e7e7e7' }}>
                        {t('footer.aboutText')}
                    </p>

                    <div className="flex space-x-3 mt-2">
                        {/* Social icons as white circles */}
                        <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full flex items-center justify-center bg-white" title="LinkedIn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.98 3.5C4.98 4.60457 4.09257 5.492 2.988 5.492C1.88343 5.492 1 4.60457 1 3.5C1 2.39543 1.88343 1.508 2.988 1.508C4.09257 1.508 4.98 2.39543 4.98 3.5Z" fill="#000"/>
                                <path d="M6.5 8.5H1v14h5.5v-14zM10.5 8.5H16v2h.1c.8-1.5 3-1.6 4.4 0V8.5h3v14h-5.5v-7c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.7.7-2 1.4-.1.2-.1.5-.1.8v7.6H10.5v-14z" fill="#000"/>
                            </svg>
                        </a>

                        <a href="#" aria-label="Medium" className="w-9 h-9 rounded-full flex items-center justify-center bg-white" title="Medium">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4h20v16H2z" fill="#000"/>
                            </svg>
                        </a>

                        <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center bg-white" title="Instagram">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="3.5" fill="#000"/>
                                <path d="M17.5 3h-11A3.5 3.5 0 003 6.5v11A3.5 3.5 0 006.5 21h11a3.5 3.5 0 003.5-3.5v-11A3.5 3.5 0 0017.5 3z" stroke="#000" strokeWidth="1" fill="none"/>
                            </svg>
                        </a>

                        <a href="#" aria-label="X (Twitter)" className="w-9 h-9 rounded-full flex items-center justify-center bg-white" title="X">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 7.5c.01.14.01.28.01.42 0 4.3-3.27 9.27-9.27 9.27-1.84 0-3.56-.53-4.99-1.45.26.03.52.04.79.04 1.52 0 2.92-.52 4.04-1.4-1.42-.03-2.62-.96-3.03-2.24.2.04.4.06.61.06.29 0 .58-.04.85-.12-1.5-.3-2.63-1.62-2.63-3.21v-.04c.44.25.95.4 1.49.42-0.88-.59-1.46-1.6-1.46-2.74 0-.6.16-1.16.44-1.64 1.61 1.97 4.02 3.26 6.73 3.4-.05-.25-.08-.51-.08-.78 0-1.9 1.53-3.43 3.43-3.43.99 0 1.88.42 2.5 1.09.78-.15 1.51-.44 2.17-.84-.25.79-.78 1.45-1.48 1.87.69-.08 1.36-.27 1.98-.55-.46.68-1.05 1.28-1.72 1.76z" fill="#000"/>
                            </svg>
                        </a>

                        <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center bg-white" title="Facebook">
                            <svg width="12" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.95v-7.05H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.99 0 2.02.18 2.02.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.41v1.7h2.5l-.4 2.9h-2.1V22c4.78-.83 8.44-4.96 8.44-9.93z" fill="#000"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 2: Office */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">{t('footer.officeHeading') || 'Office'}</h4>
                    <address className="text-sm not-italic text-gray-200 leading-relaxed">
                        {t('footer.addressLine1')}
                        <br />
                        {t('footer.addressCity')}
                        <br />
                        {t('footer.addressZip')}
                    </address>
                </div>

                {/* Column 3: Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">{t('footer.contactHeading')}</h4>
                    <div className="text-sm text-gray-200">
                        <div>Email: <a href={`mailto:${t('footer.email')}`} className="text-white">{t('footer.email')}</a></div>
                        <div className="mt-2">Phone: <a href={`tel:${t('footer.phone')}`} className="text-white">{t('footer.phone')}</a></div>
                    </div>
                </div>

                {/* Column 4: Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">{t('footer.quickLinks')}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="text-gray-200">{t('nav.home')}</Link></li>
                        <li><Link href="/about-us" className="text-gray-200">{t('nav.about')}</Link></li>
                        <li><Link href="/service" className="text-gray-200">{t('nav.service')}</Link></li>
                        <li><Link href="/project" className="text-gray-200">{t('nav.project')}</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">&copy; 2025 ITF-PRO. All rights reserved.</div>
        </footer>
    );
}
