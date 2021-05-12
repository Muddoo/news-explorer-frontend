import './Main.css'
import Card from '../Card/Card.js'
import { useHistory } from 'react-router-dom'
import NotFound from '../NotFound/NotFound.js'
import PreLoader from '../PreLoader/PreLoader.js'

function Main({ loggedIn, spinner, articles, setArticles, setPublicArticles, keyWord, articleServerErr, index, setIndex }) {
    const history = useHistory();
    const isNews = history.location.pathname.includes('saved-news')
    
    return (
        <div className={`main ${(spinner || articles?.length) && 'main_open'}`}>
            <div className="main__container">
                {(!isNews && articles?.length) ? <h2 className="main__title">Search results</h2> : null}

                {articles?.length ?
                    <div className="main__list">
                        {isNews ?
                            articles.map((article) => (
                            <Card key={article._id} loggedIn={loggedIn} article={article} keyWord={article.keyword} setArticles={setArticles} setPublicArticles={setPublicArticles} />
                            )) :
                            articles.slice(0,index*3).map((article,i) => (
                                <Card key={i} loggedIn={loggedIn} article={article} keyWord={keyWord} setArticles={setArticles} />
                            ))
                        }
                    </div> : 
                    null}
                    
                { spinner && <PreLoader /> }
                {(!isNews && articles?.length && index*3 <= articles?.length) ?
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