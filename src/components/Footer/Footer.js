import './Footer.css'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <p className='footer__text'>© 2021 Supersite, Powered by News API</p>
                <div className='footer__group'>
                    <div className='footer__links'>
                        <NavLink className='footer__link' to='/'>Home</NavLink>
                        <a
                        rel='noreferrer' 
                        className='footer__link'
                        href='https://github.com/Muddoo/news-explorer-frontend'
                        target='_blank'>Practicum by Yandex</a>
                    </div>
                    <div className='footer__icons'>
                        <a
                        rel='noreferrer' 
                        className='footer__icon'
                        href='https://github.com/Muddoo/news-explorer-frontend'
                        target='_blank' />
                        <a
                        rel='noreferrer' 
                        className='footer__icon'
                        href='https://github.com/Muddoo/news-explorer-frontend'
                        target='_blank' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer