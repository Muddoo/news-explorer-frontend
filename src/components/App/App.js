import { useState, useEffect } from 'react'
import { Redirect, Route,Switch } from 'react-router-dom'
import { checkToken } from '../../utils/auth'
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
    const [index, setIndex] = useState(0)
    const [currentUser,setCurrentUser] = useState()
    
    useEffect(() => {
        if(articleServerErr) setArticleServerErr(false)
        if(keyWord) {
            newsApi.searchArticles(keyWord)
            .then(res => {
                setArticles(res.articles)
                setIndex(1)
            })
            .catch(err => {
                console.log(err);
                setArticleServerErr(true)
            })
            .finally(() => setSpinner(false))
        }
    }, [keyWord])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const storedArticles = JSON.parse(localStorage.getItem('articles'));
        if(currentUser) {
            setLoggedin(true);
            setArticles(storedArticles?.slice(1) || []);
            setSavedKeyword(storedArticles?.[0].keyWord);
            storedArticles && !index && setIndex(1)
        }  
        if(!token && !currentUser) {
            setLoggedin(false)
            setArticles([])
            setKeyWord()
            setSavedKeyword()
            setIndex()
            localStorage.removeItem('articles')
        }
        if(token && !currentUser) {
            checkToken(token)
            .then(user => setCurrentUser({...user, token}))
            .catch(err => {
                console.log(err);
                setCurrentUser(false)
                localStorage.removeItem('token')
            })
        }
    },[currentUser])

    useEffect(() => {
        if(articles && (keyWord || savedKeyword)) localStorage.setItem('articles', JSON.stringify([{ keyWord: keyWord || savedKeyword }, ...articles]))
    },[articles])
    
    return (
        <Switch className='app'>
            <CurrentUserContext.Provider value={currentUser}>
                <Nav setCurrentUser={setCurrentUser} />
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
                <Redirect to='/' />
            </CurrentUserContext.Provider>
        </Switch>
    )
}

export default App