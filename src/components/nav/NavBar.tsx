import { Link } from 'react-router-dom';

function NavBar() {
    // Navbar needs the logo for Critter Watch Leftmost on the screen,
    // Clicking the icon will send you to the home page instead of having a button that useSyncExternalStore, "home".
    return <nav className='navbar bg-body-tertiary'>
        <div className='container'>
            <Link to={'/'} className='navbar-brand'>
                <img src="/src/assets/critterwatchlogotransparentlogo.png" width={50} height={50}/> Critter Watch
            </Link>
            <Link to={'/forum'} className='navbar-brand'>Hello</Link>
            <Link to={'/profile'} className='navbar-brand'>Profile</Link>
            <Link to={'/forgotPasswordTempA'} className='navbar-brand'>forgotPasswordTempA</Link>
            <Link to={'/forgotPasswordTempB'} className='navbar-brand'>forgotPasswordTempB</Link>
        </div>
    </nav>
}

export default NavBar;