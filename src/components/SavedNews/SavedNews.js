import './SavedNews.css'
import Main from '../Main/Main.js'
import Footer from '../Footer/Footer.js'
import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SavedNews({ savedArticles, savedKeywords, toggleArticle, spinner, setSpinner }) {
    const currentUser = useContext(CurrentUserContext);

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
            <Main articles={savedArticles} toggleArticle={toggleArticle} spinner={spinner} setSpinner={setSpinner} />
            <Footer />
        </div>
    )
}

export default SavedNews