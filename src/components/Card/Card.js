import './Card.css'
import articleImg from '../../images/image_08.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Card({loggedIn}) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news');
    const [isSaved, setSaved] = useState(false)

    function handleClick(e) {
        if(isNews) return e.target.closest('.card').remove();
        if(loggedIn) return setSaved(!isSaved)
    }

    return (
        <article className='card'>
            <img src={articleImg} alt="article-img" className="card__image"/>
            <div className="card__body">
                <p className="card__date">November 4, 2020</p>
                <p className='card__heading'>Everyone Needs a Special 'Sit Spot' in Nature</p>
                <p className="card__text">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
                <p className="card__footer">treehugger</p>
            </div>
            <button 
                type='button' 
                className={`card__save ${isSaved && 'card__saved'} ${isNews && 'card__delete'}`} 
                onClick={handleClick}>
                { !loggedIn ? <p className="card__tooltip">Sign in to save articles</p> : null }
                { isNews ? <p className="card__tooltip">Remove from saved</p> : null }
            </button>
            <p className="card__keyword">Nature</p>
        </article>
    )
}

export default Card