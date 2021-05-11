import './SavedNews.css'
import Main from '../Main/Main.js'
import Footer from '../Footer/Footer.js'
import { useState, useContext, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import MainApi from  '../../utils/MainApi'

function SavedNews() {
    const currentUser = useContext(CurrentUserContext);
    const [savedArticles, setSavedArticles] = useState([]);
    const [savedKeywords, setSavedKeywords] = useState([])

    useEffect(() => {
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

        mainAPi.getArticles()
            .then(articles => {
                console.log(articles)
                const keywords = [... new Set(articles.map(({keyword}) => keyword))]
                setSavedArticles(articles)
                setSavedKeywords(keywords)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="savednews">
            <header className="savednews__header">
                <div className="savednews__group">
                    <div className="savednews__heading">Saved articles</div>
                    <div className="savednews__main">{`${currentUser?.name}, you have ${savedArticles.length} saved articles`}</div>
                    <div className="savednews__footer">
                        {savedKeywords.length ?
                             <span>By keywords: </span> :
                             <span>No Keywords </span>
                        }
                    </div>
                    {/* <div className="savednews__footer"><span>By keywords: </span>Nature, Yellowstone, and 2 other</div> */}
                </div>
            </header>
            <Main articles={savedArticles} setArticles={setSavedArticles} />
            <Footer />
        </div>
    )
}

export default SavedNews