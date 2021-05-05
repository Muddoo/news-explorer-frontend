import './SavedNews.css'
import Main from '../Main/Main.js'
import Footer from '../Footer/Footer.js'

function SavedNews() {
    return (
        <div className="savednews">
            <header className="savednews__header">
                <div className="savednews__group">
                    <div className="savednews__heading">Saved articles</div>
                    <div className="savednews__main">Elise, you have 5 saved articles</div>
                    <div className="savednews__footer"><span>By keywords: </span>Nature, Yellowstone, and 2 other</div>
                </div>
            </header>
            <Main />
            <Footer />
        </div>
    )
}

export default SavedNews