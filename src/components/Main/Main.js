import './Main.css'
import Card from '../Card/Card.js'
import { useLocation, useHistory } from 'react-router-dom'
import NotFound from '../NotFound/NotFound.js'
import PreLoader from '../PreLoader/PreLoader.js'
import { useState, useEffect } from 'react'

function Main({ loggedIn, spinner, spinnerText, setSpinner, articles, keyWord, articleServerErr, index, setIndex, toggleArticle }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news')
    const  [preloadArticles, setPreloadArticles] = useState([])

    useEffect(() => {
        let unsubscribe = false;
        articles.length && setSpinner(true)
        preloadArticles.length && setPreloadArticles(articles)
        !preloadArticles.length &&
        Promise.all(articles.map(a => new Promise((res,rej) => {
            const img = new Image();
            img.src = a.image || a.urlToImage || 'Group.svg';
            img.onload = res;
            img.onerror = () => {
                a.image = 'Group.svg';
                res()
            };
        }))). then(() =>  !unsubscribe && setPreloadArticles(articles))

        return () => unsubscribe = true
    }, [articles])

    useEffect(() => preloadArticles.length && setSpinner(false), [preloadArticles])
    useEffect(() => setPreloadArticles([]) ,[isNews])
    console.log(preloadArticles)
    
    return (
        <div className={`main ${(spinner || articles?.length) && 'main_open'}`}>
            <div className="main__container">
                { spinner && <PreLoader spinnerText={ isNews ? 'Loading Your Articles...' : spinnerText } /> }
                {(!isNews && preloadArticles.length) ? <h2 className="main__title">Search results</h2> : null}

                {preloadArticles.length ?
                    <div className="main__list">
                        {isNews ?
                            preloadArticles.map((article) => (
                            <Card key={article._id} loggedIn={loggedIn} article={article} keyWord={article.keyword} toggleArticle={toggleArticle} />
                            )) :
                            preloadArticles.slice(0,index*3).map((article,i) => (
                                <Card key={i} loggedIn={loggedIn} article={article} keyWord={keyWord} toggleArticle={toggleArticle} />
                            ))
                        }
                    </div> : 
                    null}
                    
                {(!isNews && preloadArticles.length && index*3 <= articles?.length) ?
                    <button className='main__button' type='button' onClick={() => setIndex(index+1)}>
                        Show more
                    </button> :
                     null}
            </div> 

            {(articles && !articles.length && !isNews && index) ? <NotFound /> : null}
            {articleServerErr && !spinner && <NotFound articleServerErr={articleServerErr} />}
        </div>
    )
}

export default Main