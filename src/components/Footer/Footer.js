import './Footer.css'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className="footer__container">
                <p className='footer__text'>© 2021 Supersite, Powered by News API</p>
                <div className="footer__group">
                    <div className="footer__links">
                        <NavLink className='footer__link' to='/'>Home</NavLink>
                        <NavLink className='footer__link' to='#'>Practicum by Yandex</NavLink>
                    </div>
                    <div className='footer__icons'>
                        <NavLink className='footer__icon' to='#' />
                        <NavLink className='footer__icon' to='#' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer