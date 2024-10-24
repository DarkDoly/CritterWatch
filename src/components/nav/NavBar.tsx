import { Link } from 'react-router-dom';

//ask bro about this function
function NavBar() {
    return <nav className='navbar bg-body-tertiary'>
        <div className='container'>
            <Link to={'/'} className='navbar-brand'>Critter Watch</Link>
            <Link to={'/forum'} className='navbar-brand'>Hello</Link>
            <Link to={'/testBuild'} className='navbar-brand'>testBuild</Link>
        </div>
    </nav>
}

export default NavBar;