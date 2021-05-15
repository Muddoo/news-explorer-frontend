import './PopupWithForm.css'
import { useState, useEffect, useContext } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom' 
import { useFormWithValidation } from '../../hooks/useFormWithValidation'
import { authorize, register, checkToken } from '../../utils/auth'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function PopupWithForm({ setCurrentUser }) {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory()
    const currentPath = useLocation().pathname;
    const [serverError, setServerError] = useState()
    const [fields, errors, isValid, handleChange, reset] = useFormWithValidation(setServerError)
    const [isOpen,setIsOpen] = useState(false);
    const [isTooltip, setTooltip] = useState(false);
    const [txt, setTxt] = useState();
    const [link, setLink] = useState();

    useEffect(() => {
        if(currentUser) return history.push('/');
        reset()
        setServerError()
        if(/signin|signup/.test(currentPath) && !isOpen) setIsOpen(true); else setIsOpen(false);
        if(/signin|signup/.test(currentPath)) {
            setTxt(currentPath.replace('/sign',''));
            setLink(currentPath.includes('signin') ? 'up' : 'in');
            setTooltip(false)
        }
    },[currentPath, currentUser])

    function handleToggle(e) {
        if(e.target === e.currentTarget) {
            setIsOpen(!isOpen)
            history.push('/')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password, email, name } = fields;

        if(currentPath.includes('signin')) {

            authorize(password, email)
                .then(async token => {
                    localStorage.setItem('token', token);
                    setCurrentUser({... await checkToken(token), token});
                    setIsOpen(false);
                    history.push('/')
                })
                .catch(err => {
                    console.log(err);
                    const errMsg = err.validation ? err.validation.body.message : err.error
                    setServerError(errMsg)
                })
            return
        }

        register(password, email, name)
            .then(() => setTooltip(true))
            .catch(err => {
                console.log(err);
                const errMsg = err.validation ? err.validation.body.message : 'Duplicate Email either sign in or signup with different email'
                setServerError(errMsg)
            }) 

    }

    return (
        <>
        {!localStorage.getItem('token') &&
            <div 
                className={`popup ${isOpen || 'popup_hidden'}`}
                onClick={handleToggle}
                >
                {!isTooltip ?
                    <form 
                        className='popup__form'
                        onSubmit={handleSubmit}
                        noValidate >
                        <h2 className='popup__title'>{'Sign ' + txt}</h2>
                        <fieldset className='popup__container'>
                            <div className='popup__wrapper'>
                                <label className='popup__label' htmlFor='email'>Email</label>
                                <input 
                                    className='popup__field' 
                                    type='email' 
                                    name='email' 
                                    id='email' 
                                    placeholder='Enter email' 
                                    autoComplete='off'
                                    value={fields['email'] || ''}
                                    onChange={handleChange}
                                    required />
                                <p className="popup__error">{errors['email']?.substring(0,44)}</p>
                            </div>
                            <div className='popup__wrapper'>
                                <label className='popup__label' htmlFor='password'>Password</label>
                                <input 
                                    className='popup__field' 
                                    type='password' 
                                    name='password' 
                                    id='password' 
                                    placeholder='Enter password'
                                    minLength={4}
                                    maxLength={12}
                                    value={fields['password'] || ''}
                                    onChange={handleChange}
                                    required />
                                <p className="popup__error">{errors['password']?.substring(0,50)}</p>
                            </div>
                            {txt === 'up' ?
                                <div className='popup__wrapper'>
                                    <label className='popup__label' htmlFor='name'>Username</label>
                                    <input 
                                        className='popup__field'
                                        type='text'
                                        name='name'
                                        id='name' 
                                        placeholder='Enter your username'
                                        minLength='4'
                                        maxLength='10'
                                        autoComplete='off'
                                        value={fields['name'] || ''}
                                        onChange={handleChange}
                                        required />
                                    <p className="popup__error">{errors['name']?.substring(0,50)}</p>
                                </div> : null}
                        </fieldset>
                        <button type='submit' className='popup__btn-submit' disabled={!isValid}>
                            {'Sign ' + txt}
                            <p className='popup__error-submit'>{serverError}</p>
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
            </div>}
        </>
    )
}

export default PopupWithForm