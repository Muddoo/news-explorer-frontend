import './Card.css'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import MainApi from  '../../utils/MainApi'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Card({ loggedIn, article, setArticles, keyWord }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news');
    const [isSaved, setSaved] = useState(false)
    const currentUser = useContext(CurrentUserContext)

    const mainAPi = new MainApi({
        // baseUrl: 'https://obscure-island-11341.herokuapp.com',
        baseUrl: 'http://localhost:3001',
        options: {
            headers: {
              authorization: `Bearer ${currentUser?.token}`,
              "Content-Type": "application/json",
            }
        }
    })

    function handleClick(e) {

        if(isNews) {
            mainAPi.toggleArticle({id: article._id, method: 'DELETE'})
            .then(() => setArticles(articles => articles.filter(a => article._id !== a._id)))
            .catch(err => console.log(err))
            return
        }

        if(currentUser) {
            const body = {
                keyword: keyWord,
                title: article.title,
                text: article.content,
                date: formatDate(article.publishedAt),
                source: article.source.name,
                link: article.url,
                image: article.urlToImage || 'Group.svg',
            }
            mainAPi.toggleArticle({body})
            .then(() => setSaved(!isSaved))
            .catch(err => console.log(err))
        }
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString('en',{month: 'long', day: 'numeric', year: "numeric"})
    }

    return (
        <article className='card'>
            <img src={article.image || article.urlToImage || 'Group.svg'} alt="article-img" className="card__image"/>
            <div className="card__body">
                <p className="card__date">{isNews ? article.date : formatDate(article.publishedAt)}</p>
                <p className='card__heading'>{article.title}</p>
                <p className="card__text">{isNews ? article.text : article.content}</p>
                <p className="card__footer">{isNews ? article.source : article.source.name}</p>
            </div>
            <button 
                type='button' 
                className={`card__save ${isSaved && 'card__saved'} ${isNews && 'card__delete'}`} 
                onClick={handleClick}>
                { !loggedIn ? <p className="card__tooltip">Sign in to save articles</p> : null }
                { isNews ? <p className="card__tooltip">Remove from saved</p> : null }
            </button>
            {isNews && <p className="card__keyword">{keyWord}</p>}
        </article>
    )
}

export default Card