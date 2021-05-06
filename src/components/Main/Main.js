import './Main.css'
import Card from '../Card/Card.js'
import { useHistory } from 'react-router-dom'
import NotFound from '../NotFound/NotFound.js'
import PreLoader from '../PreLoader/PreLoader.js'

function Main({loggedIn}) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('aaa')
    return (
        <div className="main">
            <PreLoader />
            <div className="main__container">
                {isNews || <h2 className="main__title">Search results</h2>}
                <div className="main__list">
                    <Card loggedIn={loggedIn} />
                    <Card loggedIn={loggedIn} />
                    <Card loggedIn={loggedIn} />
                    <Card loggedIn={loggedIn} />
                </div>
                {isNews || <button className='main__button' type='button'>Show more</button>}
            </div>
            <NotFound />
        </div>
    )
}

export default Main