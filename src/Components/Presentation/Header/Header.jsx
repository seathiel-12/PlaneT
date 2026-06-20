import { Link } from 'react-router';
import logo from '../../../assets/react.svg';
import { User } from 'lucide-react';
import Logo from '../Logo';

function Header() {
    const NavLinks = ['Home', 'Destinations', 'Book Flight', 'About', 'Contact'];
  return (
    <header className='flex justify-around items-center py-6 bg-[rgba(246,227,227,0.36)] backdrop-blur-2xl shadow-xs sticky top-0 left-0 z-1000'>
        <Link to={'/home'}><Logo /></Link>

        <div className='flex gap-8'>
            { NavLinks.map((link) => (
                <Link className='opacity-60 hover:opacity-100 transition-all' key={link} to={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</Link>
            )) }
        </div>

        <div className='flex gap-5'>
            <Link to={'/sign-in'} className='flex gap-2 justify-center items-center px-3 rounded-md py-1.25  hover:bg-orange-400 hover:text-white transition-all'> <User width={17} height={17}/> Sign In</Link>
            <Link to={'/book-now'} className='px-3 py-1.25 rounded-md bg-blue-500 text-white hover:opacity-90'>Book Now</Link>
        </div>
    </header>
  )
}

export default Header