import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav.js'
import Header from '../Header/Header.js'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js'
import Footer from '../Footer/Footer.js'
import About from '../About/About.js'
import Main from '../Main/Main.js'
import SavedNews from '../SavedNews/SavedNews.js'
import newsApi from '../../utils/NewsApi.js'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
    const [loggedin, setLoggedin] = useState(true)
    const [articles, setArticles] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [keyWord, setKeyWord] = useState()
    const [savedKeyword, setSavedKeyword] = useState()
    const [articleServerErr, setArticleServerErr] = useState(false)
    const [index, setIndex] = useState(1)
    const [currentUser,setCurrentUser] = useState()
    
    useEffect(() => {
        if(articleServerErr) setArticleServerErr(false)
        if(keyWord) {
            setIndex(1)
            newsApi.searchArticles(keyWord)
            .then(res => setArticles(res.articles))
            .catch(err => {
                console.log(err);
                setArticleServerErr(true)
            })
            .finally(() => setSpinner(false))
        }
    }, [keyWord])

    useEffect(() => {
        if(currentUser || localStorage.getItem('token')) {
            const storedArticles = JSON.parse(localStorage.getItem('articles'));
            setLoggedin(true);
            setArticles(storedArticles?.slice(1) || []);
            setSavedKeyword(storedArticles?.[0].keyWord)
        }
        else {
            setLoggedin(false)
            setArticles([])
            setKeyWord()
            setSavedKeyword()
            localStorage.removeItem('articles')
        }
    },[currentUser])

    useEffect(() => {
        if(articles && (keyWord || savedKeyword)) localStorage.setItem('articles', JSON.stringify([{ keyWord: keyWord || savedKeyword }, ...articles]))
    },[articles])
    
    return (
        <CurrentUserContext.Provider value={currentUser} className='app'>
            <Nav loggedIn={loggedin} setCurrentUser={setCurrentUser} />
            <ProtectedRoute path='/saved-news' loggedIn={currentUser}>
                <SavedNews setPublicArticles={setArticles} />
            </ProtectedRoute>
            <Route exact path={['/','/signin','/signup']}>
                <Header setSpinner={setSpinner} setKeyWord={setKeyWord} />
                <Main 
                    loggedIn={loggedin} 
                    spinner={spinner} 
                    articles={articles} 
                    keyWord={keyWord || savedKeyword} 
                    articleServerErr={articleServerErr}
                    index={index}
                    setIndex={setIndex}
                    setArticles={setArticles} />
                <About />
                <Footer />
                <PopupWithForm setCurrentUser={setCurrentUser} />
            </Route>
        </CurrentUserContext.Provider>
    )
}

export default App