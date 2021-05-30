import './Main.css'
import Card from '../Card/Card.js'
import { useHistory } from 'react-router-dom'
import NotFound from '../NotFound/NotFound.js'
import PreLoader from '../PreLoader/PreLoader.js'
import { useState, useMemo, useEffect } from 'react'

function Main({ loggedIn, spinner, setSpinner, articles, keyWord, articleServerErr, index, setIndex, toggleArticle }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news')
    const  [preloadArticles, setPreloadArticles] = useState([])

    useEffect(() => {
         Promise.all(articles.map(a => new Promise((res,rej) => {
            const img = new Image();
            img.src = a.image || a.urlToImage || 'Group.svg';
            img.onload = res;
            img.onerror = rej
        }))). then(res => {
            console.log(res);
            setPreloadArticles(articles)
        })
    }, [articles])

    useEffect(() => preloadArticles.length && setSpinner(false), [preloadArticles])

    // const memo = useMemo(() => {
    //      Promise.all(articles.map(a => new Promise((res,rej) => {
    //         const img = new Image();
    //         img.src = a.image || a.urlToImage || 'Group.svg';
    //         img.onload = res;
    //         img.onerror = rej
    //     }))). then(res => {
    //         console.log(res);
    //         setArt(articles)
    //     })
    // }, [articles])

    // const loadArticles = (articles = []) => Promise.all(articles.map((a,i) => new Promise((res,rej) => {
    //     const img = new Image();
    //     if(i < 3) {
    //         console.log(a.urlToImage)
    //         img.onload = () => res(a);
    //         img.onerror = rej
    //         img.src = a.image || a.urlToImage || 'Group.svg';
    //         return;
    //     }
    //     res(a)
    // })))
    
    return (
        <div className={`main ${(spinner || articles?.length) && 'main_open'}`}>
            <div className="main__container">
                { spinner && <PreLoader /> }
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