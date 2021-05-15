import './Card.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Card({ loggedIn, article, keyWord, toggleArticle }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news');
    const [isSaved, setSaved] = useState()

    useEffect(() => setSaved(article._id) ,[article])

    function formatDate(date) {
        return new Date(date).toLocaleDateString('en',{month: 'long', day: 'numeric', year: "numeric"})
    }

    return (
        <article className='card'>
            <a target='_blank' href={article.url || article.link} className='card__link'>
                <img src={article.image || article.urlToImage || 'Group.svg'} alt="article-img" className="card__image"/>
                <div className="card__body">
                    <p className="card__date">{isNews ? article.date : formatDate(article.publishedAt)}</p>
                    <p className='card__heading'>{article.title}</p>
                    <p className="card__text">{isNews ? article.text : article.content}</p>
                    <p className="card__footer">{isNews ? article.source : article.source.name}</p>
                </div>
                {isNews && <p className="card__keyword">{keyWord}</p>}
            </a>
            <button 
                type='button' 
                className={`card__save ${isSaved && 'card__saved'} ${(isNews ) && 'card__delete'}`} 
                onClick={() => toggleArticle(article)}>
                { !loggedIn ? <p className="card__tooltip">Sign in to save articles</p> : null }
                { isNews ? <p className="card__tooltip">Remove from saved</p> : null }
            </button>
        </article>
    )
}

export default Card