import './Header.css'
import SearchForm from '../SearchForm/SearchForm.js'

function Header({ setSpinner, setKeyWord }) {
    return (
        <div className="header">
            <div className="header__container">
                <h1 className="header__title">What's going on in the world?</h1>
                <p className="header__subtitle">Find the latest news on any topic and save them in your personal account.</p>
                <SearchForm setSpinner={setSpinner} setKeyWord={setKeyWord} />
            </div>
        </div>
    )
}

export default Header