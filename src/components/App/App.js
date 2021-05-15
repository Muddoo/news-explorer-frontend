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
import MainApi from  '../../utils/MainApi'

function App() {
    const [loggedin, setLoggedin] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const [keyWord, setKeyWord] = useState()
    const [savedKeyword, setSavedKeyword] = useState()
    const [articleServerErr, setArticleServerErr] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentUser,setCurrentUser] = useState()
    const [articles, setArticles] = useState([])
    const [savedArticles, setSavedArticles] = useState([])

    const mainAPi = new MainApi({
        baseUrl: 'https://obscure-island-11341.herokuapp.com',
        // baseUrl: 'http://localhost:3001',
        options: {
            headers: {
              authorization: `Bearer ${currentUser?.token}`,
              "Content-Type": "application/json",
            }
        }
    })
    
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
            mainAPi.getArticles()
            .then(articles => setSavedArticles(articles))
            .catch(err => console.log(err))
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
        if(articles && (keyWord || savedKeyword)) localStorage.setItem('articles', JSON.stringify([{ keyWord: keyWord || savedKeyword }, ...articles]));
    },[articles]);

    async function toggleArticle(article) {
        const method = article._id ? 'DELETE' : 'POST'
        const id = article._id || ''
        const body = {
            keyword: keyWord || savedKeyword,
            title: article.title,
            text: article.content,
            date: new Date(article.publishedAt).toLocaleDateString('en',{month: 'long', day: 'numeric', year: "numeric"}),
            source: article.source.name,
            link: article.url,
            image: article.urlToImage || 'Group.svg',
        }
        try {
            const response = await mainAPi.toggleArticle({id, method, body})
            if(method === 'POST') {
                setArticles(articles.map(a => a === article ? {...article, _id: response._id} : a))
                setSavedArticles([...savedArticles, response])
            } else {
                setArticles(articles.map(a => a._id === article._id ? {...a, _id: null} : a))
                setSavedArticles(savedArticles.filter(a => a._id !== article._id))
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Switch className='app'>
            <CurrentUserContext.Provider value={currentUser}>
                <Nav loggedin={loggedin} setLoggedin={setLoggedin} setCurrentUser={setCurrentUser} />
                <ProtectedRoute path='/saved-news' loggedIn={currentUser}>
                    <SavedNews setPublicArticles={setArticles} savedArticles={savedArticles} setSavedArticles={setSavedArticles} toggleArticle={toggleArticle} />
                </ProtectedRoute>
                <Route exact path={['/','/signin','/signup']}>
                    <Header setSpinner={setSpinner} setKeyWord={setKeyWord} setSavedArticles={setSavedArticles} />
                    <Main 
                        loggedIn={loggedin} 
                        spinner={spinner} 
                        articles={articles} 
                        keyWord={keyWord || savedKeyword} 
                        articleServerErr={articleServerErr}
                        index={index}
                        setIndex={setIndex}
                        setArticles={setArticles}
                        setPublicArticles={setSavedArticles}
                        toggleArticle={toggleArticle} />
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