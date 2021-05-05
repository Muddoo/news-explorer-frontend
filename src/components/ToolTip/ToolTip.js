import './ToolTip.css'
import { NavLink } from 'react-router-dom'

function ToolTip() {
    return (
        <div className='tool tool_hidden'>
            <div className="tool__container">
                <h2 className="tool__title">Registration successfully completed!</h2>
                <NavLink to='Signin' className="tool__link">Sign in</NavLink>
                <button type='button' className='tool__close' />
            </div>
        </div>
    )
}

export default ToolTip