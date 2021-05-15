import './Nav.css'
import { useState, useContext, useEffect } from 'react'
import { NavLink, useHistory, withRouter } from 'react-router-dom'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Nav({ setCurrentUser, loggedin, setLoggedin }) {
    const history = useHistory();
    const isNewsRoute = history.location.pathname.includes('saved-news');
    const [ open, setOpen ] = useState(false);
    const currentUser = useContext(CurrentUserContext)

    function handleLogout() {
        localStorage.removeItem('token')
        setCurrentUser(false)
        setLoggedin(false)
    }

    function exit(e) {
        !/nav/gi.test(e.target.classList) && setOpen(false)
    }
    useEffect(() => {
        console.log('exit')
        window.addEventListener('click', exit);
        return () => window.removeEventListener('click', exit)
    }, [])

    return (
        <nav className={`nav ${open && 'nav_open'} ${isNewsRoute && 'nav_white'}`}>
            <div className='nav__container'>
                <NavLink exact to='/' className='nav__logo'>NewsExplorer</NavLink>
                <button className="nav__icon" onClick={() => setOpen(!open)} />
                <div className='nav__list'>
                    <NavLink exact to='/' className='nav__link' activeClassName='nav__link_active'>Home</NavLink>
                    { (currentUser || loggedin) ? 
                        <>
                            <NavLink to='/saved-news' className='nav__link' activeClassName='nav__link_active'>
                                Saved articles
                            </NavLink>
                            <div className='nav__logout'>
                                <span className='nav__user'>{currentUser?.name}</span>
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

export default withRouter(Nav)