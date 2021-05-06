import { useState } from 'react'
import { Route ,withRouter } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav.js'
import Header from '../Header/Header.js'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js'
import Footer from '../Footer/Footer.js'
import About from '../About/About.js'
import Main from '../Main/Main.js'
import SavedNews from '../SavedNews/SavedNews.js'

function App() {
    const [loggedin, setLoggedin] = useState(false)
    return (
        <div className='app'>
            <Nav loggedIn={loggedin} setLoggedin={setLoggedin}  />
            <Route path='/saved-news' component={SavedNews} />
            <Route exact path={['/','/signin','/signup']}>
                <Header />
                <Main loggedIn={loggedin} />
                <About />
                <Footer />
                <PopupWithForm setLoggedin={setLoggedin} /> 
            </Route>
        </div>
    )
}

export default App