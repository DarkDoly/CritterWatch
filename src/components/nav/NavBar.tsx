import { Link } from 'react-router-dom';

function NavBar() {
    // Navbar needs the logo for Critter Watch Leftmost on the screen,
    // Clicking the icon will send you to the home page instead of having a button that useSyncExternalStore, "home".
    return <nav className='navbar bg-body-tertiary'>
        <div className='container'>
            <Link to={'/'} className='navbar-brand'>Critter Watch</Link>
            <Link to={'/forum'} className='navbar-brand'>Hello</Link>
            <Link to={'/forgotPasswordTemp'} className='navbar-brand'>forgotPasswordTemp</Link>
        </div>
    </nav>
}

export default NavBar;