import { useState, useEffect, useMemo, useCallback } from 'react'
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
    const [spinnerText, setSpinnerText] = useState();
    const [keyWord, setKeyWord] = useState()
    const [savedKeyWord, setSavedKeyWord] = useState()
    const [articleServerErr, setArticleServerErr] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentUser,setCurrentUser] = useState()
    const [articles, setArticles] = useState([])
    const [savedArticles, setSavedArticles] = useState([])
    const [savedKeywords, setSavedKeywords] = useState()

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

    const loadArticles = useCallback((articles = []) => Promise.all(articles.map((a,i) => new Promise((res,rej) => {
        const img = new Image();
        img.src = a.image || a.urlToImage || 'Group.svg';
        // if(i < 3) {
            console.log(a.urlToImage)
            img.onload = () => res(a);
            img.onerror = rej
            return;
        // }
        // res(a)
    })))) 
    
    useEffect(() => {
        if(articleServerErr) setArticleServerErr(false)
        if(keyWord) {
            setSpinner(true)
            setSpinnerText()
            setArticles([])
            setIndex(0)
            newsApi.searchArticles(keyWord)
            .then(res => {
                // const loadedArticles = await loadArticles(res.articles)  
                setArticles(res.articles)
                setIndex(1)
            })
            .catch(err => {
                console.log(err);
                setArticleServerErr(true)
            })
            // .finally(() => setSpinner(false))
        }
    }, [keyWord])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const storedArticles = JSON.parse(localStorage.getItem('articles'));
        if(currentUser) {
            setLoggedin(true);
            // setArticles(loadArticles(storedArticles?.slice(1)))
            // loadArticles(storedArticles?.slice(1)).then(articles => setArticles(articles))
            setArticles(storedArticles?.slice(1) || []);
            setSavedKeyWord(storedArticles?.[0].keyWord);
            storedArticles && !index && setIndex(1)
            storedArticles && setSpinner(true)
            storedArticles && setSpinnerText('Loading Articles...')
            mainAPi.getArticles()
            .then(articles => {
                // const loadedArticles = await loadArticles(articles)
                setSavedArticles(articles)
            })
            .catch(err => console.log(err))
        }  
        if(!token && !currentUser) {
            setLoggedin(false)
            setArticles([])
            setKeyWord()
            setIndex()
            setSpinner()
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
        if(articles.length) localStorage.setItem('articles', JSON.stringify([{ keyWord: keyWord || savedKeyWord }, ...articles]));
    },[articles]);

    useEffect(() => {
        const keywords = [... new Set(savedArticles.map(({keyword}) => keyword))];
        const keywordText = keywords.slice(0,2).join(', ') + (keywords.length > 2 ? `, and ${keywords.length-2} others` : '');
        setSavedKeywords(keywordText)
    },[savedArticles])

    async function toggleArticle(article) {
        const method = article._id ? 'DELETE' : 'POST'
        const id = article._id || ''
        const body = {
            keyword: keyWord || savedKeyWord,
            title: article.title,
            text: article.description,
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
                    <SavedNews 
                        savedArticles={savedArticles} 
                        spinner={spinner} 
                        spinnerText={spinnerText}
                        setSpinner={setSpinner}
                        savedKeywords={savedKeywords} 
                        toggleArticle={toggleArticle} />
                </ProtectedRoute>
                <Route exact path={['/','/signin','/signup']}>
                    <Header setKeyWord={setKeyWord} />
                    <Main 
                        loggedIn={loggedin} 
                        spinner={spinner} 
                        spinnerText={spinnerText}
                        setSpinner={setSpinner}
                        articles={articles} 
                        keyWord={keyWord} 
                        articleServerErr={articleServerErr}
                        index={index}
                        setIndex={setIndex}
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