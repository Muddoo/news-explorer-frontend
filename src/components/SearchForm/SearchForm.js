import './SearchForm.css'

function SearchForm() {
    return (
        <div className="search">
            <input type="text" className="search__input" placeholder="Enter topic"/>
            <button className="search__btn">Search</button>
        </div>
    )
}

export default SearchForm