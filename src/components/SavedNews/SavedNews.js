import './SavedNews.css'
import Main from '../Main/Main.js'
import Footer from '../Footer/Footer.js'
import { useState, useContext, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SavedNews({ savedArticles, toggleArticle }) {
    const currentUser = useContext(CurrentUserContext);
    const [savedKeywords, setSavedKeywords] = useState([])

    useEffect(() => {
        const keywords = [... new Set(savedArticles.map(({keyword}) => keyword))];
        const keywordText = keywords.slice(0,2).join(', ') + (keywords.length > 2 ? `, and ${keywords.length-2} others` : '');
        setSavedKeywords(keywordText)
    }, [savedArticles])

    return (
        <div className="savednews">
            <header className="savednews__header">
                <div className="savednews__group">
                    <div className="savednews__heading">Saved articles</div>
                    <div className="savednews__main">{`${currentUser?.name}, you have ${savedArticles.length} saved articles`}</div>
                    <div className="savednews__footer">
                        <span>By keywords: </span> {savedKeywords || 'No Keys!'}
                    </div>
                </div>
            </header>
            <Main articles={savedArticles} toggleArticle={toggleArticle} />
            <Footer />
        </div>
    )
}

export default SavedNews