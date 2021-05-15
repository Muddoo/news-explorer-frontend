import './Card.css'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MainApi from  '../../utils/MainApi'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Card({ loggedIn, article, setArticles, keyWord, setPublicArticles }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news');
    const [isSaved, setSaved] = useState()
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => setSaved(article._id),[article])

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

    function handleClick() {

        if(isNews) {
            mainAPi.toggleArticle({id: article._id, method: 'DELETE'})
            .then(() => {
                setArticles(articles => articles.filter(a => article._id !== a._id))
                setPublicArticles(articles => articles.map(a => {
                    if(a._id === article._id) {
                        a._id = null;
                        return a
                    }
                    return a
                }))
            })
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
            const method = isSaved ? 'DELETE' : 'POST';
            const id = isSaved ? article._id : ''
            mainAPi.toggleArticle({body, method, id})
            .then((res) => {
                setSaved(!isSaved)
                method === 'POST' ? setPublicArticles(savedA => [...savedA, res]) : setPublicArticles(savedA => savedA.filter(a => a._id !== article._id))
                article._id = res._id;
                setArticles(articles => articles.map(a => a === article ? article : a))
            })
            .catch(err => console.log(err))
        }
    }

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
                onClick={handleClick}>
                { !loggedIn ? <p className="card__tooltip">Sign in to save articles</p> : null }
                { isNews ? <p className="card__tooltip">Remove from saved</p> : null }
            </button>
        </article>
    )
}

export default Card