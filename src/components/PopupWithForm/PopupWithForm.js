import './PopupWithForm.css'
import { useState, useEffect } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom' 

function PopupWithForm({ setLoggedin }) {
    const history = useHistory()
    const currentPath = useLocation().pathname;
    const [isOpen,setIsOpen] = useState(false);
    const [isTooltip, setTooltip] = useState(false);
    const [txt, setTxt] = useState();
    const [link, setLink] = useState();

    useEffect(() => {
        if(/signin|signup/.test(currentPath) && !isOpen) setIsOpen(true);
        if(/signin|signup/.test(currentPath)) {
            setTxt(currentPath.replace('/sign',''));
            setLink(currentPath.includes('signin') ? 'up' : 'in');
            setTooltip(false)
        }
    },[currentPath])

    function handleToggle(e) {
        if(e.target === e.currentTarget) {
            setIsOpen(!isOpen)
            history.push('/')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(currentPath.includes('signin')) {
            setIsOpen(false);
            history.push('/');
            setLoggedin(true);
            return
        }
        // history.push('/signin')
        setTooltip(true)
    }

    return (
        <div 
            className={`popup ${isOpen || 'popup_hidden'}`}
            onClick={handleToggle}
            >
            {!isTooltip ?
                <form 
                    className='popup__form'
                    onSubmit={handleSubmit}>
                    <h2 className='popup__title'>{'Sign ' + txt}</h2>
                    <fieldset className='popup__container'>
                        <div className='popup__wrapper'>
                            <label className='popup__label' htmlFor='email'>Email</label>
                            <input className='popup__field' type='email' name='email' id='email' placeholder='Enter email' autoComplete='off' />
                            <p className="popup__error">Invalid email address</p>
                        </div>
                        <div className='popup__wrapper'>
                            <label className='popup__label' htmlFor='Password'>Password</label>
                            <input className='popup__field' type='Password' name='Password' id='Password' placeholder='Enter password' />
                            <p className="popup__error"></p>
                        </div>
                        {txt === 'up' ?
                            <div className='popup__wrapper'>
                                <label className='popup__label' htmlFor='name'>Username</label>
                                <input className='popup__field' type='text' name='name' id='name' placeholder='Enter your username' />
                                <p className="popup__error"></p>
                            </div> : null}
                    </fieldset>
                    <button type='submit' className='popup__btn-submit'>
                        {'Sign ' + txt}
                        <p className='popup__error-submit'>This email is not available</p>
                    </button>
                    <button type='button' className='popup__btn-link' >
                        or <NavLink className='popup__link' to={'sign' + link}>
                                {'Sign ' + link}
                        </NavLink>
                    </button>
                    <button type='button' className="popup__close" onClick={handleToggle} />
                </form> : null}
            {isTooltip ?
                <div className="popup__form">
                    <h2 className="popup__title popup__title_tooltip">Registration successfully completed!</h2>
                    <NavLink to='/signin' className="popup__link">Sign in</NavLink>
                    <button type='button' className='popup__close' onClick={handleToggle}/>
                </div> : null}
        </div>
    )
}

export default PopupWithForm