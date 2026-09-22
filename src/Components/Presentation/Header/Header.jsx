import { Link, useLocation } from 'react-router';
import { LogOut, Menu as MenuIcon, User, X } from 'lucide-react';
import { useState } from 'react';
import Logo from '../Logo';
import { useLanguage } from '../../../contexts/LanguageContext';
import SelectField from '../../../Utils/SelectField/SelectField';
import { MenuItem } from '@headlessui/react';
import { useAuth } from '../../../contexts/AuthContext';

function Header() {
    const { pathname } = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const NavLinks = [
        { label: t('nav.home'), path: '/home' },
        { label: t('nav.destinations'), path: '/destinations' },
        { label: t('nav.bookFlight'), path: '/book-flight' },
        { label: t('nav.about'), path: '/about' },
        { label: t('nav.contact'), path: '/contact' },
        ...(user ? [{ label: 'My bookings', path: '/my-bookings' }] : []),
    ];

    const isActive = (path) => path === '/home'
        ? pathname === '/' || pathname === '/home'
        : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className='sticky top-0 left-0 z-1000 flex items-center justify-between gap-4 bg-[rgba(246,227,227,0.36)] px-4 py-4 shadow-xs backdrop-blur-2xl sm:px-6 lg:justify-around lg:py-6'>
        <Link to={'/home'} onClick={() => setIsMenuOpen(false)}><Logo /></Link>

        <button
            type='button'
            className='rounded-md p-2 text-gray-700 hover:bg-white/60 lg:hidden'
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
        >
            {isMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>

        <nav className={(isMenuOpen ? 'flex ' : 'hidden ') + 'absolute left-4 right-4 top-full flex-col items-stretch gap-1 rounded-xl border border-gray-200 bg-white p-3 shadow-lg lg:static lg:flex lg:flex-row lg:items-center lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none'} aria-label='Main navigation'>
            { NavLinks.map(({ label, path }) => (
                <Link
                    className={'group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:text-(--sb-blue-250) ' + (isActive(path) ? 'bg-(--sb-blue-fade-4) text-(--sb-blue-250) shadow-sm' : 'text-gray-600')}
                    key={path}
                    to={path}
                    aria-current={isActive(path) ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {label}
                    <span className={'absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-(--sb-blue-250) transition-all duration-200 ' + (isActive(path) ? 'w-5' : 'w-0 group-hover:w-5')} />
                </Link>
            )) }
            <div className='mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3 lg:hidden'>
                {user ? <>
                    <Link
                        to='/my-bookings'
                        onClick={() => setIsMenuOpen(false)}
                        className='flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-(--sb-gray-hover)'
                    >
                        <User width={17} height={17} />
                        <span>{user.firstname} {user.lastname}</span>
                    </Link>
                    <button
                        type='button'
                        onClick={() => {
                            signOut();
                            setIsMenuOpen(false);
                        }}
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600'
                    >
                        <LogOut width={17} height={17} />
                        <span>Sign out</span>
                    </button>
                </> : (
                    <Link
                        to='/sign-in'
                        onClick={() => setIsMenuOpen(false)}
                        className='flex items-center gap-2 rounded-lg bg-(--sb-blue-250) px-4 py-2 text-sm font-medium text-white hover:opacity-90'
                    >
                        <User width={17} height={17} />
                        <span>{t('nav.signIn')}</span>
                    </Link>
                )}
            </div>
        </nav>

        <div className='hidden items-center gap-2 sm:gap-5 lg:flex'>
            {user ? <>
                <Link to='/my-bookings' className='hidden xl:flex items-center gap-2 rounded-md px-3 py-1.25 text-sm hover:bg-white/70'><User width={17} height={17}/> {user.firstname}</Link>
                <button type='button' onClick={signOut} className='rounded-md p-2 text-gray-500 hover:bg-white/70' aria-label='Sign out'><LogOut width={17}/></button>
            </> : <Link to={'/sign-in'} className='flex items-center justify-center gap-2 rounded-md px-3 py-1.25 transition-all hover:bg-orange-400 hover:text-white'> <User width={17} height={17}/> {t('nav.signIn')}</Link>}
            <Link to={'/book-flight'} className='rounded-md bg-blue-500 px-3 py-1.25 text-white hover:opacity-90'>{t('nav.bookNow')}</Link>
        </div>


    </header>
  )
}

export default Header