import { useState } from 'react';
import './ui/NavBar.css'
import { Link } from 'react-router-dom'
export default function NavBar(){
    const [open, setOpen] = useState(false);

    return (
    <nav className='navbar'>
        <span className='nav-logo'><Link to={'/'}>noodly</Link></span>
        <ul className={`list-options ${open ? 'open' : ''}`}>
            <li className='left'><Link to='/about'>about</Link></li>
            <li className='left'><Link to='/explore'>explore</Link></li>
            <li className='right'><Link to='/search'>search</Link></li>
        </ul>
        <button className='hb' aria-label='Toggle' onClick={() => setOpen(o => !o)}>
            <span></span><span></span><span></span>
        </button>
    </nav>
    );
}