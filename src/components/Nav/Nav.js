import './Nav.css'
import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

function Nav({ loggedIn, setLoggedin }) {
    const history = useHistory();
    const isNewsRoute = history.location.pathname.includes('saved-news');
    const [ open, setOpen ] = useState(false);

    function handleLogout() {
        setLoggedin(false)
    }

    return (
        <nav className={`nav ${open && 'nav_open'} ${isNewsRoute && 'nav_white'}`}>
            <div className='nav__container'>
                <NavLink exact to='/' className='nav__logo'>NewsExplorer</NavLink>
                <button className="nav__icon" onClick={() => setOpen(!open)} />
                <div className='nav__list'>
                    <NavLink exact to='/' className='nav__link' activeClassName='nav__link_active'>Home</NavLink>
                    { loggedIn ? 
                        <>
                            <NavLink to='/saved-news' className='nav__link' activeClassName='nav__link_active'>
                                Saved articles
                            </NavLink>
                            <div className='nav__logout'>
                                <span className='nav__user'>Elise</span>
                                <NavLink to='/' className='nav__logout-btn' onClick={handleLogout} />
                            </div>
                        </> :
                        <NavLink to='/signin' className='nav__auth'>Sign in</NavLink>
                    }   
                </div>
            </div>
        </nav>
    )
}

export default Nav